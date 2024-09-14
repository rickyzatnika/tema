// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Loading from "@/components/Loading";

// const PageWrapper = ({ children }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Trigger loading when the pathname changes
//     const handleStart = () => {
//       setLoading(true);
//     };

//     const handleComplete = () => {
//       setLoading(false);
//     };

//     // Call handleStart whenever the pathname changes
//     handleStart();

//     // Simulate a delay to demonstrate loading effect (optional)
//     const timeout = setTimeout(handleComplete, 800);

//     return () => clearTimeout(timeout); // Cleanup timeout on unmount
//   }, [pathname]); // Dependency array to watch the pathname

//   return (
//     <>
//       {loading && <Loading />}{" "}
//       {/* Render loading component during transitions */}
//       {children}
//     </>
//   );
// };

// export default PageWrapper;

"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { usePathname } from "next/navigation";

const PageWrapper = ({ children }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    handleStart();

    const timeout = setTimeout(handleStop, 5000); // Simulate a delay to demonstrate loading effect

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [pathname]);

  return (
    <>
      {loading && <Loading />}
      {children}
    </>
  );
};

export default PageWrapper;
