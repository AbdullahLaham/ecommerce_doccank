// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform } from "react-native";

// export type NotificationPayload = {
//   type: "ORDER" | "MESSAGE" | "PROMOTION" | "SYSTEM";
//   data?: Record<string, any>;
// };

// class NotificationService {
//   async registerForPushNotifications() {
//     if (!Device.isDevice) return null;

//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();

//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== "granted") {
//       throw new Error("Permission not granted");
//     }

//     const token = (await Notifications.getExpoPushTokenAsync()).data;

//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//       });
//     }

//     return token;
//   }

//   onReceive(callback: (notification: Notifications.Notification) => void) {
//     return Notifications.addNotificationReceivedListener(callback);
//   }

//   onResponse(callback: (response: Notifications.NotificationResponse) => void) {
//     return Notifications.addNotificationResponseReceivedListener(callback);
//   }
// }

// export const notificationService = new NotificationService();













// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform } from "react-native";

// Notifications.setNotificationHandler({
//   handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,

//     // ✅ REQUIRED in newer Expo versions
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });


// class NotificationService {
//   async registerForPushNotifications() {
//     if (!Device.isDevice) return null;

//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();

//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== "granted") {
//       throw new Error("Notification permission not granted");
//     }

//     const token = (await Notifications.getExpoPushTokenAsync()).data;

//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }

//     return token;
//   }

//   onReceive(callback: (notification: Notifications.Notification) => void) {
//     return Notifications.addNotificationReceivedListener(callback);
//   }

//   onResponse(
//     callback: (response: Notifications.NotificationResponse) => void
//   ) {
//     return Notifications.addNotificationResponseReceivedListener(callback);
//   }

//   async getInitialNotification() {
//     return await Notifications.getLastNotificationResponseAsync();
//   }
// }

// export const notificationService = new NotificationService();




import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import axios from "axios";
import { getToken } from "@/lib/auth-storage";

/* -------------------------------------------------------------------------- */
/*                           NOTIFICATION HANDLER                             */
/* -------------------------------------------------------------------------- */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

class NotificationService {
  async registerForPushNotifications(): Promise<string | null> {
    // ❌ لا يعمل على Emulator
    if (!Device.isDevice) return null;

    // 1️⃣ Permissions
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    // 2️⃣ Get Expo Push Token
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')

    // 3️⃣ Android channel
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    // 4️⃣ Send token to backend ✅
    try {
      const authtoken = await getToken();
      await axios.post(
        "https://docank.mahmoudalbatran.com/api/device-tokens",
        {
          token,
          device_name: Device.modelName ?? "Unknown device",
        },
         {
        headers : {
          Authorization: `Bearer ${authtoken}`,
        }
      }
      );

      console.log("✅ Token sent to backend:", token);
    } catch (error) {
      console.error("❌ Failed to send token:", error);
    }

    return token;
  }

  onReceive(callback: (notification: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(callback);
  }

  onResponse(
    callback: (response: Notifications.NotificationResponse) => void
  ) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  async getInitialNotification() {
    return await Notifications.getLastNotificationResponseAsync();
  }
}

export const notificationService = new NotificationService();
