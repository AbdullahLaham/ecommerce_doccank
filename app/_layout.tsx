// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
// import { router, Stack, useRootNavigationState } from 'expo-router'
// import { StatusBar } from 'expo-status-bar'
// import 'react-native-reanimated'
// import '@/global.css'
// import NetInfo from '@react-native-community/netinfo'

// import { useColorScheme } from '@/hooks/use-color-scheme'
// import { I18nManager } from 'react-native'
// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import Toast from 'react-native-toast-message'
// import { CustomToast } from '@/components/CustomToast';
// import { useEffect } from 'react'
// import { notificationService } from '@/services/notification.service'


// // eas build -p android --profile apk

// // ✅ RTL should be configured ONCE
// I18nManager.allowRTL(true)
// I18nManager.forceRTL(true)


// export const toastConfig = {
//   success: (props: any) => <CustomToast {...props} type="success" />,
//   error: (props: any) => <CustomToast {...props} type="error" />,
//   warning: (props: any) => <CustomToast {...props} type="warning" />,
//   info: (props: any) => <CustomToast {...props} type="info" />,
// };

// export const unstable_settings = {
//   anchor: '(tabs)',
// }

// type NotificationData = {
//   type: "ORDER" | "MESSAGE" | "PROMOTION" | "SYSTEM";
//   orderId?: string | number;
//   chatId?: string | number;
// };
// function handleNotificationNavigation(data: NotificationData) {
//   switch (data.type) {
//     case "ORDER":
//       if (data.orderId) {
//         router.push(`/orders/${String(data.orderId)}`);
//       }
//       break;

//     case "MESSAGE":
//       if (data.chatId) {
//         router.push(`/chat/${String(data.chatId)}`);
//       }
//       break;

//     case "PROMOTION":
//       router.push("/offers");
//       break;

//     default:
//       console.warn("Unknown notification type:", data);
//   }
// }


// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   const navState = useRootNavigationState();


// //   function handleNotificationNavigation(data: any) {
// //   switch (data.type) {
// //     case "ORDER":
// //       router.push(`/orders/${data.orderId}`);
// //       break;

// //     // case "MESSAGE":
// //     //   router.push(`/chat/${data.chatId}`);
// //     //   break;

// //     // case "PROMOTION":
// //     //   router.push("/offers");
// //     //   break;
// //   }
// // }



// // function handleNotificationNavigation(data: NotificationData) {
// //   switch (data.type) {
// //     case "ORDER":
// //       if (data.orderId) {
// //         router.push(`/orders/${String(data.orderId)}`);
// //       }
// //       break;

// //     case "MESSAGE":
// //       if (data.chatId) {
// //         router.push(`/chat/${String(data.chatId)}`);
// //       }
// //       break;

// //     case "PROMOTION":
// //       router.push("/offers");
// //       break;

// //     default:
// //       console.warn("Unknown notification type:", data);
// //   }
// // }



//   // useEffect(() => {
//   //   notificationService.registerForPushNotifications()
//   //     .then(token => {
//   //       console.log("Push Token:", token);
//   //       // 🔥 أرسله للـ backend وخزنه للمستخدم
//   //     });

//   //   const sub1 = notificationService.onReceive(notification => {
//   //     console.log("Notification received:", notification);
//   //   });

//   //   const sub2 = notificationService.onResponse(response => {
//   //     const data = response.notification.request.content.data;
//   //     if (!data || !data.type) return;
//   //     handleNotificationNavigation(data);
//   //   });

//   //   return () => {
//   //     sub1.remove();
//   //     sub2.remove();
//   //   };
//   // }, []);




//   //   useEffect(() => {
//   //   const unsubscribe = NetInfo.addEventListener(state => {
//   //     if (!state.isConnected || !state.isInternetReachable) {
//   //       router.replace('/no-internet')
//   //     }
//   //   })

//   //   return () => unsubscribe()
//   // }, [])


//   useEffect(() => {
//     if (!navState?.key) return;

//     // 1️⃣ Register for notifications
//     notificationService
//       .registerForPushNotifications()
//       .then(token => {
//         if (token) {
//           console.log("Expo Push Token:", token);
//           // 👉 ابعته للـ backend
//         }
//       })
//       .catch(console.error);

//     // 2️⃣ Foreground notifications
//     const receiveSub = notificationService.onReceive(notification => {
//       console.log(
//         "Notification received:",
//         notification.request.content.data
//       );
//     });

//     // 3️⃣ Background / tapped notifications
//     const responseSub = notificationService.onResponse(response => {
//       const data = response.notification.request.content.data as NotificationData;
//       if (data?.type) {
//         handleNotificationNavigation(data);
//       }
//     });

//     // 4️⃣ Cold start (app closed)
//     (async () => {
//       const lastResponse =
//         await notificationService.getInitialNotification();

//       if (lastResponse) {
//         const data =
//           lastResponse.notification.request.content.data as NotificationData;
//         if (data?.type) {
//           handleNotificationNavigation(data);
//         }
//       }
//     })();

//     return () => {
//       receiveSub.remove();
//       responseSub.remove();
//     };
//   }, [navState?.key]);

//   // 5️⃣ Internet connection handling
//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       if (!state.isConnected || !state.isInternetReachable) {
//         router.replace("/no-internet");
//       }
//     });

//     return () => unsubscribe();
//   }, []);


//   useEffect(() => {
//   const init = async () => {
//     // await checkAuth()
//     // await preloadAssets()
//     // await checkInternet()
//     router.replace('/(tabs)/home')
//   }

//   init()
// }, [])



//   return (
//     <SafeAreaProvider>
//       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//         <Stack screenOptions={{ headerShown: false }} />
//           {/* <Stack.Screen name="(tabs)" />
//           <Stack.Screen name="(checkout)" />
//           <Stack.Screen name="(order)" />
//           <Stack.Screen name="(auth)" />
//           <Stack.Screen
//             name="modal"
//             options={{ presentation: 'modal', title: 'Modal' }}
//           />
//         </Stack> */}

//         <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
//       </ThemeProvider>

//       {/* 👇 THIS is all toast needs */}
//       <Toast config={toastConfig} />
//     </SafeAreaProvider>
//   )
// }












// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { Stack, router, useRootNavigationState } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";
// import "@/global.css";

// import { useEffect, useRef, useState } from "react";
// import NetInfo from "@react-native-community/netinfo";
// import { I18nManager } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import Toast from "react-native-toast-message";
// import { CustomToast } from "@/components/CustomToast";
// import { useColorScheme } from "@/hooks/use-color-scheme";
// import SplashOverlay from '@/components/SplashOverlay'


// import { notificationService } from "@/services/notification.service";
// import { useSplashStore } from "@/store/splash.store";

// /* -------------------------------------------------------------------------- */
// /*                               GLOBAL CONFIG                                */
// /* -------------------------------------------------------------------------- */

// // ✅ RTL configured ONCE (outside component)
// I18nManager.allowRTL(true);
// I18nManager.forceRTL(true);

// // ✅ Toast config
// export const toastConfig = {
//   success: (props: any) => <CustomToast {...props} type="success" />,
//   error: (props: any) => <CustomToast {...props} type="error" />,
//   warning: (props: any) => <CustomToast {...props} type="warning" />,
//   info: (props: any) => <CustomToast {...props} type="info" />,
// };

// // ✅ Expo Router setting
// export const unstable_settings = {
//   anchor: "(tabs)",
// };

// /* -------------------------------------------------------------------------- */
// /*                              TYPES & HELPERS                               */
// /* -------------------------------------------------------------------------- */

// type NotificationData = {
//   type: "ORDER" | "MESSAGE" | "PROMOTION" | "SYSTEM";
//   orderId?: string | number;
//   chatId?: string | number;
// };

// // 🔥 Centralized navigation logic
// function handleNotificationNavigation(data: NotificationData) {
//   switch (data.type) {
//     case "ORDER":
//       if (data.orderId) {
//         router.push(`/orders/${String(data.orderId)}`);
//       }
//       break;

//     case "MESSAGE":
//       if (data.chatId) {
//         router.push(`/chat/${String(data.chatId)}`);
//       }
//       break;

//     case "PROMOTION":
//       router.push("/offers");
//       break;

//     default:
//       console.warn("Unknown notification type:", data);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                                 ROOT LAYOUT                                */
// /* -------------------------------------------------------------------------- */

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const navState = useRootNavigationState();

//     const { isSplashShown, markSplashShown } = useSplashStore()
//   const [showSplash, setShowSplash] = useState(false);



//   /* ---------------------------------------------------------------------- */
//   /*                            SPLASH LOGIC (ONCE)                          */
//   /* ---------------------------------------------------------------------- */
//   useEffect(() => {
//     if (!isSplashShown) {
//       setShowSplash(true)
//     }
//   }, [isSplashShown])

//   const handleSplashFinish = () => {
//     markSplashShown()
//     setShowSplash(false)
//   }



//   // 🧠 Prevent double navigation (important for iOS)
//   const handledInitialNotification = useRef(false);

//   /* ---------------------------------------------------------------------- */
//   /*                         PUSH NOTIFICATIONS SETUP                        */
//   /* ---------------------------------------------------------------------- */
//   useEffect(() => {
//     // ⛔ Wait until router is fully ready
//     if (!navState?.key) return;

//     // 1️⃣ Register for push notifications
//     notificationService.registerForPushNotifications()
//       // .then(token => {
//       //   if (token) {
//       //     console.log("Expo Push Token:", token);
//       //     // 👉 send token to backend
//       //   }
//       // })
//       // .catch(console.error);

//     // 2️⃣ Foreground notifications (app open)
//     const receiveSub = notificationService.onReceive(notification => {
//       const data = notification.request.content.data as NotificationData;

//       // Example: show in-app toast
//       if (data?.type === "MESSAGE") {
//         Toast.show({
//           type: "info",
//           text1: "New message received",
//         });
//       }
//     });

//     // 3️⃣ Notification tapped (background / foreground)
//     const responseSub = notificationService.onResponse(response => {
//       const data =
//         response.notification.request.content.data as NotificationData;

//       if (data?.type) {
//         handleNotificationNavigation(data);
//       }
//     });

//     // 4️⃣ Cold start (app was completely closed)
//     (async () => {
//       if (handledInitialNotification.current) return;

//       const lastResponse =
//         await notificationService.getInitialNotification();

//       if (lastResponse) {
//         handledInitialNotification.current = true;

//         const data =
//           lastResponse.notification.request.content.data as NotificationData;

//         if (data?.type) {
//           handleNotificationNavigation(data);
//         }
//       }
//     })();

//     return () => {
//       receiveSub.remove();
//       responseSub.remove();
//     };
//   }, [navState?.key]);

//   /* ---------------------------------------------------------------------- */
//   /*                         INTERNET CONNECTION HANDLER                     */
//   /* ---------------------------------------------------------------------- */
//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       if (!state.isConnected || !state.isInternetReachable) {
//         router.replace("/no-internet");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   /* ---------------------------------------------------------------------- */
//   /*                        INITIAL APP REDIRECT (SAFE)                      */
//   /* ---------------------------------------------------------------------- */
//   useEffect(() => {
//     const init = async () => {
//       const lastResponse =
//         await notificationService.getInitialNotification();

//       // ✅ Only redirect if app NOT opened from notification
//       if (!lastResponse) {
//         router.replace("/(tabs)/home");
//       }
//     };

//     init();
//   }, []);

//   /* ---------------------------------------------------------------------- */
//   /*                                   UI                                   */
//   /* ---------------------------------------------------------------------- */
//   return (
//     <SafeAreaProvider>
//       <ThemeProvider
//         value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//       >
//         <Stack screenOptions={{ headerShown: false }} />
//         <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
//       </ThemeProvider>

//       {/* Splash Overlay (GLOBAL, ONCE) */}
//       {showSplash && <SplashOverlay onFinish={handleSplashFinish} />}

//       {/* Global Toast */}
//       <Toast config={toastConfig} />
//     </SafeAreaProvider>
//   );
// }
























import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, router, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "@/global.css";

import { useEffect, useRef, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { I18nManager } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Toast from "react-native-toast-message";
import { CustomToast } from "@/components/CustomToast";
import { useColorScheme } from "@/hooks/use-color-scheme";
import SplashOverlay from "@/components/SplashOverlay";

import { notificationService } from "@/services/notification.service";
import { useSplashStore } from "@/store/splash.store";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

/* -------------------------------------------------------------------------- */
/*                               GLOBAL CONFIG                                */
/* -------------------------------------------------------------------------- */

// ✅ RTL configured ONCE
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// ✅ Toast config
export const toastConfig = {
  success: (props: any) => <CustomToast {...props} type="success" />,
  error: (props: any) => <CustomToast {...props} type="error" />,
  warning: (props: any) => <CustomToast {...props} type="warning" />,
  info: (props: any) => <CustomToast {...props} type="info" />,
};

// ✅ Expo Router setting
export const unstable_settings = {
  anchor: "(tabs)",
};

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type NotificationData = {
  type: "ORDER" | "MESSAGE" | "PROMOTION" | "SYSTEM";
  orderId?: string | number;
  chatId?: string | number;
};

/* -------------------------------------------------------------------------- */
/*                         CENTRALIZED NAVIGATION                              */
/* -------------------------------------------------------------------------- */

function handleNotificationNavigation(data: NotificationData) {
  switch (data.type) {
    case "ORDER":
      if (data.orderId) {
        router.push(`/orders/${String(data.orderId)}`);
      }
      break;

    case "MESSAGE":
      if (data.chatId) {
        router.push(`/chat/${String(data.chatId)}`);
      }
      break;

    case "PROMOTION":
      router.push("/offers");
      break;

    default:
      console.warn("Unknown notification type:", data);
  }
}

/* -------------------------------------------------------------------------- */
/*                                 ROOT LAYOUT                                */
/* -------------------------------------------------------------------------- */

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navState = useRootNavigationState();

  const { isSplashShown, markSplashShown } = useSplashStore();
  const [showSplash, setShowSplash] = useState(false);

  // 🧠 Prevent double handling (especially iOS)
  const handledInitialNotification = useRef(false);

  /* ---------------------------------------------------------------------- */
  /*                               SPLASH                                    */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    if (!isSplashShown) {
      setShowSplash(true);
    }
  }, [isSplashShown]);

  const handleSplashFinish = () => {
    markSplashShown();
    setShowSplash(false);
  };

  /* ---------------------------------------------------------------------- */
  /*                         PUSH NOTIFICATIONS (FCM)                        */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    if (!navState?.key) return;

    // 1️⃣ Register FCM token
    notificationService.registerForPushNotifications();

    // 2️⃣ Foreground notifications
    const unsubscribeOnMessage = notificationService.onReceive(
      (message: FirebaseMessagingTypes.RemoteMessage) => {
        const data = message.data as NotificationData;

        if (data?.type === "MESSAGE") {
          Toast.show({
            type: "info",
            text1: "رسالة جديدة",
          });
        }
      }
    );

    // 3️⃣ Background / quit → notification tap
    notificationService.onResponse(
      (message: FirebaseMessagingTypes.RemoteMessage) => {
        if (handledInitialNotification.current) return;
        handledInitialNotification.current = true;

        const data = message.data as NotificationData;
        if (data?.type) {
          handleNotificationNavigation(data);
        }
      }
    );

    return () => {
      unsubscribeOnMessage();
    };
  }, [navState?.key]);

  /* ---------------------------------------------------------------------- */
  /*                         INTERNET CONNECTION                              */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected || !state.isInternetReachable) {
        router.replace("/no-internet");
      }
    });

    return () => unsubscribe();
  }, []);

  /* ---------------------------------------------------------------------- */
  /*                        INITIAL SAFE REDIRECT                             */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    const init = async () => {
      // ✅ If app NOT opened from notification
      if (!handledInitialNotification.current) {
        router.replace("/(tabs)/home");
      }
    };

    init();
  }, []);

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */
  return (
    <SafeAreaProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>

      {/* Splash Overlay */}
      {showSplash && <SplashOverlay onFinish={handleSplashFinish} />}

      {/* Global Toast */}
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}
