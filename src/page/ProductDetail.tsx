import type {
  BaseProduct,
  Cameras,
  Categories,
  Chairs,
  Desktops,
  Drones,
  Laptops,
  Monitors,
  Phones,
  Tablets,
  TVs,
  Watches,
} from "@/types/Product";
import { useParams } from "react-router-dom";
import LaptopDetail from "./Detail/LaptopDetail";
import MonitorDetail from "./Detail/MonitorDetail";
import CameraDetail from "./Detail/CameraDetail";
import DesktopDetail from "./Detail/DesktopDetail";
import PhoneDetail from "./Detail/PhoneDetail";
import WatchDetail from "./Detail/WatchesDetail";
import TvsDetail from "./Detail/TvsDetail";
import DronesDetail from "./Detail/DronesDetail";
import ChairsDetail from "./Detail/ChairsDetail";
import TabletsDetail from "./Detail/TabletsDetail";

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
    case "monitors":
      return <MonitorDetail product={product as Monitors} />;
    case "cameras":
      return <CameraDetail product={product as Cameras} />;
    case "desktops":
      return <DesktopDetail product={product as Desktops} />;
    case "phones":
      return <PhoneDetail product={product as Phones} />;
    case "watches":
      return <WatchDetail product={product as Watches} />;
    case "tvs":
      return <TvsDetail product={product as TVs} />;
    case "drones":
      return <DronesDetail product={product as Drones} />;
    case "chairs":
      return <ChairsDetail product={product as Chairs} />;
    case "tablets":
      return <TabletsDetail product={product as Tablets} />;
    default:
      return <p>Category not supported yet!</p>;
  }
};

export default ProductDetail;
