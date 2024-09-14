"use client";

import { usePathname } from "next/navigation";

const Wrapper = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <div className={`${isHome ? "" : "pt-[5em]"}`}>{children}</div>
    </>
  );
};

export default Wrapper;
