"use client";

import { animatePageOut } from "@/utils/animation";
import { usePathname, useRouter } from "next/navigation";

const TransitionLink = ({
  href,
  label,
  className,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      href={href}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default TransitionLink;
