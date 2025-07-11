"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  IANSWER,
  IDATAQUESTION,
  IENUNCIADOPROPS,
  IQUESTION,
} from "@/types/encuestas";
import { User } from "next-auth";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Textarea } from "./ui/textarea";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import { Button } from "./ui/button";
import ImageUploadButton from "./CldUploadButton";
import { CldImage } from "next-cloudinary";
import { updatePost } from "@/lib/actions";
import { toast } from "./ui/use-toast";
import RichTextEditor from "./RichTextEditor";
import { generateSlug } from "@/utils/metada-helper";
import { useRouter } from "next/navigation";
// import { createResponse, updateCheckboxResponse } from "@/lib/actions";

const formSchema = z.object({
  titulo: z.string().optional(),
  bajada: z.string().optional(),
  cuerpo: z.string().optional(),
  imagen: z.string().optional(),
  imagen2: z.string().optional(),
  imagen3: z.string().optional(),
  imagen4: z.string().optional(),
  imagen5: z.string().optional(),
  slug: z.string().optional(),
  categorias: z.string().optional(),
});

type PostData = {
  id?: string;
  titulo: string;
  bajada: string;
  cuerpo: string;
  imagen: string;
  imagen2: string;
  imagen3: string;
  imagen4: string;
  imagen5: string;
  slug: string;
  categorias?: string;
};

export default function FormEditPost({
  data,
  values,
  enunciadoData,
  categorias,
  user,
}: {
  data: PostData;
  values?: IQUESTION;
  enunciadoData?: IENUNCIADOPROPS;
  categorias?: any;
  user?: User;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: data?.titulo,
      bajada: data?.bajada,
      cuerpo: data?.cuerpo,
      imagen: data?.imagen,
      imagen2: data?.imagen2,
      imagen3: data?.imagen3,
      imagen4: data?.imagen4,
      imagen5: data?.imagen5,
      slug: data?.slug,
      categorias: data?.categorias,
    },
  });

  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string[]>([]);
  const router = useRouter();
  // const [debouncedValue, setDebouncedValue] = useState<string>(form.getValues("textField"));
  const timerRef = useRef<number | undefined>();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // form.setValue("textField", e.target.value);
    // Se inicia el temporizador para activar el debouncer
  };

  const onSubmit = async (value: any) => {
    const postData: any = {
      titulo: value.titulo,
      bajada: value.bajada,
      cuerpo: value.cuerpo,
      imagen: value.imagen,
      imagen2: value.imagen2,
      imagen3: value.imagen3,
      imagen4: value.imagen4,
      imagen5: value.imagen5,
      slug: value.slug,
      categoriaId: value.categorias,
    };

    // Aquí puedes manejar el envío de los datos del formulario
    const response = await updatePost(data.id!, postData);
    if (response) {
      toast({
        title: "Post actualizado",
        description: "El post se ha actualizado correctamente.",
      });
      router.push(`/admin/editar/${response.slug}`);
    }
  };

  const handleImageUpload = (urls: string[]) => {
    console.log("🚀 ~ handleImageUpload ~ urls:", urls);

    if (urls[0]) {
      form.setValue("imagen", urls[0]);
    }
    
    if (urls[1]) {
      form.setValue("imagen2", urls[1]);
    }
    
    if (urls[2]) {
      form.setValue("imagen3", urls[2]);
    }
    
    if (urls[3]) {
      form.setValue("imagen4", urls[3]);
    }
    
    if (urls[4]) {
      form.setValue("imagen5", urls[4]);
    }
    
    setUploadedImage(urls);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-10 py-8 md:flex-row">
      <div className="w-full lg:w-1/3">
        <div className="">
          <div className="rounded-lg aspect-square overflow-hidden">
            <CldImage
              src={
                uploadedImage[0] ||
                data?.imagen ||
                "https://res.cloudinary.com/dxvxzikri/image/upload/v1750266532/nbe6zwl4lpwl9e6ybnnv.png"
              }
              alt={data?.titulo}
              className="object-cover w-full h-full"
              width={500}
              height={500}
            />
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="aspect-square rounded-lg w-1/4 overflow-hidden">
              <CldImage
                src={
                  uploadedImage[1] ||
                  data?.imagen2 ||
                  "https://res.cloudinary.com/dxvxzikri/image/upload/v1750266532/nbe6zwl4lpwl9e6ybnnv.png"
                }
                alt={data?.titulo}
                className="object-cover w-full h-full"
                width={50}
                height={50}
              />
            </div>
            <div className="aspect-square rounded-lg w-1/4 overflow-hidden">
              <CldImage
                src={
                  uploadedImage[2] ||
                  data?.imagen3 ||
                  "https://res.cloudinary.com/dxvxzikri/image/upload/v1750266532/nbe6zwl4lpwl9e6ybnnv.png"
                }
                alt={data?.titulo}
                className="object-cover w-full h-full"
                width={50}
                height={50}
              />
            </div>
            <div className="aspect-square rounded-lg w-1/4 overflow-hidden">
              <CldImage
                src={
                  uploadedImage[3] ||
                  data?.imagen4 ||
                  "https://res.cloudinary.com/dxvxzikri/image/upload/v1750266532/nbe6zwl4lpwl9e6ybnnv.png"
                }
                alt={data?.titulo}
                className="object-cover w-full h-full"
                width={50}
                height={50}
              />
            </div>
            <div className="aspect-square rounded-lg w-1/4 overflow-hidden">
              <CldImage
                src={
                  uploadedImage[4] ||
                  data?.imagen5 ||
                  "https://res.cloudinary.com/dxvxzikri/image/upload/v1750266532/nbe6zwl4lpwl9e6ybnnv.png"
                }
                alt={data?.titulo}
                className="object-cover w-full h-full"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
        <Button variant={"link"} asChild>
          <ImageUploadButton onUpload={handleImageUpload} />
        </Button>
      </div>
      <div className="w-full lg:w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-5 py-5 flex-col">
              <div className="flex items-center gap-4">
                <div className="flex-auto w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="mx-auto">
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-auto w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="categorias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categorías</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccioná una categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categorias &&
                              categorias.length > 0 &&
                              categorias.map((categoria: any) => (
                                <SelectItem
                                  key={categoria.id}
                                  value={categoria.id}
                                >
                                  {categoria.title}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                        You can manage email addresses in your{" "}
                        <Link href="/examples/forms">email settings</Link>.
                      </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                            form.setValue("slug", generateSlug(value), {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="bajada"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Bajada</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="cuerpo"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Cuerpo</FormLabel>
                      <FormControl>
                        {/* <Textarea
                          {...field}
                          placeholder="Escribe aquí el contenido del post..."
                          className="mt-2"
                          value={field.value}
                          onChange={handleTextChange}
                        /> */}
                        <RichTextEditor
                          content={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full bg-[var(--magenta)]">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
