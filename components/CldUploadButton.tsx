"use client";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "./ui/use-toast";
import { useRef } from "react";

export default function ImageUploadButton({
  onUpload,
}: {
  onUpload: (urls: string[]) => void;
}) {
  const uploadedUrlsRef = useRef<string[]>([]);

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-image"
      options={{
        sources: ["local", "camera", "facebook", "instagram"],
        multiple: true,
        maxFileSize: 2 * 1024 * 1024,
        clientAllowedFormats: ["jpg", "png", "jpeg", "webp"],
        //cropping: true,
        maxFiles: 5,
      }}
      onSuccess={(result: any, widget: any) => {        
        if (result.event === "success") {
          const info = result.info;
          const width = info.width;
          const height = info.height;
          const url = info.secure_url;

          if (width < 400 || height < 400 || width > 2000 || height > 2000) {
            toast({
              title: "Error",
              description:
                "La imagen debe tener dimensiones entre 400x400 y 2000x2000 píxeles.",
              variant: "destructive",
            });
            return;
          }

          if (url) {
            uploadedUrlsRef.current.push(url);
          }
        }

        console.log(result)
        // Cuando termina la cola de subidas
        //if (result.event === "queues-end") {
          if (uploadedUrlsRef.current.length > 0) {
            onUpload(uploadedUrlsRef.current);
            uploadedUrlsRef.current = [];
          }
          widget.close();
        //}
      }}
    >
      {({ open }) => (
        <button
          className="text-[var(--magenta)] bg-white my-4 py-2 px-4 rounded w-full border border-[var(--magenta)]"
          type="button"
          onClick={() => open()}
        >
          Cargar imágenes
        </button>
      )}
    </CldUploadWidget>
  );
}
