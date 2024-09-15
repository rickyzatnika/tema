"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TransitionLink from "./TransitionLink";
import { useCursor } from "@/context/CursorContext";

const menuItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "Events",
    path: "/events",
  },
  {
    label: "Programs",
    path: "/programs",
  },
];

const Menu = () => {
  const pathname = usePathname();
  const containerRef = useRef();
  const tl = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const {
    handleCursorHover,
    handleElementMove,
    isHover,
    position,
    buttonPositions,
  } = useCursor();
  const socialMediaLinks = useRef();
  const buttonRefs = useRef([]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMouseEnter = (e) => {
    handleCursorHover(true, e.currentTarget.id); // Update elementId saat hover
    handleElementMove({
      x: e.clientX,
      y: e.clientY,
      elementId: e.currentTarget.id,
    });
  };

  const handleMouseLeave = (e) => {
    handleCursorHover(false, e.currentTarget.id); // Update elementId saat hover keluar
    handleElementMove({
      x: e.clientX,
      y: e.clientY,
      elementId: e.currentTarget.id,
    });
  };

  useGSAP(
    () => {
      gsap.set(".menu-links-item-holder", { y: 75 });
      gsap.set(socialMediaLinks.current.children, { y: 35, autoAlpha: 0 });
      gsap.set(".menu-info-sos", { y: 25, autoAlpha: 0 }); // Set posisi awal dan sembunyikan info
      gsap.set(".menu-info-cop", { y: 25, autoAlpha: 0 }); // Set posisi awal dan sembunyikan info

      tl.current = gsap
        .timeline({ pause: true })
        .to("#menu-overlay", {
          duration: 0.5,
          clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
          ease: "power2.inOut",
        })
        .to(".menu-links-item-holder", {
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.inOut",
        })
        .to(
          Array.from(socialMediaLinks.current.children), // Ubah menjadi array untuk animasi
          {
            y: 0,
            autoAlpha: 1, // Tampilkan gambar
            duration: 0.2,
            stagger: 0.1, // Delay berurutan untuk setiap gambar
            ease: "power2.inOut",
          }
        )
        .to(
          ".menu-info-sos", // Tambahkan animasi untuk info
          {
            y: 0,
            autoAlpha: 1, // Tampilkan info
            duration: 0.1,
            stagger: 0.1, // Delay berurutan untuk setiap info
            ease: "power2.inOut",
          }
        )
        .to(
          ".menu-info-cop", // Tambahkan animasi untuk info
          {
            y: 0,
            autoAlpha: 1, // Tampilkan info
            duration: 0.1,
            stagger: 0.1, // Delay berurutan untuk setiap info
            ease: "expo.out",
          }
        );
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isOpen]);

  // Pastikan untuk menyembunyikan elemen sebelum animasi
  useEffect(() => {
    if (socialMediaLinks.current) {
      const children = Array.from(socialMediaLinks.current.children);
      if (children.length > 0) {
        gsap.set(children, { y: 25, autoAlpha: 0 });
      }
    }
    gsap.set(".menu-info-cop", { y: 35, autoAlpha: 0 });
    gsap.set(".menu-info-sos", { y: 35, autoAlpha: 0 });
  }, []);

  useEffect(() => {
    if (buttonRefs.current.length > 0) {
      buttonRefs.current.forEach((btn) => {
        if (btn) {
          const sensitivity = 0.6; // Sensitivitas pergerakan, coba sesuaikan
          const xDiff =
            position.x - btn.getBoundingClientRect().left - btn.offsetWidth / 2;
          const yDiff =
            position.y - btn.getBoundingClientRect().top - btn.offsetHeight / 2;
          if (isHover && btn.id === position.elementId) {
            // Hitung jarak antara posisi kursor dan posisi tombol

            // Terapkan transformasi dengan sensitivitas kecil
            btn.style.transform = `translate3d(${xDiff * sensitivity}px, ${
              yDiff * sensitivity
            }px, 0)`;
            btn.style.transition = "transform 0.2s ease-out"; // Transisi yang halus
          } else {
            // Reset posisi tombol jika tidak di-hover
            btn.style.transform = `translate3d(0, 0, 0)`;
            btn.style.transition = "transform 0.2s ease-out"; // Transisi yang halus
          }
        }
      });
    }
  }, [position, isHover, buttonPositions]);

  return (
    <>
      <div ref={containerRef} className="menu-container ">
        <div className="menu-bar fixed top-0 left-0 w-screen py-[1em] px-[1em] md:px-[2em] flex justify-between items-center z-10">
          <Link
            id="button-logo"
            ref={(el) => (buttonRefs.current[0] = el)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            href="/"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
              priority={true}
              className="w-50 h-50 object-contain"
            />
          </Link>
          {isOpen === true ? (
            ""
          ) : (
            <button
              id="button-menu"
              ref={(el) => (buttonRefs.current[1] = el)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={toggleMenu}
              className="text-md"
            >
              MENU
            </button>
          )}
        </div>
        <div
          id="menu-overlay"
          className="fixed top-0 left-0 w-screen h-screen py-[1em] px-[2em] flex flex-wrap  bg-gradient-to-tr from-[#00B8F4] to-[#A0E0F0] z-20 clip_2"
        >
          <div className="menu-overlay-bar fixed top-0 left-0 w-screen p-[1em] px-[1em] md:px-[2em] flex justify-between items-center z-20">
            <Link
              id="button-logo"
              ref={(el) => (buttonRefs.current[2] = el)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={toggleMenu}
              href="/"
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="w-50 h-50 object-contain"
                priority={true}
              />
            </Link>
            <button
              id="button-close"
              ref={(el) => (buttonRefs.current[3] = el)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={toggleMenu}
              className="menu-close-icon text-white sd_text font-bold flex flex-2 items-end justify-end text-md  "
            >
              CLOSE
            </button>
          </div>

          <div className="menu-copy flex-grow flex flex-col justify-between pt-[5em]  md:pt-[4em]">
            <div className="menu-links ">
              {menuItems?.map((item, i) => (
                <div key={i} className="menu-links-item w-max clip">
                  <div
                    onClick={toggleMenu}
                    className="menu-links-item-holder relative"
                  >
                    <TransitionLink
                      href={item?.path}
                      label={item?.label}
                      className={`px-1 md:px-2 text-[calc(1.8em+1vw)] md:text-[calc(3em+1vw)]  leading-[115%] tracking-[-0.08em] uppercase  ${
                        pathname === item?.path
                          ? "text-white delay-1000 font-extrabold sd_text"
                          : "delay-1000 text-[#141414]"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              id="menu-info"
              className=" flex flex-col md:flex-row gap-6 justify-between md:items-end"
            >
              <span className="menu-info-cop text-md hidden md:flex items-end pl-4">
                TEMA INDONESIA © 2024
              </span>
              <div className="flex flex-col gap-2 ">
                <p className="menu-info-cop text-left md:text-center">
                  follow <span className="font-bold text-xl font-serif">&</span>{" "}
                  subscribe
                </p>
                <div
                  id="menu-info-col"
                  ref={socialMediaLinks}
                  className="flex-4 flex flex-row flex-wrap gap-2 md:gap-4 "
                >
                  <Link href="">
                    <Image
                      src="/ig.png"
                      alt="instagram"
                      width={20}
                      height={20}
                      className="w-8 h-8 md:w-10 md:h-10 opacity-80 hover:opacity-100"
                    />
                  </Link>
                  <Link href="">
                    <Image
                      src="/fb.png"
                      alt="youtube"
                      width={20}
                      height={20}
                      className="w-8 h-8 md:w-10 md:h-10 opacity-80 hover:opacity-100"
                    />
                  </Link>
                  <Link href="">
                    <Image
                      src="/in.png"
                      alt="youtube"
                      width={20}
                      height={20}
                      className="w-8 h-8 md:w-10 md:h-10 opacity-80 hover:opacity-100"
                    />
                  </Link>
                  <Link href="">
                    <Image
                      src="/yt.png"
                      alt="youtube"
                      width={20}
                      height={20}
                      className="w-8 h-8 md:w-10 md:h-10 opacity-80 hover:opacity-100"
                    />
                  </Link>
                </div>
              </div>
              <div className="menu-info-sos flex flex-col md:items-end">
                <p>info@tema.com</p>
                <p>+62 812 3456 789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
