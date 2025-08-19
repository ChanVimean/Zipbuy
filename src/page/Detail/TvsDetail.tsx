import type { TVs } from "@/types/Product";
import BaseDetail from "./BaseDetail";

interface TVDetailProps {
  product: TVs;
}

const TvsDetail: React.FC<TVDetailProps> = ({ product }) => {
  const fullSpecs = {
    screenSize: product.screenSize,
    resolution: product.resolution,
    panelType: product.panelType,
    smartPlatform: product.smartPlatform,
    refreshRate: product.refreshRate,
    hdmiPorts: product.hdmiPorts,
    usbPorts: product.usbPorts,
    voiceControl: product.voiceControl,
    hdrSupport: product.hdrSupport,
    speakerOutput: product.speakerOutput,
    release: product.release,
  };

  const extraContent = (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">Specifications</h2>
      <table className="w-full border border-gray-200 dark:border-gray-700 rounded-md">
        <tbody>
          {Object.entries(fullSpecs).map(([key, value], index) => (
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
                {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return <BaseDetail product={product} extraContent={extraContent} />;
};

export default TvsDetail;
