import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { getToken } from "@/lib/auth-storage";
import { checkAuth } from "@/lib/check-auth";

export default function AuthLayout() {
  const [checking, setChecking] = useState(true);
useEffect(() => {
    const verify = async () => {
      try {
        await checkAuth();
        router.replace("/(tabs)/home");
      } catch {
        // مش مسجّل → عادي
      } finally {
        setChecking(false);
      }
    };

    verify();
  }, []);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();

      if (token) {
        router.replace("/(tabs)/home"); // 🚫 امنع الدخول
      }

      setChecking(false);
    };

    checkAuth();
  }, []);

  if (checking) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={"#7CC7A4"} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
