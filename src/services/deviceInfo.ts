import { Device } from "@capacitor/device";

export async function getDeviceInfo() {
  const info = await Device.getInfo();
  return info;
}
