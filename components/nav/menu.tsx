"use client";

import { gsap } from "gsap";
import { FC, useEffect, useRef } from "react";
//import { PrismicDocument } from "@prismicio/client";
import { NavItem } from "./item";
//import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { link } from "fs";
import { PAGE_INFO, REDES } from "@/lib/constants";

type Props = {
  open?: boolean;
  items: any[];
  data: any;
};

export const Menu: FC<Props> = ({ open = false, items = [], data = {} }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    socialmedia = REDES,
    email = PAGE_INFO.email,
    imagen,
    telefono = "3415807001",
    slogan,
  } = data;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const childs = gsap.utils.toArray(container.childNodes);

    let tl: gsap.core.Timeline;

    if (open) {
      tl = gsap
        .timeline()
        .to(container, {
          yPercent: 0,
          duration: 1.2,
          ease: "expo",
          overwrite: true,
          onStart: () => {
            gsap.set(container, { visibility: "visible" });
          },
        })
        .to(childs, { autoAlpha: 1, stagger: 0.1 }, "<25%")
        .from(childs, { y: -20, stagger: 0.1 }, "<");
    } else {
      tl = gsap
        .timeline()
        .to(childs, { autoAlpha: 0 })
        .to(
          container,
          {
            yPercent: -100,
            duration: 0.75,
            ease: "expo",
            overwrite: true,
            onComplete: () => {
              gsap.set(container, { visibility: "hidden" });
            },
          },
          "<"
        );
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <nav
      className={`pt-16 w-full bg-white font-serif  border-b-1 border-gray-300 font-light grid grid-cols-12 gap-5 z-40 justify-center fixed top-0 left-0 h-screen invisible`}
      ref={ref}
    >
      <div className="px-10 order-2 flex flex-col justify-end items-start gap-4 col-span-12 md:col-span-6 text-5xl font-light pb-4">
        <div className="flex flex-col gap-2">
          {items.map((item, _) => (
            <NavItem
              key={_}
              href={`/${item.uid === "home" ? "" : item.uid}`}
              className="flex flex-row gap-2 text-black font-bold "
            >
              <span className="decoration-[#ec1c90] decoration-3 hover:underline underline-offset-8">
                {item.data.title}
              </span>
              <span
                className={cn(
                  "hidden no-underline",
                  _ == 1 ? "last:hidden" : "no-underline"
                )}
              >
                /
              </span>
            </NavItem>
          ))}
        </div>
      </div>
      <div className="relative order-1 overflow-hidden col-span-12 md:col-span-6">
        <Image
          height={500}
          width={500}
          src={"/Diana_la_cazadora,_Rosario,_Argentina.jpg"}
          alt="Imagen de fondo del menú"
          loading="eager"
          className="w-full h-auto object-cover object-center"
        />
        <p className="text-4xl text-beige font-serif font-light absolute p-5 left-0 bottom-0 z-[22] max-w-[50%] text-balance">
          {slogan}
        </p>
        <div className="gradient-cover-top z-20"></div>
        <div className="gradient-cover-bottom z-20"></div>
      </div>
      <div className="col-span-12 order-3 pb-4">
        <div className="grid grid-cols-2 items-center gap-2 md:gap-0 px-10 h-full">
          <div className="col-span-2 md:col-span-1 menu-footer__item text-xs font-sans text-green uppercase ">
            <ul className="grid grid-cols-2 gap-2">
              {/* <li className="col-span-1">
                <h3 className="opacity-70">Teléfono</h3>
                {telefono}
              </li> */}
              <li className="col-span-1">
                <h3 className="opacity-70">email</h3>
                {email}
                {/* <PrismicNextLink
                  field={email}
                  className="hover:opacity-70 transition-all duration-200"
                /> */}
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 menu-footer__item text-xs font-sans text-green uppercase">
            <h3 className="opacity-70">Redes</h3>
            <div className="flex items-center">
              {socialmedia?.map((item: any, i: number) => (
                <div key={i} className="">
                  <Link
                    href={item.link}
                    target="_blank"
                    className="hover:opacity-70 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                  <span className={cn("mx-1", i === (socialmedia.length-1) ? "hidden" : "")}>/</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
