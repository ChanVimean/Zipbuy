import type { Chairs } from "@/types/Product";
import BaseDetail from "./BaseDetail";

interface ChairDetailProps {
  product: Chairs;
}

const ChairsDetail: React.FC<ChairDetailProps> = ({ product }) => {
  // Ordered keys exactly as in Chairs interface
  const keysInOrder: (keyof Chairs)[] = [
    "type",
    "material",
    "frameMaterial",
    "colors",
    "adjustable",
    "weightCapacity",
    "dimensions",
    "release",
    "assemblyRequired",
    "lumberSupport",
    "footrest",
  ];

  const extraContent = (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">Specifications</h2>
      <table className="w-full border border-gray-200 dark:border-gray-700 rounded-md">
        <tbody>
          {keysInOrder.map((key, index) => (
            <tr
              key={key}
              className={`
                border-b border-gray-200 dark:border-gray-700
                ${index % 2 === 0 ? "bg-gray-100/10 dark:bg-gray-700/80" : ""}
                last:border-b-0
              `}
            >
              <td className="px-4 py-2 font-semibold capitalize w-1/3">
                {key.replace(/_/g, " ")}
              </td>
              <td className="px-4 py-2">
                {Array.isArray(product[key])
                  ? product[key].join(", ")
                  : typeof product[key] === "boolean"
                  ? product[key]
                    ? "Yes"
                    : "No"
                  : product[key]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return <BaseDetail product={product} extraContent={extraContent} />;
};

export default ChairsDetail;
