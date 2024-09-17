import { IKVideo, ImageKitProvider } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const SectionThree = ({ containerRef, handleMouseEnter, handleMouseLeave }) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-full bg-gradient-to-b via-black/20 from-black/60 to-transparent z-30" />
      <div id="section-2" className="w-screen h-screen absolute top-0  z-10 ">
        <IKVideo
          urlEndpoint={urlEndpoint}
          path="tema.mp4"
          width={2200}
          height={1200}
          transformation={[{ height: 1000, width: 1000 }]}
          controls={false}
          autoPlay={true}
          muted={true}
          className="object-cover"
        />
      </div>
    </>
  );
};

export default SectionThree;
