"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type Anuncio = {
  id: string | number;
  imagen: {
    banner: string;
    cuadrado: string;
  };
  href: string;
  alt: string;
  textoBoton?: string;
};

type Props = {
  anuncios: Anuncio[];
  cuadrado?: boolean;
  intervalo?: number; // ms, 0 = sin autoplay
};

const whatsappUrl = () =>
  `https://wa.me/${PAGE_INFO.telefono}?text=${encodeURIComponent(
    "Hola, quisiera publicitar en la web"
  )}`;

function ContactoLink({ grande }: { grande?: boolean }) {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block text-center font-semibold text-[#ed2866] hover:underline text-balance",
        grande
          ? "bg-[#ed2866] text-white hover:no-underline hover:opacity-90 rounded-md py-8 text-sm md:text-lg"
          : "text-xs md:text-sm"
      )}
    >
      Anuncie con nosotros
    </a>
  );
}

function AdsSlider({ anuncios, cuadrado = false, intervalo = 5000 }: Props) {
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = anuncios.length;

  const siguiente = useCallback(
    () => setActual((i) => (i + 1) % total),
    [total]
  );
  const anterior = () => setActual((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (total < 2 || !intervalo || pausado) return;
    const id = setInterval(siguiente, intervalo);
    return () => clearInterval(id);
  }, [total, intervalo, pausado, siguiente]);

  // Sin anuncios: queda el botón de contacto como antes
  if (total === 0) {
    return (
      <section className="pt-4 px-4 md:p-0">
        <ContactoLink grande />
      </section>
    );
  }

  return (
    <section className="pt-4 px-4 md:p-0 mb-4">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-md bg-muted bg-black",
          cuadrado ? "aspect-square" : "h-24 md:h-32"
        )}
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocus={() => setPausado(true)}
        onBlur={() => setPausado(false)}
      >
        {/* Pista de slides */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${actual * 100}%)` }}
        >
          {anuncios.map((a, i) => (
            <div
              key={a.id}
              className="relative h-full w-full shrink-0"
              aria-hidden={i !== actual}
            >
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                tabIndex={i === actual ? 0 : -1}
                className="absolute inset-0"
                aria-label={a.alt}
              >
                <Image
                  src={cuadrado ? a.imagen.cuadrado : a.imagen.banner}
                  alt={a.alt}
                  fill
                  sizes={cuadrado ? "(min-width: 768px) 300px, 100vw" : "100vw"}
                  className="object-contain"
                  priority={i === 0}
                />
              </a>

              {a.textoBoton && (
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  tabIndex={i === actual ? 0 : -1}
                  className="absolute bottom-2 right-2 rounded bg-[#ed2866] px-3 py-1 text-xs md:text-sm font-semibold text-white shadow hover:opacity-90"
                >
                  {a.textoBoton}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Flechas y puntos solo si hay más de uno */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Anuncio anterior"
              className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white hover:bg-black/60"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Anuncio siguiente"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white hover:bg-black/60"
            >
              <ChevronRight className="size-4" />
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {anuncios.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActual(i)}
                  aria-label={`Ir al anuncio ${i + 1}`}
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    i === actual ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Siempre visible */}
      <div className="mt-2">
        <ContactoLink />
      </div>
    </section>
  );
}

export default AdsSlider;