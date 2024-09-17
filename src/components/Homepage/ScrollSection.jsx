"use client";

import { useCursor } from "@/context/CursorContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";

gsap.registerPlugin(ScrollTrigger);

const ScrollSection = () => {
  const {
    handleCursorHover,
    isHover,
    handleElementMove,
    position,
    buttonPositions,
  } = useCursor();

  const sectionRefs = useRef([]); // Ref untuk menyimpan section
  const containerRef = useRef(null); // Ref untuk container
  const currentIndex = useRef(0); // Untuk melacak section saat ini
  const buttonRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionRefs.current;

    const totalWidth = sections.reduce(
      (total, section) => total + section.offsetWidth,
      0
    );

    const scl = gsap.to(container, {
      x: () => -totalWidth + window.innerWidth,
      ease: "none",

      scrollTrigger: {
        trigger: container,
        start: "top left",
        end: () => "+=" + totalWidth,
        scrub: 1,
        pin: true,
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: 0.3,
          ease: "none",
        },
      },
    });
    return () => {
      scl.kill();
    };
  }, []);

  const scrollToSection = (index) => {
    if (index >= 0 && index < sectionRefs.current.length) {
      currentIndex.current = index;
      const targetX = -index * window.innerWidth; // Hitung posisi berdasarkan lebar layar
      gsap.to(containerRef.current, {
        x: targetX,
        autoKill: false,
        duration: 0.75,
        ease: "power2.inOut",
      });
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex.current - 1;
    if (newIndex >= 0) {
      scrollToSection(newIndex);
    }
  };

  const handleNext = () => {
    const newIndex = currentIndex.current + 1;
    if (newIndex < sectionRefs.current.length) {
      scrollToSection(newIndex);
    }
  };

  useEffect(() => {
    if (buttonRefs.current.length > 0) {
      buttonRefs.current.forEach((btn) => {
        if (btn) {
          const sensitivity = 0.8; // Sensitivitas pergerakan, coba sesuaikan
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
            btn.style.transition = "transform 0.3s ease-out"; // Transisi yang halus
            btn.style.color = "black";
          } else {
            // Reset posisi tombol jika tidak di-hover
            btn.style.transform = `translate3d(0, 0, 0)`;
            btn.style.transition = "transform 0.3s ease-out";
            btn.style.color = "white";
          }
        }
      });
    }
  }, [position, isHover, buttonPositions]);

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

  return (
    <section className="overflow-y-hidden relative cursor-none">
      {/* Container utama untuk ScrollTrigger */}
      <div ref={containerRef} className="w-[500vw] h-screen flex relative ">
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          className="relative text-white w-screen h-screen  "
        >
          <SectionOne
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            containerRef={containerRef}
          />
        </div>
        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          className="text-white w-screen h-screen relative  "
        >
          <SectionTwo
            id="section-2"
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            containerRef={containerRef}
          />
        </div>
        <div
          ref={(el) => (sectionRefs.current[2] = el)}
          className="text-white w-screen h-screen relative "
        >
          <SectionThree
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            containerRef={containerRef}
          />
        </div>
        {/* <div
          id="section-4"
          ref={(el) => (sectionRefs.current[3] = el)}
          className="text-white w-screen h-screen flex flex-col gap-4 items-center justify-center bg-red-200"
        >
          <h3
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            id="title-1"
            className="text-white text-4xl"
          >
            Section 4
          </h3>
          <p id="title-2" className="text-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div> */}
      </div>
      <div className="flex fixed gap-4 bottom-3 lg:bottom-8 left-8 w-full z-10">
        <button
          id="button-prev"
          ref={(el) => (buttonRefs.current[0] = el)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handlePrev}
          className="p-3 bg-gray-100/20 shadow-md backdrop-blur-sm antialiased rounded-full"
        >
          <IoIosArrowBack size={26} />
        </button>
        <button
          id="button-next"
          ref={(el) => (buttonRefs.current[1] = el)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleNext}
          className="p-3 bg-gray-100/20 shadow-md backdrop-blur-sm antialiased rounded-full"
        >
          <IoIosArrowForward size={26} />
        </button>
      </div>
    </section>
  );
};

export default ScrollSection;

/* 

SLIDER WITH DRAGGING

"use client";

import { useRef, useEffect, useState } from "react";

const ScrollSection = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const sectionWidth = container.clientWidth;

    // Hitung index section berdasarkan posisi scroll
    const sectionIndex = Math.round(container.scrollLeft / sectionWidth);
    const targetSection = sectionRefs.current[sectionIndex];

    if (targetSection) {
      container.scrollTo({
        left: targetSection.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.getBoundingClientRect().left);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.getBoundingClientRect().left;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    handleScroll(); // Scroll ke section saat mouse diangkat
  };

  useEffect(() => {
    const container = containerRef.current;

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <div
      ref={containerRef}
      className="w-screen overflow-x-auto cursor-grab flex snap-mandatory snap-x scroll-smooth transition-all duration-1000"
    >
      <div className="bg-purple-300 touch-pan-x  flex-none w-screen h-screen snap-start transition-all duration-1000  flex items-center justify-center">
        Section One
      </div>
      <div className="bg-orange-200 touch-pan-x  flex-none w-screen h-screen snap-start transition-all duration-1000   flex items-center justify-center">
        Section Two
      </div>
      <div className="bg-pink-300 touch-pan-x flex-none w-screen h-screen snap-start transition-all duration-1000   flex items-center justify-center">
        Section Three
      </div>
      <div className="bg-teal-200 touch-pan-x flex-none w-screen h-screen snap-start transition-all duration-1000   flex items-center justify-center">
        Section Four
      </div>
    </div>
  );
};

export default ScrollSection;




*/
