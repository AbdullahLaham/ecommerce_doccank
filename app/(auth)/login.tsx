
import OTPModal from "@/components/OTPModal";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, Image, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function SignupScreen() {

    const [otp, setOtp] = useState(['', '', '', '', ''])
    const inputsRef = useRef<TextInput[]>([]);


    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [otpModal, setOtpModal] = useState(false)
    const [timer, setTimer] = useState(60);


    const submitLogin = async () => {
        setError(null)

        if (!email || !password)
            return setError('جميع الحقول مطلوبة')

        if (!isValidEmail(email))
            return setError('البريد الإلكتروني غير صالح')

        try {
            setLoading(true)

            const res = await axios.post(`https://docank.mahmoudalbatran.com/api/login`, {
                email,
                password,
            })

            const data = res.data;

            console.log(data, 'ttttttttttttttttttttt')

            if (!data) throw new Error(data.message || 'فشل تسجيل الدخول')

            // ✅ OTP sent
            setOtpModal(true)

        } catch (err: any) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (!otpModal || timer === 0) return
        const interval = setInterval(() => setTimer(t => t - 1), 1000)
        return () => clearInterval(interval)
    }, [otpModal, timer])



    /* ---------------- VERIFY OTP ---------------- */



    return (
        <KeyboardAwareScrollView
    enableOnAndroid
    extraScrollHeight={30}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ flexGrow: 1 }}
  >
        <View className="flex-1 bg-brand-light justify-center px-6">

            {/* Gradient-like background feel */}
            <View className="absolute inset-0 bg-brand-secondary/10" />

            {/* Card */}
            <View className="bg-gray-50 rounded-[36px] px-7 py-10 shadow-2xl border border-gray-100">

                {/* Header */}
                <View className="mb-10 items-center">
                    <View className="w-14 h-14 rounded-2xl bg-brand-primary/15 items-center justify-center mb-4">
                        <Image source={require("@/assets/images/micon.jpeg")} style={{ width: 120, height: 60, transform: [{ scale: 1.5 }], }} />
                    </View>

                    <Text className="text-3xl mt-3 font-extrabold text-gray-600">
                        تسجيل الدخول
                    </Text>

                    <Text className="text-center text-gray-500 font-medium text-base mt-2">
                        أهلاً بعودتك، سجل دخولك لمتابعة رحلتك معنا
                    </Text>
                </View>

                {/* Inputs */}
                <View className="gap-5">
                    <View>
                        <Text className="text-sm text-gray-600 mb-2 font-medium">
                            البريد الإلكتروني
                        </Text>
                        <TextInput
                            placeholder="example@email.com"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            className="border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base bg-gray-50 focus:border-brand-primary"
                        />
                    </View>

                    <KeyboardAvoidingView>
                        <View>
                        <Text className="text-sm text-gray-600 mb-2 font-medium">
                            كلمة المرور
                        </Text>
                        <TextInput
                            placeholder="••••••••"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                             value={password}
  onChangeText={setPassword}
  
                            className="border border-gray-200 rounded-2xl px-5 py-4 text-brand-dark text-base bg-gray-50 focus:border-brand-primary"
                        />
                    </View>
                    </KeyboardAvoidingView>
                </View>

                {/* Button */}
                <Pressable
                disabled={loading}
  onPress={submitLogin}
                    className="mt-10 bg-brand-primary py-4 rounded-2xl active:scale-[0.97] shadow-lg shadow-brand-primary/30"
                    // onPress={() => router.push("/(tabs)/home")}
                >
                    {loading ? <ActivityIndicator /> : <Text className="text-white text-center font-bold text-lg">
                        تسجيل الدخول
                    </Text>}
                </Pressable>

                {error && (
  <Text className="text-red-500 text-center mt-4">
    {error}
  </Text>
)}

                {/* Footer */}
                <Text className="text-center text-gray-500 mt-8 text-base">
                    ليس لديك حساب؟{" "}
                    <Text
                        className="text-brand-accent font-extrabold"
                        onPress={() => router.push("/(auth)/sign-up")}
                    >
                        إنشاء حساب
                    </Text>
                </Text>
            </View>
            <OTPModal inputsRef={inputsRef} otpModal={otpModal} setOtpModal={setOtpModal} email={email} password={password} />
        </View>
         </KeyboardAwareScrollView>
    );
}
