import type { Monitors } from "@/types/Product";
import BaseDetail from "./BaseDetail";

interface MonitorDetailProps {
  product: Monitors;
}

const MonitorDetail: React.FC<MonitorDetailProps> = ({ product }) => {
  const extraContent = (
    <div>
      <h2 className="text-lg font-semibold mb-2">Specifications</h2>
      <table className="w-full border border-gray-200 dark:border-gray-700 rounded-md">
        <tbody>
          {Object.entries({
            Display: product.Display,
            "Refresh Rate": product.RefreshRate,
            "Response Time": product.ResponseTime,
            Ports: product.Ports,
            HDR: product.HDR,
          }).map(([key, value], index) => (
            <tr
              key={key}
              className={`
                border-b border-gray-200 dark:border-gray-700 
                ${index % 2 === 0 ? "bg-gray-100/50 dark:bg-gray-700/30" : ""}
                last:border-b-0
              `}
            >
              <td className="px-4 py-2 font-semibold capitalize w-1/3">
                {key}
              </td>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return <BaseDetail product={product} extraContent={extraContent} />;
};

export default MonitorDetail;
