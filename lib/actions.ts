"use server";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { TUser, TLoginUser } from "@/types/user";
import * as Users from "@/lib/api/users";
import * as Categoria from "@/lib/api/categories";
import * as Posts from "@/lib/api/posts";
import * as Files from "@/lib/api/files";
import { Post as PostDbType, Prisma } from '@prisma/client';
import { File as FileDbType } from '@prisma/client';

// ==================== USER ACTIONS ====================
// No se cachean porque son operaciones de autenticación y específicas por usuario

export async function createUser(data: TUser) {
  let user = null;
  try {
    const userData = await Users.getUserByEmail(data.email);
    if (userData) {
      return true;
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const result = await Users.createUser(data);
    user = result.id;
  } catch (error) {
    console.log("Error creando el usuario:", error);
    throw new Error("Error creando el usuario");
  }
}

export async function loginUser(data: TLoginUser) {
  let eventId = null;
  try {
    const result = await Users.logInUser(data);
    console.log("login:", result);
    eventId = result?.id;
  } catch (error) {
    console.log("Error login:", error);
    throw new Error("Error login");
  }
  if (eventId) {
    redirect(`/estado/1`);
  }
  revalidatePath("/dashboard");
}

// ==================== POST ACTIONS - READ ====================
// Funciones de lectura con cache

// No se cachea porque es específica por usuario
export async function getAllPostsByUserId(userId: string) {
  try {
    const response = await Posts.getPostsByUserId(userId);
    return response;
  } catch (error: any) {
    console.log(error);
    throw Error("Error getAllEncuestas", error);
  }
}

// Se cachea con revalidación cada hora
export const getAllPostBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const response = await Posts.getPostBySlug(slug);
      return response;
    } catch (error: any) {
      console.log(error);
      throw Error("Error getAllEncuestas", error);
    }
  },
  ['post-by-slug'],
  {
    revalidate: 3600, // 1 hora
    tags: ['posts']
  }
);

// Se cachea con revalidación cada hora
export const getAllPosts = unstable_cache(
  async () => {
    try {
      const response = await Posts.getPosts();
      return response;
    } catch (error: any) {
      console.log(error);
      throw Error("Error getEncuesta", error);
    }
  },
  ['all-posts'],
  {
    revalidate: 3600, // 1 hora
    tags: ['posts']
  }
);

// ==================== CATEGORIA ACTIONS ====================
// Se cachea con revalidación cada 24 horas (las categorías cambian poco)

export const getAllCategorias = unstable_cache(
  async () => {
    try {
      return await Categoria.getAllCategorias();
    } catch (error: any) {
      console.log(error);
      throw Error("Error getAllCategorias", error);
    }
  },
  ['all-categorias'],
  {
    revalidate: 86400, // 24 horas
    tags: ['categorias']
  }
);

// ==================== POST ACTIONS - WRITE ====================
// Operaciones de escritura que invalidan el cache

export async function createPost(data: PostDbType) {
  try {
    const result = await Posts.createPost(data);
    
    // Invalida el cache de posts
    revalidateTag('posts');
    revalidatePath("/admin");
    
    return result;
  } catch (error) {
    console.log("Error creando el post:", error);
    throw new Error("Error creando el post");
  }
}

export async function updatePost(id: string, data: PostDbType) {
  try {
    const response = await Posts.updatePost(id, data);
    if (response) {
      // Invalida el cache de posts
      revalidateTag('posts');
      revalidatePath("/admin");
      revalidatePath("/admin/editar/" + data.slug);
      return response;
    }
  } catch (error) {
    console.log("Error actualizando el post:", error);
    throw new Error("Error actualizando el post");
  }
}

export async function deletesPost(id: string) {
  try {
    const response = await Posts.deletePost(id);
    if (response) {
      // Invalida el cache de posts
      revalidateTag('posts');
      revalidatePath("/admin");
      return response;
    }
  } catch (error) {
    console.log("Error eliminando el post:", error);
    throw new Error("Error eliminando el post");
  }
}

// ==================== FILE ACTIONS ====================

export async function uploadFile(data: Prisma.FileUncheckedCreateInput) {
  try {
    const result = await Files.uploadFile(data);
    
    // Invalida el cache de archivos
    revalidateTag('files');
    revalidatePath("/admin");
    
    return result;
  } catch (error) {
    console.log("Error creando el post:", error);
    throw new Error("Error creando el post");
  }
}

// Se cachea con revalidación cada hora
export const getAllPDFFiles = unstable_cache(
  async (type: string) => {
    try {
      return await Files.getAllPDFFiles(type);
    } catch (error: any) {
      console.log(error);
      throw Error("Error getAllCategorias", error);
    }
  },
  ['all-pdf-files'],
  {
    revalidate: 3600, // 1 hora
    tags: ['files']
  }
);

// Se cachea con revalidación cada hora
export const getAllPDF = unstable_cache(
  async () => {
    try {
      return await Files.getAllPDF();
    } catch (error: any) {
      console.log(error);
      throw Error("Error getAllCategorias", error);
    }
  },
  ['all-pdf'],
  {
    revalidate: 3600, // 1 hora
    tags: ['files']
  }
);

// Se cachea con revalidación cada hora
export const getPDFFilebyId = unstable_cache(
  async (id: string) => {
    try {
      const response = await Files.getPDFFilebyId(id);
      return response;
    } catch (error: any) {
      console.log(error);
      throw Error("Error getAllEncuestas", error);
    }
  },
  ['pdf-file-by-id'],
  {
    revalidate: 3600, // 1 hora
    tags: ['files']
  }
);