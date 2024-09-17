import { useCursor } from "@/context/CursorContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IKImage } from "imagekitio-next";
import Image from "next/image";
import React from "react";
import { Protest_Guerrilla } from "next/font/google";
import { Quantico } from "next/font/google";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const protes = Protest_Guerrilla({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});
const quantico = Quantico({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const SectionOne = ({ containerRef, handleMouseEnter, handleMouseLeave }) => {
  const { isHover } = useCursor();

  useGSAP(
    () => {
      const container = containerRef.current;

      gsap.context(() => {
        const t1 = gsap.timeline();
        t1.from("#section-1", {
          duration: 1.3,
          xPercent: "100",
          ease: "power2.inOut",
          delay: 1,
        })
          .from("#foto", {
            opacity: 0,
            y: "50",
            duration: 1,
          })
          .from(" #logo_geger", {
            opacity: 0,
            scale: 10,
            duration: 0.6,
            ease: "since.in",
          })
          .from(" #title", {
            opacity: 0,
            y: "35",
            rotate: "0",
            duration: 0.8,
            ease: "bounce",
            stagger: 0.5,
          })
          .from(" #text-animate", {
            opacity: 0,
            xPercent: "-100",
            duration: 1,
          })
          .to("#foto", {
            opacity: 1,
            y: "0",
            duration: 0.5,
            delay: 0.1,
          })
          .to("#logo_geger", {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.3,
            ease: "since.in",
          })
          .to("#title", {
            opacity: 1,
            y: "0",
            duration: 0.8,
            delay: 0.1,
            rotate: "-12",
            ease: "bounce",
            stagger: 0.2,
          })
          .to(" #text-animate", {
            opacity: 1,
            xPercent: "0",
            y: "15",
            duration: 0.8,
            delay: 0.5,
          });

        // Animasi locomotif untuk teks
        const textGroup = document.querySelectorAll(".text-group");

        // Ambil lebar dari satu grup teks
        const textWidth = textGroup[0].offsetWidth;

        // GSAP animation untuk memindahkan teks secara terus menerus
        gsap.to(textGroup, {
          x: `-${textWidth}px`, // Geser sepanjang lebar satu grup teks
          duration: 30, // Durasi animasi (sesuaikan dengan kebutuhan)
          ease: "linear", // Gunakan linear untuk perpindahan yang mulus
          repeat: -1, // Infinite loop
          modifiers: {
            x: (x) => `${parseFloat(x) % textWidth}px`, // Loop terus menerus tanpa jeda
          },
        });
      }, container);
    },
    { scope: containerRef }
  );

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-full bg-gradient-to-t via-black/20 from-black to-transparent z-30" />
      <div
        id="section-1"
        className="w-screen h-screen absolute top-0 left-0 z-0 "
      >
        <IKImage
          urlEndpoint={urlEndpoint}
          path="bg.jpg"
          fill
          priority={true}
          alt="background"
          className="object-cover "
        />
      </div>
      <div id="foto" className="w-full h-full absolute top-0 left-0 z-20">
        <Image
          src="/object.png"
          alt="bg"
          width={1200}
          height={1200}
          className="object-cover w-full h-full "
          priority={true}
        />
      </div>
      <div
        id="logo_geger"
        className="w-72 lg:w-96 mx-auto h-full absolute top-56 left-0 right-0 z-40"
      >
        <Image
          src="/geger.png"
          alt="bg"
          width={500}
          height={500}
          className="object-cover "
          priority={true}
        />
      </div>

      <div className="relative z-30  top-1 lg:top-20 w-full h-full flex gap-0 lg:gap-4 flex-col items-center justify-center overflow-hidden">
        <h3
          id="title"
          className={` relative z-40 origin-center text-transparent bg-clip-text bg-gradient-to-br from-[#36ff58]  to-[#ffd000] text-3xl lg:text-5xl font-extrabold text-center  ${protes.className}`}
        >
          JEGEL <span>&</span> RIGEN GERRR!
        </h3>
        {/* animate text */}

        <div
          id="text-animate"
          className="absolute bottom-32 lg:bottom-1/3 left-0  bg-[#C5B593]/20 flex items-center py-4 px-2 lg:px-4 overflow-hidden"
        >
          <h3
            className={` text-2xl hidden lg:flex  font-bold align-end whitespace-nowrap pr-2 ${protes.className}`}
          >
            GUEST STAR :{" "}
          </h3>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            id="locomotive-text"
            className="w-screen flex overflow-hidden"
          >
            <div
              className={` text-group flex text-xl items-center ${
                isHover ? "hover-effect" : ""
              } ${quantico.className} `}
            >
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                indro warkop -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                ernest prakasa -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                andre taulany -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                raditya dika -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                ekooju -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                R7 -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                ge pamungkas -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                arie kriting -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                jonathan liandi -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                onad -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                livy renata -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                vonzy -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                catheez -
              </p>
              <p className="uppercase antialiased  font-semibold pr-3 whitespace-nowrap">
                siskaeee -
              </p>
            </div>

            {/* Duplikasi teks untuk membuat efek seamless scrolling */}
            <div
              className={` text-group flex text-xl items-center ${
                isHover ? "hover-effect" : ""
              } ${quantico.className} `}
            >
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                indro warkop -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                ernest prakasa -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                andre taulany -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                raditya dika -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                ekooju -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                R7 -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                ge pamungkas -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                arie kriting -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                jonathan liandi -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                onad -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                livy renata -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                vonzy -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                catheez -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                siskaeee -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                indro warkop -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                ernest prakasa -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                andre taulany -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                raditya dika -
              </p>
              <p className="uppercase antialiased font-semibold pr-3 whitespace-nowrap">
                Many More...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionOne;
