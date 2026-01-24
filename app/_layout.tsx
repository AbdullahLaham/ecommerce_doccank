import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import '@/global.css'

import { useColorScheme } from '@/hooks/use-color-scheme'
import { I18nManager } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { CustomToast } from '@/components/CustomToast';
import { useEffect } from 'react'
import { notificationService } from '@/services/notification.service'


// eas build -p android --profile apk

// ✅ RTL should be configured ONCE
I18nManager.allowRTL(true)
I18nManager.forceRTL(true)


export const toastConfig = {
  success: (props: any) => <CustomToast {...props} type="success" />,
  error: (props: any) => <CustomToast {...props} type="error" />,
  warning: (props: any) => <CustomToast {...props} type="warning" />,
  info: (props: any) => <CustomToast {...props} type="info" />,
};

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  function handleNotificationNavigation(data: any) {
  switch (data.type) {
    case "ORDER":
      router.push(`/orders/${data.orderId}`);
      break;

    case "MESSAGE":
      router.push(`/chat/${data.chatId}`);
      break;

    case "PROMOTION":
      router.push("/offers");
      break;
  }
}



  useEffect(() => {
    notificationService.registerForPushNotifications()
      .then(token => {
        console.log("Push Token:", token);
        // 🔥 أرسله للـ backend وخزنه للمستخدم
      });

    const sub1 = notificationService.onReceive(notification => {
      console.log("Notification received:", notification);
    });

    const sub2 = notificationService.onResponse(response => {
      const data = response.notification.request.content.data;
      handleNotificationNavigation(data);
    });

    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
          {/* <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(checkout)" />
          <Stack.Screen name="(order)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', title: 'Modal' }}
          />
        </Stack> */}

        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>

      {/* 👇 THIS is all toast needs */}
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  )
}
