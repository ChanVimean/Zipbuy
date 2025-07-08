import { useState } from "react";

interface LineClampTextProps {
  text: string;
  lines?: 1 | 2 | 3 | 4 | 5;
  classText?: string;
}

const LineClampText: React.FC<LineClampTextProps> = ({
  text,
  lines = 2,
  classText = "text-sm",
}) => {
  const [expended, setExpended] = useState<boolean>(false);

  const lineClampClass = !expended
    ? lines === 1
      ? "line-clamp-1"
      : lines === 2
      ? "line-clamp-2"
      : lines === 3
      ? "line-clamp-3"
      : lines === 4
      ? "line-clamp-4"
      : lines === 5
      ? "line-clamp-5"
      : ""
    : "";

  return (
    <div className={`${classText}`}>
      <p
        className={`${
          expended ? "" : `${lineClampClass}`
        } transition-all duration-300`}
      >
        {text}
      </p>
      {text.length > 80 && (
        <button
          onClick={() => setExpended(!expended)}
          className="text-blue-600 text-xs mt-1 cursor-pointer"
        >
          {expended ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default LineClampText;
