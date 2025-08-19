import { useCallback, useEffect, useState } from "react";

interface UseAutoSliderProps {
  length: number;
  delay?: number;
  auto?: boolean;
}

const useAutoSlider = ({
  length,
  delay = 4000,
  auto = true,
}: UseAutoSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(auto);

  const toggleAutoPlay = useCallback(
    () => setIsAutoScroll((prev) => !prev),
    []
  );

  useEffect(() => {
    if (!isAutoScroll || length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, delay);

    return () => clearInterval(timer);
  }, [isAutoScroll, length, delay]);

  return { currentIndex, isAutoScroll, toggleAutoPlay, setCurrentIndex };
};

export default useAutoSlider;
