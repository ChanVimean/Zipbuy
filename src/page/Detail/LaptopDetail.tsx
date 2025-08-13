import type { Laptops } from "@/types/Product";
import BaseDetail from "./BaseDetail";

interface LaptopDetailProps {
  product: Laptops;
}

const LaptopDetail: React.FC<LaptopDetailProps> = ({ product }) => {
  const extraContent = (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Specifications</h2>
      <ul className="list-disc list-inside">
        {Object.entries(product.shortSpecs).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
        <li>
          <strong>Keyboard:</strong> {product.fullSpecs.keyboard}
        </li>
        <li>
          <strong>Ports:</strong> {product.fullSpecs.ports}
        </li>
      </ul>
    </div>
  );

  return <BaseDetail product={product} extraContent={extraContent} />;
};

export default LaptopDetail;
