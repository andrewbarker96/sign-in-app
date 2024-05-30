import { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize, KeyboardStyle } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "stockassoc.app",
  appName: "StockAssoc App",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
      resizeOnFullScreen: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
    },
    Browser: {
      windowName: "_blank",
      presentationStyle: "fullscreen",
      toolbarColor: "#488AFF",
      toolbarTitle: "StockAssoc App",
    },
  },
};

export default config;
