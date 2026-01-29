// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native'
// import { useCartStore } from '@/store/cartStore'
// import { useState } from 'react'
// import SafeView from '@/components/SafeView'

// export default function OrderDetailsScreen() {
//   const items = useCartStore(state => state.items)
//   const subtotal = useCartStore(state => state.subtotal())

//   const [delivery, setDelivery] = useState<'standard' | 'express'>('standard')
//   const [payment, setPayment] = useState<'card' | 'cash'>('card')

//   const shippingCost = delivery === 'express' ? 20 : 10
//   const total = subtotal + shippingCost

//   return (
//     <SafeView className="flex-1 bg-neutral-50 dark:bg-neutral-900">
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         className="px-6 pt-6"
//       >

//         {/* ===== Header ===== */}
//         <View className="mb-8">
//           <Text
//             className="text-3xl font-extrabold text-neutral-900 dark:text-white"
//             style={{ writingDirection: 'rtl' }}
//           >
//             تفاصيل الطلب
//           </Text>
//           <Text
//             className="text-neutral-500 dark:text-neutral-400 mt-1"
//             style={{ writingDirection: 'rtl' }}
//           >
//             تأكد من بياناتك قبل إتمام الشراء
//           </Text>
//         </View>

//         {/* ===== Shipping Address ===== */}
//         <View className="bg-white dark:bg-neutral-800 rounded-3xl p-5 mb-6">
//           <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
//             عنوان الشحن
//           </Text>

//           <TouchableOpacity className="border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4">
//             <Text
//               className="text-neutral-900 dark:text-white font-medium"
//               style={{ writingDirection: 'rtl' }}
//             >
//               محمد أحمد
//             </Text>
//             <Text
//               className="text-neutral-500 dark:text-neutral-400 mt-1"
//               style={{ writingDirection: 'rtl' }}
//             >
//               الرياض، حي النرجس، شارع الملك سلمان
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* ===== Delivery Method ===== */}
//         <View className="bg-white dark:bg-neutral-800 rounded-3xl p-5 mb-6">
//           <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
//             طريقة التوصيل
//           </Text>

//           {[
//             { id: 'standard', label: 'توصيل عادي', price: '10 $' },
//             { id: 'express', label: 'توصيل سريع', price: '20 $' },
//           ].map(option => {
//             const active = delivery === option.id

//             return (
//               <TouchableOpacity
//                 key={option.id}
//                 onPress={() => setDelivery(option.id as any)}
//                 className={`flex-row justify-between items-center p-4 rounded-2xl mb-3 border
//                   ${
//                     active
//                       ? 'border-black dark:border-white bg-neutral-100 dark:bg-neutral-700'
//                       : 'border-neutral-200 dark:border-neutral-700'
//                   }`}
//               >
//                 <Text className="font-medium text-neutral-900 dark:text-white">
//                   {option.label}
//                 </Text>
//                 <Text className="font-bold text-neutral-900 dark:text-white">
//                   {option.price}
//                 </Text>
//               </TouchableOpacity>
//             )
//           })}
//         </View>

//         {/* ===== Payment Method ===== */}
//         <View className="bg-white dark:bg-neutral-800 rounded-3xl p-5 mb-6">
//           <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
//             طريقة الدفع
//           </Text>

//           {[
//             { id: 'card', label: 'بطاقة بنكية' },
//             { id: 'cash', label: 'الدفع عند الاستلام' },
//           ].map(option => {
//             const active = payment === option.id

//             return (
//               <TouchableOpacity
//                 key={option.id}
//                 onPress={() => setPayment(option.id as any)}
//                 className={`p-4 rounded-2xl mb-3 border
//                   ${
//                     active
//                       ? 'border-black dark:border-white bg-neutral-100 dark:bg-neutral-700'
//                       : 'border-neutral-200 dark:border-neutral-700'
//                   }`}
//               >
//                 <Text className="font-medium text-neutral-900 dark:text-white">
//                   {option.label}
//                 </Text>
//               </TouchableOpacity>
//             )
//           })}
//         </View>

//         {/* ===== Order Summary ===== */}
//         <View className="bg-white dark:bg-neutral-800 rounded-3xl p-5 mb-24">
//           <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
//             ملخص الطلب
//           </Text>

//           <Row label="المجموع الفرعي" value={`${subtotal.toFixed(2)} $`} />
//           <Row label="الشحن" value={`${shippingCost.toFixed(2)} $`} />

//           <View className="border-t border-neutral-200 dark:border-neutral-700 mt-4 pt-4">
//             <Row
//               label="الإجمالي"
//               value={`${total.toFixed(2)} $`}
//               bold
//             />
//           </View>
//         </View>
//       </ScrollView>

//       {/* ===== Place Order ===== */}
//       <View className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
//         <TouchableOpacity className="bg-black dark:bg-white rounded-2xl py-4">
//           <Text
//             className="text-center text-white dark:text-black text-lg font-extrabold"
//             style={{ writingDirection: 'rtl' }}
//           >
//             تأكيد الطلب
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeView>
//   )
// }

// /* ===== Reusable Row ===== */
// function Row({
//   label,
//   value,
//   bold,
// }: {
//   label: string
//   value: string
//   bold?: boolean
// }) {
//   return (
//     <View className="flex-row justify-between mb-2">
//       <Text className="text-neutral-500 dark:text-neutral-400">
//         {label}
//       </Text>
//       <Text
//         className={`${
//           bold ? 'text-lg font-extrabold' : 'font-medium'
//         } text-neutral-900 dark:text-white`}
//       >
//         {value}
//       </Text>
//     </View>
//   )
// }















const BRAND = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
  muted: "#9CA3AF",
  danger: "#EF4444",
};

import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'
import SafeView from '@/components/SafeView'
import { router } from 'expo-router'
import { api } from '@/lib/api'
import { getToken } from '@/lib/auth-storage'
import { useUserStore } from '@/store/user.store'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';

export default function OrderDetailsScreen() {
  const items = useCartStore(state => state.items)
  const subtotal = useCartStore(state => state.subtotal())
  const clearCart = useCartStore(state => state?.clearCart)

  const [delivery, setDelivery] = useState<'standard' | 'express'>('standard')
  const [payment, setPayment] = useState<'card' | 'cash'>('card');


  const [loading, setLoading] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [mainAddress, setMainAddress] = useState();
  

  const user = useUserStore((s) => s.user);
    const userId = user?.id;


  const shipping = delivery === 'express' ? 20 : 10
  const total = subtotal + shipping;


  const confirmOrder = async () => {  
    const token = await getToken();
    console.log({
        address_id: mainAddress,
        total_price: subtotal,
        carts: items?.map((item) => {
          return {
            unit_price: item?.price,
            quantity: item?.quantity,
            product_id: item?.id,
          }
        })
      }, 'uuuuuuuuu')

    try {
      setOrdering(true);
      const res = await axios.post("https://docank.mahmoudalbatran.com/api/orders", {
        address_id: mainAddress,
        total_price: subtotal,
        carts: items?.map((item) => {
          return {
            unit_price: item?.price,
            quantity: item?.quantity,
            product_id: item?.id,
          }
        })
      }, {
        headers : {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res?.data, 'ooooooooooooooooooooooooooooooooooooooooooooo');
      if (res?.data) {
        router.push('/(order)/success');
    clearCart();

      }

    } catch (error) {
      console.log(error);

    } finally {
      setOrdering(false)
    }

  }

    /* ================== LOAD ADDRESSES ================== */
    const loadAddresses = async () => {
      try {
        setLoading(true);
        const token = await getToken();
  
        const res = await api.get("/addresses", {
          params: { user_id: userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setAddresses(res.data.address?.data || []);
      } catch (e) {
        console.log("Load addresses error:", e);
      } finally {
        setLoading(false);
      }
    };
     useEffect(() => {
        loadAddresses();
      }, []);
  

  return (
    <SafeView className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-6 pt-6"
      >

        {/* ===== Header ===== */}
        <View className="mb-6">
          <Text
            className="text-3xl font-extrabold text-neutral-900 dark:text-white"
            style={{ writingDirection: 'rtl' }}
          >
            إتمام الطلب
          </Text>
          <Text
            className="text-neutral-500 dark:text-neutral-400 mt-1"
            style={{ writingDirection: 'rtl' }}
          >
            مراجعة سريعة قبل الدفع
          </Text>
        </View>

        {/* ===== Order Items (Compact) ===== */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
            المنتجات
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {items.map(item => (
              <View
                key={item.id}
                className="w-44 bg-white dark:bg-neutral-800 rounded-2xl mr-4 overflow-hidden"
              >
                <Image
                              source={{
                          uri: `https://docank.mahmoudalbatran.com/storage/${item.image}`,
                        }}
                              className="w-28 h-28"
                              resizeMode="cover"
                            />

                <View className="p-3">
                  <Text
                    numberOfLines={2}
                    className="text-sm font-semibold text-neutral-900 dark:text-white"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {item.name}
                  </Text>

                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-xs text-neutral-500">
                      × {item.quantity}
                    </Text>
                    <Text className="font-bold text-neutral-900 dark:text-white">
                      {(item.price * item.quantity).toFixed(2)} $
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ===== Shipping Address ===== */}
        <Card title="عنوان الشحن">
          {/* <TouchableOpacity className="border border-neutral-200 dark:border-neutral-700 rounded-2xl p-4">
            <Text
              className="font-medium text-neutral-900 dark:text-white"
              style={{ writingDirection: 'rtl' }}
            >
              محمد أحمد
            </Text>
            <Text
              className="text-neutral-500 dark:text-neutral-400 mt-1"
              style={{ writingDirection: 'rtl' }}
            >
              الرياض، حي النرجس، شارع الملك سلمان
            </Text>
          </TouchableOpacity> */}
          {addresses.map((a) => (
              <Pressable
                key={a.id}
                onPress={() => setMainAddress(a.id)}
                style={{
                  padding: 14,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: a.id == mainAddress
                    ? BRAND.primary
                    : "#E5E7EB",
                  backgroundColor: a.id == mainAddress
                    ? "#ECFDF5"
                    : "#fff",
                  marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>
                    <Ionicons
                    name={
                      a.name === "Home"
                        ? "home-outline"
                        : a.name === "Work"
                        ? "briefcase-outline"
                        : "location-outline"
                    }
                    size={22}
                    color={BRAND.primary}
                  />
                  </Text>

                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ fontWeight: "700" }}>{a.name}</Text>
                    <Text style={{ color: BRAND.muted, fontSize: 13 }}>
                      {a.city} - {a.address}
                    </Text>
                  </View>

                  {a.id == mainAddress && (
                    <Text><Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={BRAND.primary}
                    /></Text>
                  )}
                </View>
              </Pressable>
            ))}
        </Card>

        {/* ===== Delivery ===== */}
        {/* <Card title="التوصيل">
          <Option
            label="توصيل عادي"
            value="10 $"
            active={delivery === 'standard'}
            onPress={() => setDelivery('standard')}
          />
          <Option
            label="توصيل سريع"
            value="20 $"
            active={delivery === 'express'}
            onPress={() => setDelivery('express')}
          />
        </Card> */}

        {/* ===== Payment ===== */}
        <Card title="طريقة الدفع">
          {/* <Option
            label="بطاقة بنكية"
            active={payment === 'card'}
            onPress={() => setPayment('card')}
          /> */}
          <Option
            label="الدفع عند الاستلام"
            active={payment === 'cash'}
            onPress={() => setPayment('cash')}
          />
        </Card>

        {/* ===== Summary ===== */}
        <Card title="ملخص الطلب" last>
          <Row label="المجموع الفرعي" value={`${subtotal.toFixed(2)} $`} />
          <Row label="الشحن" value={`${shipping.toFixed(2)} $`} />
          <View className="border-t border-neutral-200 dark:border-neutral-700 pt-3 mt-3">
            <Row
              label="الإجمالي"
              value={`${total.toFixed(2)} $`}
              bold
            />
          </View>
        </Card>
      </ScrollView>

      {/* ===== CTA ===== */}
      <View className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-white ">
        <TouchableOpacity className="bg-[#6FB7D6] dark:bg-white rounded-2xl py-4 " onPress={() => confirmOrder()}>
          <Text
            className="text-center text-white dark:text-black text-lg font-extrabold"
            style={{ writingDirection: 'rtl' }}
          >
           {ordering ? "جار الطلب...." : " تأكيد الطلب"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  )
}

/* ===== Reusable Components ===== */

function Card({
  title,
  children,
  last,
}: {
  title: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <View className={`bg-white dark:bg-neutral-800 rounded-3xl p-5 mb-${last ? '20' : ''}`}>
      <Text className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
        {title}
      </Text>
      {children}
    </View>
  )
}

function Option({
  label,
  value,
  active,
  onPress,
}: {
  label: string
  value?: string
  active?: boolean
  onPress: () => void
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-between items-center p-4 rounded-2xl mb-3 border
        ${
          active
            ? 'border-black dark:border-white bg-neutral-100 dark:bg-neutral-700'
            : 'border-neutral-200 dark:border-neutral-700'
        }`}
    >
      <Text className="font-medium text-neutral-900 dark:text-white">
        {label}
      </Text>
      {value && (
        <Text className="font-bold text-neutral-900 dark:text-white">
          {value}
        </Text>
      )}
    </TouchableOpacity>
  )
}

function Row({
  label,
  value,
  bold,
}: {
  label: string
  value: string
  bold?: boolean
}) {
  return (
    <View className="flex-row justify-between mb-2">
      <Text className="text-neutral-500 dark:text-neutral-400">
        {label}
      </Text>
      <Text
        className={`${
          bold ? 'text-lg font-extrabold' : 'font-medium'
        } text-neutral-900 dark:text-white`}
      >
        {value}
      </Text>
    </View>
  )
}
