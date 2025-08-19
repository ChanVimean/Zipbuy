import type { Cameras } from "@/types/Product";
import BaseDetail from "./BaseDetail";

interface CameraDetailProps {
  product: Cameras;
}

const CameraDetail: React.FC<CameraDetailProps> = ({ product }) => {
  const extraContent = (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">Specifications</h2>
      <table className="w-full border border-gray-200 dark:border-gray-700 rounded-md">
        <tbody>
          {Object.entries({
            Sensor: product.Sensor,
            "Image Processor": product.ImageProcessor,
            "Lens Mount": product.LensMount,
            Stabilization: product.Stabilization,
            Autofocus: product.Autofocus,
            Video: product.video,
            Display: product.Display,
            EVF: product.EVF,
            Connectivity: product.Connectivity,
            Storage: product.Storage,
            Battery: product.Battery,
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
                {key.replace(/_/g, " ")}
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

export default CameraDetail;
