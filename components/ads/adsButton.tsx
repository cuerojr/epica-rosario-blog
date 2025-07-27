"use client";
import React from "react";
import { Button } from "../ui/button";
import { PAGE_INFO } from "@/lib/constants";

function AdsButton({ ubicacion }: { ubicacion?: string }) {
  const enviarMensaje = () => {
    const text = encodeURI(`Hola, quisiera publicitar en la web`);
    window.open(
      `https://wa.me/${PAGE_INFO.telefono}?text=${text}`,
      "_blank",
      "noopener, noreferrer"
    );
  };
  return (
    <section className="pt-4 px-4 md:p-0">
      <Button
        onClick={() => enviarMensaje()}
        className="block bg-[#ed2866] w-full mb-4 min-h-24 text-white hover:text-[#ed2866]"
      >
        
        <span className="text-sm md:text-lg font-semibold ">
          Anuncie con nosotros
        </span>
      </Button>
    </section>
  );
}

export default AdsButton;
