"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import { TUser, TLoginUser } from "@/types/user";

import * as Users from "@/lib/api/users";
import * as Categoria from "@/lib/api/categories";
import * as Posts from "@/lib/api/posts";
import * as Files from "@/lib/api/files";

import {
  Post as PostDbType,
  Prisma,
} from '@prisma/client';

import {
  File as FileDbType,
} from '@prisma/client';

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

export async function getAllPostsByUserId(userId: string) {
  try {
    const response = await Posts.getPostsByUserId(userId);
    return response;
  } catch (error: any) {
    console.log(error);
    throw Error("Error getAllEncuestas", error);
  }
}

export async function getAllPostBySlug(slug: string) {
  try {
    const response = await Posts.getPostBySlug(slug);
    return response;
  } catch (error: any) {
    console.log(error);
    throw Error("Error getAllEncuestas", error);
  }
}

export async function getAllPosts() {
  try {
    const response = await Posts.getPosts();
    return response;
  } catch (error: any) {
    console.log(error);
    throw Error("Error getEncuesta", error);
  }
}

export async function getAllCategorias() {
  try {
    return await Categoria.getAllCategorias();
  } catch (error: any) {
    console.log(error);
    throw Error("Error getAllCategorias", error);
  }
}

export async function createPost(data: PostDbType) {
  try {
    return await Posts.createPost(data);    
  } catch (error) {
    console.log("Error creando el post:", error);
    throw new Error("Error creando el post");
  }
}

export async function updatePost(id: string, data: PostDbType) {
  try {
    const response = await Posts.updatePost(id, data);
    if (response) {
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
      revalidatePath("/admin");
      return response;
    }
  } catch (error) {
    console.log("Error eliminando el post:", error);
    throw new Error("Error eliminando el post");
  }
}

export async function uploadFile(data: Prisma.FileUncheckedCreateInput) {
  try {
    return await Files.uploadFile(data);
  } catch (error) {
    console.log("Error creando el post:", error);
    throw new Error("Error creando el post");
  }
}

export async function getAllPDFFiles(type: string) {
  try {
    return await Files.getAllPDFFiles(type);
  } catch (error: any) {
    console.log(error);
    throw Error("Error getAllCategorias", error);
  }
}
export async function getAllPDF() {
  try {
    return await Files.getAllPDF();
  } catch (error: any) {
    console.log(error);
    throw Error("Error getAllCategorias", error);
  }
}

export async function getPDFFilebyId(id: string) {
  try {
    const response = await Files.getPDFFilebyId(id);
    return response;
  } catch (error: any) {
    console.log(error);
    throw Error("Error getAllEncuestas", error);
  }
}
