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




// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform } from "react-native";
// import axios from "axios";
// import { getToken } from "@/lib/auth-storage";

// /* -------------------------------------------------------------------------- */
// /*                           NOTIFICATION HANDLER                             */
// /* -------------------------------------------------------------------------- */

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// class NotificationService {
//   async registerForPushNotifications(): Promise<string | null> {
//     // ❌ لا يعمل على Emulator
//     if (!Device.isDevice) return null;

//     // 1️⃣ Permissions
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();

//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== "granted") {
//       console.log("Notification permission denied");
//       return null;
//     }

//     // 2️⃣ Get Expo Push Token
//     const token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')

//     // 3️⃣ Android channel
//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//       });
//     }

//     // 4️⃣ Send token to backend ✅
//     try {
//       const authtoken = await getToken();
//       await axios.post(
//         "https://docank.mahmoudalbatran.com/api/device-tokens",
//         {
//           token,
//           device_name: Device.modelName ?? "Unknown device",
//         },
//          {
//         headers : {
//           Authorization: `Bearer ${authtoken}`,
//         }
//       }
//       );

//       console.log("✅ Token sent to backend:", token);
//     } catch (error) {
//       console.error("❌ Failed to send token:", error);
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







































// // services/NotificationService.ts
// import messaging, {
//   FirebaseMessagingTypes,
// } from "@react-native-firebase/messaging";
// import DeviceInfo from "react-native-device-info";
// import { Platform } from "react-native";
// import axios from "axios";
// import { getToken } from "@/lib/auth-storage";

// /* -------------------------------------------------------------------------- */
// /*                         FCM NOTIFICATION SERVICE                            */
// /* -------------------------------------------------------------------------- */

// class NotificationService {
//   /* ------------------------------------------------------------------------ */
//   /*                          REGISTER DEVICE (FCM)                           */
//   /* ------------------------------------------------------------------------ */
//   async registerForPushNotifications(): Promise<string | null> {
//     try {
//       /**
//        * 1️⃣ iOS permission (Android auto-granted)
//        */
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (!enabled) {
//         console.log("❌ Notification permission denied");
//         return null;
//       }

//       /**
//        * 2️⃣ Get REAL FCM token
//        */
//       const fcmToken = await messaging().getToken();
//       console.log("🔥 FCM TOKEN:", fcmToken);

//       /**
//        * 3️⃣ Device name
//        */
//       const deviceName = await DeviceInfo.getDeviceName();

//       /**
//        * 4️⃣ Send token to backend (Laravel)
//        */
//       const authToken = await getToken();

//       await axios.post(
//         "https://docank.mahmoudalbatran.com/api/device-tokens",
//         {
//           token: fcmToken,
//           device_name: deviceName,
//           platform: Platform.OS,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       console.log("✅ FCM token sent to backend");

//       return fcmToken;
//     } catch (error) {
//       console.error("❌ Failed to register FCM:", error);
//       return null;
//     }
//   }

//   /* ------------------------------------------------------------------------ */
//   /*                       FOREGROUND NOTIFICATIONS                            */
//   /* ------------------------------------------------------------------------ */
//   onReceive(
//     callback: (message: FirebaseMessagingTypes.RemoteMessage) => void
//   ) {
//     return messaging().onMessage(async remoteMessage => {
//       callback(remoteMessage);
//     });
//   }

//   /* ------------------------------------------------------------------------ */
//   /*                    NOTIFICATION TAP (BACKGROUND / QUIT)                  */
//   /* ------------------------------------------------------------------------ */
//   onResponse(
//     callback: (message: FirebaseMessagingTypes.RemoteMessage) => void
//   ) {
//     // App opened from background
//     messaging().onNotificationOpenedApp(remoteMessage => {
//       callback(remoteMessage);
//     });

//     // App opened from killed state
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           callback(remoteMessage);
//         }
//       });
//   }
// }

// export const notificationService = new NotificationService();










import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import axios from "axios";
import { getToken } from "@/lib/auth-storage";


/* -------------------------------------------------------------------------- */
/*                         FCM NOTIFICATION SERVICE                            */
/* -------------------------------------------------------------------------- */

class NotificationService {
  /* ------------------------------------------------------------------------ */
  /*                          REGISTER DEVICE (FCM)                           */
  /* ------------------------------------------------------------------------ */
  async registerForPushNotifications(): Promise<string | null> {
    try {
      // 1️⃣ iOS permission (Android auto-granted)
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log("❌ Notification permission denied");
        return null;
      }

      // 2️⃣ Get REAL FCM token
      const fcmToken = await messaging().getToken();
      console.log("🔥 FCM TOKEN:", fcmToken);

      // 3️⃣ Device name
      const deviceName = await DeviceInfo.getDeviceName();

      // 4️⃣ Send token to backend
      await this.sendTokenToBackend(fcmToken, deviceName);

      // 5️⃣ Listen for token refresh (VERY IMPORTANT)
      messaging().onTokenRefresh(async newToken => {
        console.log("🔄 FCM token refreshed:", newToken);
        await this.sendTokenToBackend(newToken, deviceName);
      });

      return fcmToken;
    } catch (error) {
      console.error("❌ Failed to register FCM:", error);
      return null;
    }
  }

  /* ------------------------------------------------------------------------ */
  /*                          SEND TOKEN TO BACKEND                           */
  /* ------------------------------------------------------------------------ */
  private async sendTokenToBackend(token: string, deviceName: string) {
    const authToken = await getToken();

    await axios.post(
      "https://docank.mahmoudalbatran.com/api/device-tokens",
      {
        token,
        device_name: deviceName,
        platform: Platform.OS,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("✅ FCM token sent to backend");
  }

  /* ------------------------------------------------------------------------ */
  /*                       FOREGROUND NOTIFICATIONS                            */
  /* ------------------------------------------------------------------------ */
  onReceive(
    callback: (message: FirebaseMessagingTypes.RemoteMessage) => void
  ) {
    return messaging().onMessage(callback);
  }














  /* ------------------------------------------------------------------------ */
  /*                   NOTIFICATION TAP (BACKGROUND)                          */
  /* ------------------------------------------------------------------------ */
  onNotificationOpened(
    callback: (message: FirebaseMessagingTypes.RemoteMessage) => void
  ) {
    return messaging().onNotificationOpenedApp(callback);
  }

  /* ------------------------------------------------------------------------ */
  /*                       APP OPENED FROM KILLED                             */
  /* ------------------------------------------------------------------------ */
  async getInitialNotification() {
    return messaging().getInitialNotification();
  }
}

export const notificationService = new NotificationService();









// // services/notification.service.ts
// import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
// import notifee, { AndroidImportance } from "@notifee/react-native";
// import DeviceInfo from "react-native-device-info";
// import { Platform } from "react-native";
// import axios from "axios";
// import { getToken } from "@/lib/auth-storage";

// /* -------------------------------------------------------------------------- */
// /*                         FCM + NOTIFEE SERVICE                               */
// /* -------------------------------------------------------------------------- */

// class NotificationService {
//   /* ------------------------------------------------------------------------ */
//   /*                          REGISTER DEVICE (FCM)                           */
//   /* ------------------------------------------------------------------------ */
//   async registerForPushNotifications(): Promise<string | null> {
//     try {
//       // 1️⃣ iOS permission (Android auto-granted)
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (!enabled) {
//         console.log("❌ Notification permission denied");
//         return null;
//       }

//       // 2️⃣ Get REAL FCM token
//       const fcmToken = await messaging().getToken();
//       console.log("🔥 FCM TOKEN:", fcmToken);

//       // 3️⃣ Device name
//       const deviceName = await DeviceInfo.getDeviceName();

//       // 4️⃣ Send token to backend
//       await this.sendTokenToBackend(fcmToken, deviceName);

//       // 5️⃣ Listen for token refresh
//       messaging().onTokenRefresh(async newToken => {
//         console.log("🔄 FCM token refreshed:", newToken);
//         await this.sendTokenToBackend(newToken, deviceName);
//       });

//       // 6️⃣ Create Android channel
//       if (Platform.OS === "android") {
//         await notifee.createChannel({
//           id: "default",
//           name: "Default Channel",
//           importance: AndroidImportance.HIGH,
//         });
//       }

//       return fcmToken;
//     } catch (error) {
//       console.error("❌ Failed to register FCM:", error);
//       return null;
//     }
//   }

//   /* ------------------------------------------------------------------------ */
//   /*                          SEND TOKEN TO BACKEND                           */
//   /* ------------------------------------------------------------------------ */
//   private async sendTokenToBackend(token: string, deviceName: string) {
//     const authToken = await getToken();

//     await axios.post(
//       "https://docank.mahmoudalbatran.com/api/device-tokens",
//       {
//         token,
//         device_name: deviceName,
//         platform: Platform.OS,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );

//     console.log("✅ FCM token sent to backend");
//   }

//   /* ------------------------------------------------------------------------ */
//   /*                       FOREGROUND NOTIFICATIONS                            */
//   /* ------------------------------------------------------------------------ */
//   onReceive(callback: (message: FirebaseMessagingTypes.RemoteMessage) => void) {
//     // Show system notification + call JS callback
//     return messaging().onMessage(async message => {
//       // Display notification using Notifee
//       await notifee.displayNotification({
//         title: message.notification?.title ?? "New Notification",
//         body: message.notification?.body ?? "",
//         android: {
//           channelId: "default",
//           // Optional: Big picture for image
//           style: message.notification?.android?.imageUrl
//             ? {
//                 type: "BIGPICTURE",
//                 picture: message.notification.android.imageUrl,
//               }
//             : undefined,
//         },
//         ios: {
//           attachments: message.notification?.ios?.attachments ?? [],
//         },
//       });

//       // Call JS callback
//       callback(message);
//     });
//   }

//   /* ------------------------------------------------------------------------ */
//   /*                   NOTIFICATION TAP (BACKGROUND)                          */
//   /* ------------------------------------------------------------------------ */
//   onNotificationOpened(
//     callback: (message: FirebaseMessagingTypes.RemoteMessage) => void
//   ) {
//     return messaging().onNotificationOpenedApp(callback);
//   }

//   /* ------------------------------------------------------------------------ */
//   /*                       APP OPENED FROM KILLED                             */
//   /* ------------------------------------------------------------------------ */
//   async getInitialNotification() {
//     return messaging().getInitialNotification();
//   }
// }

// export const notificationService = new NotificationService();























//   onReceiveForeground() {
//   return messaging().onMessage(async remoteMessage => {
//     console.log("📩 FCM Foreground Message:", remoteMessage);

//     const { title, body } = remoteMessage.notification || {};

//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: title ?? "New notification",
//         body: body ?? "",
//         sound: "default",
//       },
//       trigger: null, // show immediately
//     });
//   });
// }


