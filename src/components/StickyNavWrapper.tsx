import React, { useEffect, useState } from "react";

const StickyNavWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 0) return; // Ignore negative scroll

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setShow(false);
      } else {
        // Scrolling up - show navbar
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out
        bg-[var(--bg-theme)]
        ${show ? "translate-y-0 shadow-md" : "-translate-y-full"}
      `}
    >
      {children}
    </div>
  );
};

export default StickyNavWrapper;
