import { db } from "../prisma";
import {
  File as FileDbType,
  Prisma,
} from '@prisma/client';

export async function uploadFile(data: Prisma.FileUncheckedCreateInput) {
  return await db.file.create({
    data: {
      name: data.name,
      url: data.url,
      fileType: data.fileType,
      createdById: data.createdById,
      id: data.id || undefined,
    },
  });
}

export async function getPDFFilebyId(id: string) {
  return await db.file.findUnique({
    where: {
      id,
    },
  });
}

export async function getAllPDFFiles() {
  return await db.file.findMany({
    where: {
      fileType: "pdf",
    }
  });
}

export async function getEncuestaInfo() {
  return await db.file.findMany({
    // include: {
    //   tecnologias: {
    //     include: {
    //       enunciados: {
    //         select: {
    //           slug: true,
    //         },
    //       },
    //     },
    //     orderBy: {
    //       id: "asc", // or 'desc' for descending order
    //     },
    //   },
    //   createdBy: {
    //     select: {
    //       id: true,
    //       name: true,
    //       lastName: true,
    //       email: true,
    //     },
    //   },
    // },
  });
}
export async function updatePost(postId: string, data: any) {
  return await db.file.update({
    where: {
      id: postId,
    },
    data,
  });
}

export async function deletePost(postId: string) {
  return await db.file.delete({
    where: {
      id: postId,
    },
  });
}
