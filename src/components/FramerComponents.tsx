import type { BaseProduct } from "@/types/Product";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LineClampText from "./LineClampText";
import { FaPause, FaPlay } from "react-icons/fa";

interface FramerAutoSliderProps {
  data: BaseProduct[];
  delay?: number;
  autoScroll?: boolean;
}

export const FramerAutoSlider: React.FC<FramerAutoSliderProps> = ({
  data,
  delay = 4000,
  autoScroll = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(autoScroll);
  const variants = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: 40, transition: { duration: 0.6 } },
  };

  const toggleAutoPlay = () => {
    setIsAutoScroll((prev) => !prev);
  };

  useEffect(() => {
    if (!isAutoScroll || data.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, delay);

    return () => clearInterval(timer);
  }, [isAutoScroll, data.length, delay]);

  const current = data[currentIndex];

  if (!data || data.length === 0 || !data[currentIndex]) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        No spotlight products available.
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-auto lg:h-[400px] overflow-hidden rounded-lg text-white
    bg-gradient-to-r from-pink-500 to-rose-400"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id || currentIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="grid sm:grid-cols-1 lg:grid-cols-2 items-center h-full gap-8
            p-6 lg:p-12"
        >
          <article className="space-y-3">
            <h1 className="text-3xl font-bold">{current.name}</h1>
            <h2 className="text-2xl font-semibold">{current.brand}</h2>
            <div>
              <LineClampText
                text={current.desc}
                classText="text-white/70 hidden lg:block"
                lines={0}
              />
              <LineClampText
                text={current.desc}
                classText="text-white/70 block lg:hidden"
                lines={2}
              />
            </div>
            <h3 className="text-xl font-bold">${current.price}</h3>
          </article>

          <aside className="flex justify-center lg:justify-end">
            <img
              src={current.thumbnail}
              alt={current.name}
              className="max-h-[400px] lg:max-h-[300px] w-auto rounded-lg shadow-lg object-cover"
            />
          </aside>
        </motion.div>
      </AnimatePresence>

      <aside className="absolute border py-2 px-4 top-4 left-4">
        <button
          onClick={toggleAutoPlay}
          className="flex items-center space-x-4 cursor-pointer"
        >
          {isAutoScroll ? <FaPause /> : <FaPlay />}
          <span>{isAutoScroll ? "Pause" : "Play"}</span>
        </button>
      </aside>
    </div>
  );
};
