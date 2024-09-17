import { IKImage } from "imagekitio-next";
import Image from "next/image";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const SectionTwo = ({ containerRef, handleMouseEnter, handleMouseLeave }) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-full bg-gradient-to-b lg:bg-gradient-to-t via-black/20 from-black/70 to-transparent z-20" />
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id="section-2"
        className="w-screen h-screen absolute top-0 left-0 z-0 "
      >
        <IKImage
          urlEndpoint={urlEndpoint}
          path="sectiontwo.jpg"
          alt="tema-universe"
          fill
          priority={true}
          className="object-cover "
        />
        <div className="absolute left-0 right-0 -bottom-1/4 w-full h-full z-40">
          <Image
            src="/universe.png"
            alt="tema-universe"
            width={690}
            height={361}
            priority={true}
            style={{ width: "100%", height: "100%" }}
            className="object-contain block lg:hidden "
          />
        </div>
      </div>
    </>
  );
};

export default SectionTwo;
