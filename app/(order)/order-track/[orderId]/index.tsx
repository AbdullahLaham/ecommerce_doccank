// import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
// import { useLocalSearchParams } from 'expo-router'
// import { useEffect, useState } from 'react'
// import SafeView from '@/components/SafeView'

// type OrderStatus =
//   | 'received'
//   | 'confirmed'
//   | 'processing'
//   | 'shipped'
//   | 'out_for_delivery'
//   | 'delivered'

// const STEPS: { key: OrderStatus; label: string }[] = [
//   { key: 'received', label: 'تم استلام الطلب' },
//   { key: 'confirmed', label: 'تم تأكيد الطلب' },
//   { key: 'processing', label: 'قيد التجهيز' },
//   { key: 'shipped', label: 'تم الشحن' },
//   { key: 'out_for_delivery', label: 'خرج للتوصيل' },
//   { key: 'delivered', label: 'تم التسليم' },
// ]

// export default function TrackOrderScreen() {
//   const { orderId } = useLocalSearchParams<{ orderId: string }>()
//   const [status, setStatus] = useState<OrderStatus>('processing')
//   const [loading, setLoading] = useState(false)

//   const currentIndex = STEPS.findIndex(s => s.key === status)

//   return (
//     <SafeView className="flex-1 bg-[#F8FAFC]">
//       <ScrollView
//         className="flex-1 px-6 pt-8"
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <Text
//           className="text-3xl font-extrabold text-[#1F2937] mb-1"
//           style={{ writingDirection: 'rtl' }}
//         >
//           تتبع الطلب
//         </Text>

//         <Text
//           className="text-neutral-500 mb-8"
//           style={{ writingDirection: 'rtl' }}
//         >
//           رقم الطلب #{orderId}
//         </Text>

//         {/* Timeline */}
//         <View className="bg-[#FFFFFF] rounded-[28px] px-6 py-8 shadow-sm">
//           {STEPS.map((step, index) => {
//             const completed = index < currentIndex
//             const active = index === currentIndex
//             const isLast = index === STEPS.length - 1

//             return (
//               <View key={step.key} className="flex-row">
//                 {/* Indicator */}
//                 <View className="items-center mr-4">
//                   <View
//                     className={`w-4 h-4 rounded-full ${
//                       completed
//                         ? 'bg-[#7CC7A4]'
//                         : active
//                         ? 'bg-[#F6A64D]'
//                         : 'bg-neutral-300'
//                     }`}
//                   />

//                   {!isLast && (
//                     <View
//                       className={`w-[2px] flex-1 mt-1 ${
//                         completed || active
//                           ? 'bg-[#7CC7A4]'
//                           : 'bg-neutral-300'
//                       }`}
//                     />
//                   )}
//                 </View>

//                 {/* Text */}
//                 <View className="pb-8 flex-1">
//                   <Text
//                     className={`text-base font-semibold ${
//                       completed
//                         ? 'text-[#1F2937]'
//                         : active
//                         ? 'text-[#1F2937]'
//                         : 'text-neutral-400'
//                     }`}
//                     style={{ writingDirection: 'rtl' }}
//                   >
//                     {step.label}
//                   </Text>

//                   {active && (
//                     <View className="mt-2 self-start bg-[#F6A64D]/15 px-3 py-1 rounded-full">
//                       <Text
//                         className="text-xs text-[#F6A64D] font-bold"
//                         style={{ writingDirection: 'rtl' }}
//                       >
//                         الحالة الحالية
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//               </View>
//             )
//           })}
//         </View>

//         {/* Footer */}
//         <Text
//           className="text-neutral-400 text-center mt-10 text-sm"
//           style={{ writingDirection: 'rtl' }}
//         >
//           يتم تحديث حالة الطلب تلقائياً
//         </Text>
//       </ScrollView>
//     </SafeView>
//   )
// }







import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SafeView from '@/components/SafeView'
import { getToken } from '@/lib/auth-storage'

type OrderStatus =
  | 'received'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'received', label: 'تم استلام الطلب' },
  { key: 'confirmed', label: 'تم تأكيد الطلب' },
  { key: 'processing', label: 'قيد التجهيز' },
  { key: 'shipped', label: 'تم الشحن' },
  { key: 'out_for_delivery', label: 'خرج للتوصيل' },
  { key: 'delivered', label: 'تم التسليم' },
]

const API_STATUS_TO_STEP: Record<string, OrderStatus> = {
  pending: 'processing',
  shipped: 'shipped',
  delivered: 'delivered',
}

const API_URL = 'https://docank.mahmoudalbatran.com/api/orders'

export default function TrackOrderScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>()
  const [status, setStatus] = useState<OrderStatus>('processing')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${API_URL}/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })

        const apiStatus = res.data.order.status
        const mappedStatus =
          API_STATUS_TO_STEP[apiStatus] ?? 'processing'

        setStatus(mappedStatus)
      } catch (error) {
        console.error('Error fetching order status:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderStatus()
  }, [orderId])

  const currentIndex = STEPS.findIndex(s => s.key === status)

  if (loading) {
    return (
      <SafeView className="flex-1 items-center justify-center bg-[#F8FAFC]">
        <ActivityIndicator size="large" color="#F6A64D" />
      </SafeView>
    )
  }

  return (
    <SafeView className="flex-1 bg-[#F8FAFC]">
      <ScrollView className="flex-1 px-6 pt-8">
        {/* Header */}
        <Text
          className="text-3xl font-extrabold text-[#1F2937] mb-1"
          style={{ writingDirection: 'rtl' }}
        >
          تتبع الطلب
        </Text>

        <Text
          className="text-neutral-500 mb-8"
          style={{ writingDirection: 'rtl' }}
        >
          رقم الطلب #{orderId}
        </Text>

        {/* Timeline */}
        <View className="bg-white rounded-[28px] px-6 py-8 shadow-sm">
          {STEPS.map((step, index) => {
            const completed = index < currentIndex
            const active = index === currentIndex
            const isLast = index === STEPS.length - 1

            return (
              <View key={step.key} className="flex-row">
                {/* Indicator */}
                <View className="items-center mr-4">
                  <View
                    className={`w-4 h-4 rounded-full ${
                      completed
                        ? 'bg-[#7CC7A4]'
                        : active
                        ? 'bg-[#F6A64D]'
                        : 'bg-neutral-300'
                    }`}
                  />

                  {!isLast && (
                    <View
                      className={`w-[2px] flex-1 mt-1 ${
                        completed || active
                          ? 'bg-[#7CC7A4]'
                          : 'bg-neutral-300'
                      }`}
                    />
                  )}
                </View>

                {/* Text */}
                <View className="pb-8 flex-1">
                  <Text
                    className={`text-base font-semibold ${
                      completed || active
                        ? 'text-[#1F2937]'
                        : 'text-neutral-400'
                    }`}
                    style={{ writingDirection: 'rtl' }}
                  >
                    {step.label}
                  </Text>

                  {active && (
                    <View className="mt-2 self-start bg-[#F6A64D]/15 px-3 py-1 rounded-full">
                      <Text
                        className="text-xs text-[#F6A64D] font-bold"
                        style={{ writingDirection: 'rtl' }}
                      >
                        الحالة الحالية
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )
          })}
        </View>

        {/* Footer */}
        <Text
          className="text-neutral-400 text-center mt-10 text-sm"
          style={{ writingDirection: 'rtl' }}
        >
          يتم تحديث حالة الطلب تلقائياً
        </Text>
      </ScrollView>
    </SafeView>
  )
}
