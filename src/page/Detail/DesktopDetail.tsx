import type { Desktops } from "@/types/Product";
import BaseDetail from "./BaseDetail";

interface DesktopDetailProps {
  product: Desktops;
}

const DesktopDetail: React.FC<DesktopDetailProps> = ({ product }) => {
  const renderTable = (title: string, specs: Record<string, string | string[]>) => (
    <div className="overflow-x-auto mb-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <table className="w-full border border-gray-200 dark:border-gray-700 rounded-md">
        <tbody>
          {Object.entries(specs).map(([key, value], index) => (
            <tr
              key={key}
              className={`
                border-b border-gray-200 dark:border-gray-700
                ${index % 2 === 0 ? "bg-gray-100/50 dark:bg-gray-700/30" : ""}
                last:border-b-0
              `}
            >
              <td className="px-4 py-2 font-semibold capitalize w-1/3">
                {key.replace(/_/g, " ")}
              </td>
              <td className="px-4 py-2">
                {Array.isArray(value) ? value.join(", ") : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const extraContent = (
    <div>
      {/* Short Specs */}
      {renderTable("Short Specs", product.shortSpecs)}

      {/* Full Specs */}
      {renderTable("Full Specs", product.fullSpecs)}

      {/* Connectivity */}
      {renderTable("Connectivity", product.connectivity)}

      {/* Ports */}
      {renderTable("Ports - Front", { Front: product.ports.Front })}
      {renderTable("Ports - Rear", { Rear: product.ports.Rear })}

      {/* Expansion */}
      {renderTable("Expansion", product.expansion)}
    </div>
  );

  return <BaseDetail product={product} extraContent={extraContent} />;
};

export default DesktopDetail;
