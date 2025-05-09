export type Categories = "laptops" | "monitors" | "cameras" | "desktops";

// ? Base Types
interface BaseProduct {
  id: number;
  brand: string;
  name: string;
  categories: Categories;
  price: number;
  available: boolean;
  limted: boolean;
  desc: string;
}

//#region Laptops
// ? Inner type
export type LaptopShortKeys =
  | "CPU"
  | "GPU"
  | "RAM"
  | "Storage"
  | "Display"
  | "OS"
  | "Battery"
  | "Weight";

export type LaptopShortSpecs = Partial<Record<LaptopShortKeys, string>>;
export type LaptopFullSpecs = LaptopShortSpecs & {
  keyboard: string;
  ports: string;
};

// TODO Product Type
export interface Laptops extends BaseProduct {
  categories: "laptops";
  shortSpecs: LaptopShortSpecs;
  fullSpecs: LaptopFullSpecs;
}
//#endregion

//#region Monitors
export type MonitorSpecKeys =
  | "Display"
  | "Refresh Rate"
  | "Response Time"
  | "Ports"
  | "HDR";

export type MonitorSpecs = Partial<Record<MonitorSpecKeys, string>>;

export interface Monitors extends BaseProduct {
  categories: "monitors";
  specs: MonitorSpecs;
}
//#endregion

//#region Cameras
export type CameraKeys =
  | "Sensor"
  | "Image Processor"
  | "Lens Mount"
  | "Stabilization"
  | "Autofocus"
  | "video"
  | "Display"
  | "EVF"
  | "Connectivity"
  | "Storage"
  | "Battery";

export type CameraSpecs = Partial<Record<CameraKeys, string>>;

export interface Cameras extends BaseProduct {
  categories: "cameras";
  specs: CameraSpecs;
}
//#endregion

//#region Desktops
export type DesktopShortKeys = "CPU" | "GPU" | "RAM" | "Storage";
export type DesktopFullKeys =
  | "cpu"
  | "gpu"
  | "ram"
  | "storage"
  | "motherboard"
  | "cooling"
  | "psu"
  | "os";
export type DesktopConnectivityKeys = "Wi-Fi" | "Bluetooth" | "Ethernet";
export type DesktopsExpansionKeys = "PCIe" | "RAM Slots";

export type DesktopShortSpecs = Partial<Record<DesktopShortKeys, string>>;
export type DesktopFullSpecs = Partial<Record<DesktopFullKeys, string>>;
export type DesktopConnectivity = Partial<Record<DesktopShortKeys, string>>;
export type DesktopExpansion = Partial<Record<DesktopsExpansionKeys, string>>;
export type DesktopPorts = {
  Front: string[];
  Rear: string[];
};

export interface Desktops extends BaseProduct {
  categories: "desktops";
  shortSpecs: DesktopShortSpecs;
  fullSpecs: DesktopFullSpecs;
  connectivity: DesktopConnectivity;
  ports: DesktopPorts;
  expansion: DesktopExpansion;
}
//#endregion
