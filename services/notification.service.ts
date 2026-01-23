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
