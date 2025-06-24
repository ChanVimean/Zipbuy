export const CategoriesList: string[] = [
  "laptops",
  "monitors",
  "cameras",
  "desktops",
  "phones",
  "watches",
  "tvs",
  "drones",
  "chairs",
  "tablets",
] as const;
export type Categories = (typeof CategoriesList)[number];

// ? Base Types
export interface BaseProduct {
  id: number;
  brand: string;
  brandLogo: string;
  name: string;
  categories: Categories;
  price: number;
  discount: number;
  available: boolean;
  limited: boolean;
  rating: number;
  warranty: string;
  thumbnail: string;
  images: string[];
  desc: string;
}

//#region 1. Laptops
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

// TODO Laptops Type
export interface Laptops extends BaseProduct {
  categories: "laptops";
  shortSpecs: LaptopShortSpecs;
  fullSpecs: LaptopFullSpecs;
}
//#endregion

//#region 2. Monitors
// ? Inner type
export type MonitorSpecKeys =
  | "Display"
  | "Refresh Rate"
  | "Response Time"
  | "Ports"
  | "HDR";

export type MonitorSpecs = Partial<Record<MonitorSpecKeys, string>>;

// TODO Minitors Type
export interface Monitors extends BaseProduct {
  categories: "monitors";
  Display: string;
  RefreshRate: string;
  ResponseTime: string;
  Ports: string;
  HDR: string;
}
//#endregion

//#region 3. Cameras
// TODO Cameras Type
export interface Cameras extends BaseProduct {
  categories: "cameras";
  Sensor: string;
  ImageProcessor: string;
  LensMount: string;
  Stabilization: string;
  Autofocus: string;
  video: string;
  Display: string;
  EVF: string;
  Connectivity: string;
  Storage: string;
  Battery: string;
}
//#endregion

//#region 4. Desktops
// ? Inner type
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

// TODO Desktops Type
export interface Desktops extends BaseProduct {
  categories: "desktops";
  shortSpecs: DesktopShortSpecs;
  fullSpecs: DesktopFullSpecs;
  connectivity: DesktopConnectivity;
  ports: DesktopPorts;
  expansion: DesktopExpansion;
}
//#endregion

//#region 5. Phones
// ? Inner type
export type PhoneShortKeys =
  | "CPU"
  | "RAM"
  | "Storage"
  | "Display"
  | "Camera"
  | "Battery"
  | "OS";
export type PhoneShortSpecs = Partial<Record<PhoneShortKeys, string>>;
export type PhoneFullSpecs = PhoneShortSpecs & {
  sensor: string[];
  connectivity: string[];
  dimensions: string;
  wieght: string;
  sim: string;
};

// TODO Phones Type
export interface Phones extends BaseProduct {
  categories: "phones";
  shortSpecs: PhoneShortSpecs;
  fullSpecs: PhoneFullSpecs;
}
//#endregion

//#region 6. Watches
// TODO Watches Type
export interface Watches extends BaseProduct {
  categories: "watches";
  style: "Sport" | "Classic" | "Luxury" | "Casual";
  gender: "Men" | "Women" | "Unisex";
  features: string[];
  release: string;
  compatibility: string;
  strapMaterial: string;
  caseMaterial: string;
  battery: string;
  display: string;
  waterResistance: boolean;
}
//#endregion

//#region 7. TVs
/// TODO TVs Type
export interface TVs extends BaseProduct {
  categories: "tvs";
  screenSize: string;
  resolution: "8K" | "4K" | "1080p" | "720p";
  panelType: "OLED" | "QLED" | "LED" | "Mini-LED";
  smartPlatform: string;
  refreshRate: string;
  hdmiPorts: number;
  usbPorts: number;
  voiceControl: boolean;
  hdrSupport: string[];
  speakerOutput: string;
  release: string;
}
//#endregion

//#region 8. Drones
// TODO Drones Type
export interface Drones extends BaseProduct {
  categories: "drones";
  flightTime: string;
  maxRange: string;
  cameraResolution: string;
  videoResolution: string;
  gimbal: string;
  obstacleAvoidance: boolean;
  transmission: string;
  battery: string;
  weight: string;
  gps: boolean;
  controller: boolean;
  release: string;
}
//#endregion

//#region 9. Chairs
// TODO Chairs Type
export interface Chairs extends BaseProduct {
  categories: "chairs";
  type: "Gaming" | "Office" | "Ergonomic" | "Executive";
  material: string;
  frameMaterial: string;
  colors: string[];
  adjustable: string[];
  weightCapacity: string;
  dimensions: string;
  assemblyRequired: boolean;
  lumberSupport: boolean;
  footrest: boolean;
  release: string;
}
//#endregion

//#region 10. Tablets
// TODO Tablets Type
export interface Tablets extends BaseProduct {
  categories: "tablets";
  os: "iPadOS" | "Android" | "Windows";
  display: string;
  resolution: string;
  refreshRate: string;
  chipset: string;
  ram: string;
  storages: string[];
  connectivity: string[];
  stylusSupport: boolean;
  keyboardSupport: boolean;
  battery: string;
  release: string;
}
//#endregion
