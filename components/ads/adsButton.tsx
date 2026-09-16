"use client";
import React from "react";
import { Button } from "../ui/button";
import { PAGE_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

function AdsButton({
  ubicacion,
  cuadrado,
}: {
  ubicacion?: string;
  cuadrado?: boolean;
}) {
  const enviarMensaje = () => {
    const text = encodeURI(`Hola, quisiera publicitar en la web`);
    window.open(
      `https://wa.me/${PAGE_INFO.telefono}?text=${text}`,
      "_blank",
      "noopener, noreferrer",
    );
  };
  return (
    <div className="px-4 md:px-0 min-h-[90px] lg:min-h-[144px] flex justify-center items-center">
      <Button
        onClick={() => enviarMensaje()}
        className={cn(
          "block w-full p-0 text-white hover:text-[#ed2866] f-full hover:bg-white transition-all duration-300 ease-in-out",
        )}
      >
        <Image
          src="/ads/banner-vender-entradas.gif"
          alt="Publicidad en Epica Rosario"
          width={1920}
          height={144}
          className="mx-auto"
        />
      </Button>
    </div>
  );
}

export default AdsButton;
