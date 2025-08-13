import type { BaseProduct, Categories, Laptops } from "@/types/Product";
import { useParams } from "react-router-dom";
import LaptopDetail from "./Detail/LaptopDetail";

const ProductDetail: React.FC = () => {
  const { category, id } = useParams<{ category: Categories; id: string }>();

  const products: BaseProduct[] = JSON.parse(
    localStorage.getItem("products") || "[]"
  );

  const product = products.find(
    (p) => p.id === Number(id) && p.categories === category
  );

  if (!product) return <p>Product not found!</p>;

  switch (category) {
    case "laptops":
      return <LaptopDetail product={product as Laptops} />;
    default:
      return <p>Category not supported yet!</p>;
  }
};

export default ProductDetail;
