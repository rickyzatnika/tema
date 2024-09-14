"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function ScrollSection() {
  const sectionRefs = useRef([]); // Ref untuk menyimpan section
  const containerRef = useRef(null); // Ref untuk container
  const currentIndex = useRef(0); // Untuk melacak section saat ini

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionRefs.current;

    const totalWidth = sections.reduce(
      (total, section) => total + section.offsetWidth,
      0
    );

    const containerTween = gsap.to(container, {
      x: () => -totalWidth + window.innerWidth,
      ease: "none",

      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => "+=" + totalWidth,
        scrub: 2,
        pin: true,
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: 1, // Durasi snap transisi
        },
      },
    });

    return () => {
      // Bersihkan ScrollTrigger dan tween GSAP
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      containerTween.kill();
    };
  }, []);

  const scrollToSection = (index) => {
    if (index >= 0 && index < sectionRefs.current.length) {
      currentIndex.current = index;
      const targetX = -index * window.innerWidth; // Hitung posisi berdasarkan lebar layar
      gsap.to(containerRef.current, {
        x: targetX,
        duration: 0.75,
        ease: "power2.inOut",
        stagger: 1,
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

  return (
    <section className="overflow-hidden relative">
      {/* Container utama untuk ScrollTrigger */}
      <div
        ref={containerRef}
        className="scroll-smooth w-[400vw] h-screen flex relative"
      >
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          className="text-white w-screen h-screen flex items-center justify-center bg-red-200"
        >
          <h3>Section 1</h3>
        </div>
        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          className="text-white w-screen h-screen flex items-center justify-center bg-blue-200"
        >
          <h3>Section 2</h3>
        </div>
        <div
          ref={(el) => (sectionRefs.current[2] = el)}
          className="text-white w-screen h-screen flex items-center justify-center bg-purple-200"
        >
          <h3>Section 3</h3>
        </div>
        <div
          ref={(el) => (sectionRefs.current[3] = el)}
          className="text-white w-screen h-screen flex items-center justify-center bg-pink-200"
        >
          <h3>Section 4</h3>
        </div>
      </div>

      <div className="flex fixed gap-4 bottom-8 left-8 w-full">
        <button
          onClick={handlePrev}
          className="p-4 bg-gray-100/20 backdrop-blur-sm antialiased text-[#111111] rounded-full"
        >
          <IoIosArrowBack size={30} />
        </button>
        <button
          onClick={handleNext}
          className="p-4 bg-gray-100/20 backdrop-blur-sm antialiased text-[#111111] rounded-full"
        >
          <IoIosArrowForward size={30} />
        </button>
      </div>
    </section>
  );
}

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
