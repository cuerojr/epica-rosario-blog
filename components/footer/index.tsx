import React from "react";

// import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { PAGE_INFO, REDES } from "@/lib/constants";

const icons = (icon: string) => {
  switch (icon) {
    case "FACEBOOK":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.33073 9.00016H10.9974L11.6641 6.3335H9.33073V5.00016C9.33073 4.31391 9.33073 3.66683 10.6641 3.66683H11.6641V1.4269C11.4469 1.39806 10.6261 1.3335 9.75933 1.3335C7.94966 1.3335 6.66406 2.43807 6.66406 4.46664V6.3335H4.66406V9.00016H6.66406V14.6668H9.33073V9.00016Z"
            fill="#ffffff"
          ></path>
        </svg>
      );
    case "WHATSAPP":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00067 1.33398C11.6825 1.33398 14.6673 4.31875 14.6673 8.00065C14.6673 11.6825 11.6825 14.6673 8.00067 14.6673C6.77807 14.6673 5.63234 14.3382 4.64724 13.7638L1.33677 14.6673L2.23808 11.355C1.66329 10.3697 1.33398 9.22365 1.33398 8.00065C1.33398 4.31875 4.31875 1.33398 8.00067 1.33398ZM5.59488 4.87287C5.50862 4.87893 5.42404 4.9 5.34704 4.93939C5.28928 4.96894 5.23565 5.01166 5.15139 5.09122C5.07182 5.16635 5.02571 5.23196 4.97712 5.29522C4.73066 5.61612 4.59819 6.01002 4.60065 6.41464C4.60199 6.74172 4.68695 7.05958 4.82112 7.35638C5.09321 7.95825 5.54192 8.59452 6.13462 9.18458C6.277 9.32632 6.41648 9.46958 6.56689 9.60198C7.30253 10.2497 8.1792 10.7168 9.12713 10.9661C9.12713 10.9661 9.50046 11.0235 9.50593 11.0238C9.6296 11.0305 9.75306 11.0215 9.87686 11.0152C10.0711 11.0052 10.2607 10.9526 10.4323 10.8612C10.5426 10.8025 10.5948 10.7733 10.6874 10.7149C10.6874 10.7149 10.7158 10.6957 10.7706 10.6549C10.8606 10.5879 10.9162 10.5407 10.9911 10.4629C11.0463 10.4056 11.0937 10.3379 11.1304 10.2615C11.1825 10.1527 11.235 9.94505 11.2559 9.77258C11.2718 9.64085 11.267 9.56885 11.2653 9.52425C11.2624 9.45252 11.2031 9.37872 11.1382 9.34738L10.7505 9.17312C10.7505 9.17312 10.1709 8.92085 9.81633 8.75912C9.7794 8.74225 9.739 8.73445 9.6984 8.73198C9.60946 8.72652 9.5098 8.74972 9.4464 8.81652C9.44306 8.81518 9.39893 8.85332 8.9166 9.43765C8.89 9.46945 8.82766 9.53858 8.71986 9.53212C8.7036 9.53098 8.6874 9.52865 8.6716 9.52452C8.62793 9.51298 8.5854 9.49778 8.5438 9.48018C8.46133 9.44518 8.4324 9.43192 8.37606 9.40765C7.9912 9.23952 7.638 9.01458 7.3258 8.73932C7.24206 8.66558 7.1642 8.58618 7.08393 8.50838C6.8038 8.23685 6.57446 7.94805 6.40384 7.66318C6.39453 7.64765 6.38018 7.62518 6.36472 7.60005C6.3368 7.55465 6.30602 7.50065 6.29636 7.46358C6.27158 7.36552 6.33732 7.28672 6.33732 7.28672C6.33732 7.28672 6.49959 7.10932 6.57498 7.01285C6.64752 6.91998 6.71013 6.82918 6.75 6.76445C6.82853 6.6382 6.8534 6.50773 6.81213 6.40707C6.62509 5.95108 6.43212 5.49756 6.23324 5.04661C6.19398 4.95762 6.07723 4.89296 5.97106 4.8807C5.9351 4.87654 5.89916 4.87237 5.86306 4.87C5.77368 4.86564 5.68413 4.8666 5.59488 4.87287Z"
            fill="#ffffff"
          ></path>
        </svg>
      );
    case "INSTAGRAM":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.68735 1.33374C9.43762 1.33498 9.81782 1.33895 10.1463 1.34873L10.2758 1.35296C10.4252 1.35827 10.5727 1.36494 10.7505 1.37327C11.4599 1.40605 11.9438 1.51827 12.3688 1.68327C12.8082 1.85272 13.1793 2.08161 13.5499 2.45217C13.9199 2.82272 14.1488 3.19494 14.3188 3.63327C14.4832 4.05772 14.5955 4.54217 14.6288 5.25161C14.6368 5.42939 14.6431 5.57685 14.6484 5.72635L14.6526 5.85574C14.6623 6.18423 14.6668 6.56449 14.6682 7.31479L14.6687 7.81185C14.6688 7.87259 14.6688 7.93525 14.6688 7.99992L14.6687 8.18799L14.6683 8.68512C14.6671 9.43539 14.6631 9.81565 14.6533 10.1441L14.6491 10.2735C14.6438 10.4231 14.6371 10.5705 14.6288 10.7483C14.596 11.4577 14.4832 11.9416 14.3188 12.3666C14.1494 12.8061 13.9199 13.1772 13.5499 13.5477C13.1793 13.9177 12.8066 14.1466 12.3688 14.3166C11.9438 14.4811 11.4599 14.5933 10.7505 14.6266C10.5727 14.6345 10.4252 14.641 10.2758 14.6462L10.1463 14.6504C9.81782 14.6602 9.43762 14.6646 8.68735 14.6661L8.19022 14.6666C8.12948 14.6666 8.06682 14.6666 8.00215 14.6666H7.81408L7.31695 14.6661C6.56668 14.6649 6.18643 14.6609 5.85793 14.6511L5.72854 14.6469C5.57904 14.6416 5.43158 14.6349 5.2538 14.6266C4.54436 14.5939 4.06102 14.4811 3.63547 14.3166C3.19658 14.1472 2.82491 13.9177 2.45436 13.5477C2.0838 13.1772 1.85547 12.8044 1.68547 12.3666C1.52047 11.9416 1.4088 11.4577 1.37547 10.7483C1.36755 10.5705 1.36109 10.4231 1.35586 10.2735L1.35166 10.1441C1.34191 9.81565 1.33746 9.43539 1.33602 8.68512L1.33594 7.31479C1.33718 6.56449 1.34114 6.18423 1.35092 5.85574L1.35516 5.72635C1.36047 5.57685 1.36714 5.42939 1.37547 5.25161C1.40824 4.54161 1.52047 4.05827 1.68547 3.63327C1.85491 3.19439 2.0838 2.82272 2.45436 2.45217C2.82491 2.08161 3.19714 1.85327 3.63547 1.68327C4.06047 1.51827 4.5438 1.40661 5.2538 1.37327C5.43158 1.36536 5.57904 1.3589 5.72854 1.35367L5.85793 1.34947C6.18643 1.33971 6.56668 1.33527 7.31695 1.33383L8.68735 1.33374ZM8.00215 4.66661C6.1602 4.66661 4.6688 6.15963 4.6688 7.99992C4.6688 9.84185 6.16182 11.3333 8.00215 11.3333C9.84408 11.3333 11.3355 9.84025 11.3355 7.99992C11.3355 6.15801 9.84242 4.66661 8.00215 4.66661ZM8.00215 5.99994C9.10675 5.99994 10.0022 6.89505 10.0022 7.99992C10.0022 9.10452 9.10702 9.99992 8.00215 9.99992C6.89755 9.99992 6.00214 9.10485 6.00214 7.99992C6.00214 6.89532 6.89722 5.99994 8.00215 5.99994ZM11.5021 3.66661C11.0426 3.66661 10.6688 4.03988 10.6688 4.49937C10.6688 4.95887 11.0421 5.33272 11.5021 5.33272C11.9616 5.33272 12.3355 4.95945 12.3355 4.49937C12.3355 4.03988 11.961 3.66603 11.5021 3.66661Z"
            fill="#ffffff"
          ></path>
        </svg>
      );
    case "TELEGRAM":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 50 50"
        >
          <path
            fill="#ffffff"
            d="M25,8c9.389,0,17,7.611,17,17s-7.611,17-17,17S8,34.389,8,25S15.611,8,25,8z M30.864,31.93	c0.312-0.959,1.778-10.521,1.958-12.405c0.055-0.571-0.126-0.95-0.478-1.119c-0.427-0.205-1.06-0.103-1.794,0.162	c-1.007,0.363-13.876,5.827-14.62,6.144c-0.704,0.3-1.372,0.626-1.372,1.1c0,0.333,0.198,0.52,0.742,0.714	c0.566,0.202,1.992,0.634,2.834,0.866c0.811,0.224,1.734,0.03,2.251-0.292c0.548-0.341,6.878-4.576,7.332-4.947	c0.454-0.371,0.816,0.104,0.445,0.476c-0.371,0.371-4.715,4.588-5.289,5.172c-0.696,0.709-0.202,1.443,0.265,1.738	c0.533,0.336,4.365,2.906,4.943,3.319c0.578,0.412,1.162,0.599,1.699,0.599C30.316,33.456,30.597,32.749,30.864,31.93z"
          ></path>
        </svg>
      );
    case "X":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ffffff"
            d="M10.053,7.988l5.631,8.024h-1.497L8.566,7.988H10.053z M21,7v10	c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V7c0-2.209,1.791-4,4-4h10C19.209,3,21,4.791,21,7z M17.538,17l-4.186-5.99L16.774,7	h-1.311l-2.704,3.16L10.552,7H6.702l3.941,5.633L6.906,17h1.333l3.001-3.516L13.698,17H17.538z"
          ></path>
        </svg>
      );
    default:
      return <span>I</span>;
  }
};

// type FooterProps = {
//   lang: string;
// };

async function Footer() {
  const footerData: any = {
    footer: "Épica Rosario © 2023 - Todos los derechos reservados",
    ubicacion: "Rosario, Argentina",
    redesSociales: REDES,
  };

  if (!footerData) return null;
  const {
    footer,
    telefono = PAGE_INFO.telefono,
    email = PAGE_INFO.email,
    ubicacion,
    logo,
    redesSociales,
  } = footerData;

  return (
    <footer className="overflow-hidden bg-primary text-beige px-8 pb-2 ">
      <div className="relative flex flex-col justify-between 2xl:container 2xl:mx-auto">
        <div className="footer-inner z-20 flex flex-col justify-between gap-4 h-full">
          <Link href="/" className="">
            <Image
              src={"/logo.png"}
              width={500}
              height={500}
              alt="Logo de Épica Rosario"
              className="mx-auto max-w-[5rem]"
            />
          </Link>
          <div className="flex flex-col justify-between">
            <div className="hidden flex flex-col md:flex-row justify-between items-center">
              <p className="font-serif text-md md:text-xl font-light ">
                {footer}
              </p>

              <span className="overflow-hidden flex flex-col font-serif">
                <span className="button-text text-md md:text-xl">
                  {telefono}
                </span>
                <span className="button-text">{telefono}</span>
              </span>
            </div>

            <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-2">
              <div className="flex items-center gap-2 my-2">
                <div className="flex gap-3">
                  {redesSociales?.map((item: any, i: number) => {
                    if (
                      item.label.toUpperCase() == "TELEGRAM" ||
                      item.label.toUpperCase() == "WHATSAPP"
                    )
                      return;
                    return (
                      <Link
                        href={item.link ?? "/#"}
                        className="w-7 h-7 rounded-full border-1 border-[#dfd8cf1a] hover:opacity-70 flex justify-center bg-[#ed2866] items-center transition-all duration-300 ease-in-out"
                        key={i}
                      >
                        {icons(item.label.toUpperCase())}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <span className="overflow-hidden flex flex-col">
                <span className="button-text font-sans font-light uppercase text-xs md:text-md tracking-wide">
                  {telefono}
                </span>
                <span className="button-text font-sans font-light uppercase text-xs md:text-md tracking-wide">
                  {email}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-2 border-t border-[#dfd8cf1a] hidden">
          <p className="font-serif uppercase text-xs font-light text-white tracking-wide">
            © Épica Rosario — {new Date().getFullYear()} Todos los derechos
            reservados
          </p>
          <div className="page-links">
            <Link href="#" className="hidden">
              Privacy Policy
            </Link>
            <Link href="#" className="hidden">
              Terms of Use
            </Link>
          </div>
          <p className="l1 made-by">
            <span className="made-by__item"></span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
