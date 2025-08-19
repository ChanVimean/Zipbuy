import type { Watches } from "@/types/Product";
import BaseDetail from "./BaseDetail";

interface WatchDetailProps {
  product: Watches;
}

const WatchDetail: React.FC<WatchDetailProps> = ({ product }) => {
  const extraContent = (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">Specifications</h2>
      <table className="w-full border border-gray-200 dark:border-gray-700 rounded-md">
        <tbody>
          {Object.entries(product).map(([key, value], index) => {
            if (["id", "categories", "name", "brandLogo"].includes(key))
              return null;

            return (
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
                  {typeof value === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : Array.isArray(value)
                    ? value.join(", ")
                    : value.toString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return <BaseDetail product={product} extraContent={extraContent} />;
};

export default WatchDetail;
