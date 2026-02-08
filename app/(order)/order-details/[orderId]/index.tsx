

import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'
import SafeView from '@/components/SafeView'
import { getToken } from '@/lib/auth-storage'

type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
}

type Order = {
  id: string
  status: 'pending' | 'shipped' | 'delivered'
  date: string
  address: string
  paymentMethod: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
}

const STATUS_LABELS: Record<Order['status'], string> = {
  pending: 'قيد المعالجة',
  shipped: 'تم الشحن',
  delivered: 'تم التوصيل',
}

const API_URL = 'https://docank.mahmoudalbatran.com/api/orders'
// const TOKEN = 'YOUR_BEARER_TOKEN_HERE'

export default function OrderDetailsPage() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>()
  const router = useRouter()

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${API_URL}/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })

        const apiOrder = res.data.order

        // حساب subtotal من العناصر
        const subtotal = apiOrder.order_items.reduce(
          (sum: number, item: any) =>
            sum + Number(item.unit_price) * item.quantity,
          0
        )

        setOrder({
          id: String(apiOrder.id),
          status: apiOrder.status,
          date: apiOrder.created_at.split('T')[0],
          address: `${apiOrder.adress.city} - ${apiOrder.adress.address}`,
          paymentMethod: 'الدفع عند الاستلام',
          items: apiOrder.order_items.map((item: any) => ({
            id: String(item.id),
            name: `منتج رقم ${item.product_id}`,
            quantity: item.quantity,
            price: Number(item.unit_price),
          })),
          subtotal,
          shipping: 0,
          total: Number(apiOrder.total_price),
        })
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading || !order) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#88c1c5" />
      </View>
    )
  }

  return (
    <SafeView className="flex-1 bg-gray-50 px-4 pt-4">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-xl font-bold">طلب رقم {order.id}</Text>
          <Text className="text-gray-500 mt-1">{order.date}</Text>
        </View>

        {/* Status */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="font-semibold mb-2">حالة الطلب</Text>
          <Text className="text-[#88c1c5] font-bold">
            {STATUS_LABELS[order.status]}
          </Text>
        </View>

        {/* Items */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="font-semibold mb-3">المنتجات</Text>
          {order.items.map(item => (
            <View key={item.id} className="flex-row justify-between mb-2">
              <Text className="text-gray-700">
                {item.name} × {item.quantity}
              </Text>
              <Text className="font-semibold">
                {item.price * item.quantity} ر.س
              </Text>
            </View>
          ))}
        </View>

        {/* Address */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="font-semibold mb-2">عنوان التوصيل</Text>
          <Text className="text-gray-600">{order.address}</Text>
        </View>

        {/* Payment */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="font-semibold mb-2">طريقة الدفع</Text>
          <Text className="text-gray-600">{order.paymentMethod}</Text>
        </View>

        {/* Summary */}
        <View className="bg-white rounded-2xl p-4 mb-6">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">المجموع</Text>
            <Text>{order.subtotal} ر.س</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">الشحن</Text>
            <Text>{order.shipping} ر.س</Text>
          </View>
          <View className="flex-row justify-between border-t pt-3">
            <Text className="font-bold">الإجمالي</Text>
            <Text className="font-bold">{order.total} ر.س</Text>
          </View>
        </View>

        {/* Action */}
        <Pressable
          onPress={() => router.push(`/(order)/order-track/${orderId}`)}
          className="bg-[#88c1c5] py-4 rounded-full mb-10"
        >
          <Text className="text-white text-center font-bold">
            تتبع الطلب
          </Text>
        </Pressable>
      </ScrollView>
    </SafeView>
  )
}
