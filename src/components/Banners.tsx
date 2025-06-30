interface TailwindProps {
  onSm?: string;
  onMd?: string;
  onLg?: string;
  object?: string;
  titleColor?: "light" | "dark";
}

interface BannersProps extends TailwindProps {
  src: string;
  alt?: string;
  title?: string;
  btnText?: string;
  btnOnClick?: () => void;
}

const Banners: React.FC<BannersProps> = ({
  src,
  alt = "Banner Image",
  title,
  btnText,
  btnOnClick,
  onSm = "h-[150px]",
  onMd = "md:h-[350px]",
  onLg = "lg:h-[500px]",
  object = "object-cover",
  titleColor = "dark",
}) => {
  const titleColorStyle =
    titleColor === "light"
      ? "text-[var(--textLight-theme)]"
      : "text-[var(--textDark-theme)]";

  return (
    <div>
      <section className="relative">
        <div
          className={`${onSm} ${onMd} ${onLg}
            w-auto rounded-sm md:rounded-lg overflow-hidden`}
        >
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${object}`}
          />

          {/* Optional - Default Hidden */}
          {title && btnText && (
            <aside
              className="w-1/2 md:w-1/ absolute z-10
              left-6 md:left-16 lg:left-24
              top-1/2 -translate-y-1/2
              space-y-4 md:space-y-6 lg:space-y-8"
            >
              <h1
                className={`${titleColorStyle} font-bold text-lg md:text-2xl lg:text-4xl`}
              >
                {title}
              </h1>
              <button
                onClick={btnOnClick}
                className="font-semibold text-md md:text-lg lg:text-xl
                  bg-[var(--bg-theme)] rounded-sm shadow-md
                  px-4 py-1 md:px-6 md:py-2"
              >
                {btnText}
              </button>
            </aside>
          )}
        </div>
      </section>
    </div>
  );
};

export default Banners;
