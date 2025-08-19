import type { Drones } from "@/types/Product";
import BaseDetail from "./BaseDetail";

interface DroneDetailProps {
  product: Drones;
}

const DronesDetail: React.FC<DroneDetailProps> = ({ product }) => {
  const droneKeys: (keyof Drones)[] = [
    "flightTime",
    "maxRange",
    "cameraResolution",
    "videoResolution",
    "gimbal",
    "transmission",
    "battery",
    "weight",
    "release",
  ];

  const booleanKeys: (keyof Drones)[] = [
    "obstacleAvoidance",
    "gps",
    "controller",
  ];

  const extraContent = (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">Specifications</h2>
      <table className="w-full border border-gray-200 dark:border-gray-700 rounded-md">
        <tbody>
          {droneKeys.map((key, index) => (
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
              <td className="px-4 py-2">{product[key] ?? "-"}</td>
            </tr>
          ))}

          {/* Boolean fields at the bottom */}
          {booleanKeys.map((key, index) => (
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
              <td className="px-4 py-2">{product[key] ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return <BaseDetail product={product} extraContent={extraContent} />;
};

export default DronesDetail;
