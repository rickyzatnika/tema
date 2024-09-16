import { useCursor } from "@/context/CursorContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IKImage } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const SectionTwo = ({ containerRef, handleMouseEnter, handleMouseLeave }) => {
  const { isHover } = useCursor();

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-full bg-gradient-to-t via-black/20 from-black to-transparent z-30" />
      <div
        id="section-2"
        className="w-screen h-screen absolute top-0 left-0 z-0 "
      >
        <IKImage
          urlEndpoint={urlEndpoint}
          path="sectiontwo.jpg"
          fill
          priority={true}
          className="object-cover "
        />
      </div>
    </>
  );
};

export default SectionTwo;
