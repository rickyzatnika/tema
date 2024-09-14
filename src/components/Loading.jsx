"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";

const Loading = () => {
  const containerRef = useRef();
  const tl = useRef();

  useEffect(() => {
    gsap.set(".loadingsImage", { y: -100, opacity: 0, rotate: 180 });
    gsap.set(".loadingText", {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      opacity: 0,
    });
    gsap.set(".loadings", {
      width: "0",
      left: "-100%",
      transformOrigin: "left center",
      opacity: 0,
    });

    tl.current = gsap
      .timeline({ paused: true })
      // Animate container/background (appear)
      .to(".loadings", {
        scaleX: 1, // Scale to full width (100%)
        duration: 1.5, // Duration for elastic effect
        ease: "none", // Elastic easing for smooth and bouncy effect
        width: "100%",
        left: "0%",
        opacity: 1,
      })
      // Animate the image (logo)
      .to(".loadingsImage", {
        y: 0,
        opacity: 1,
        duration: 0.75, // Longer for smoother entrance
        ease: "bounce.out",
        stagger: 0.1,
        rotate: 0,
        delay: -0.5, // Overlap with the background animation
      })
      // Animate the text with clip-path
      .to(".loadingText", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        duration: 1.5,
        ease: "power4.inOut",
        delay: -0.5, // Overlap with the logo animation
      })
      // Fade out the image (logo)
      .to(".loadingsImage", {
        opacity: 0,
        duration: 1.5, // Slow fade out
        ease: "power4.out",
      })
      // Animate the text fade-out
      .to(
        ".loadingText",
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          opacity: 0,
          duration: 0.8, // Clip out and fade out
          ease: "power4.out",
        },
        "-=1" // Overlap with the image fade-out
      )

      // Animate container/background exit with elastic effect
      .to(
        ".loadings",
        {
          width: "0",
          duration: 0.5, // Duration for elastic effect
          ease: "none", // Elastic easing for smooth and bouncy exit
          left: "100%",
        },
        "-=1" // Overlap with the text fade-out
      );
    tl.current.play();

    return () => {
      tl.current.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="loadings fixed  w-screen bg-gradient-to-bl from-[#00B8F4] to-[#A0E0F0] h-screen z-[99999] flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center loadingsImage ">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-32 h-32 "
          />
        </div>

        <span className="loadingText text-white text-xl font-semibold">
          Tema Indonesia
        </span>
      </div>
    </div>
  );
};

export default Loading;
