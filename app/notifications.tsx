
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { api } from '@/lib/api'
import { getToken } from '@/lib/auth-storage'
import EmptyNotifications from '@/components/notifications/EmptyNotifications'

/* ================== TYPES ================== */

type Notification = {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  type: 'order' | 'promo' | 'system'
}



/* ================== HELPERS ================== */

const formatTime = (date: string) => {
  return 'منذ قليل' // تقدر تطورها لاحقًا
}

/* ================== ITEM ================== */

const NotificationItem = ({
  item,
  onPress,
}: {
  item: Notification
  onPress: () => void
}) => {
  const iconMap = {
    order: 'cube-outline',
    promo: 'pricetag-outline',
    system: 'settings-outline',
  }

  const iconBg =
    item.type === 'promo'
      ? '#F6A64D'
      : item.type === 'order'
      ? '#7CC7A4'
      : '#6FB7D6'

  return (
    <Pressable
      onPress={onPress}
      className={`mx-4 mb-3 rounded-3xl p-4 flex-row gap-4 ${
        item.read ? 'bg-white' : 'bg-[#7CC7A4]/10'
      }`}
      style={{
        shadowColor: item.read ? '#000' : '#7CC7A4',
        shadowOpacity: item.read ? 0.05 : 0.15,
        shadowRadius: 10,
        elevation: item.read ? 2 : 6,
      }}
    >
      {/* Icon */}
      <View
        className="w-11 h-11 rounded-2xl items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Ionicons
          name={iconMap[item.type]}
          size={22}
          color="#fff"
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text
            className={`text-sm ${
              item.read
                ? 'font-semibold text-[#1F2937]'
                : 'font-extrabold text-[#1F2937]'
            }`}
            style={{ writingDirection: 'rtl' }}
          >
            {item.title}
          </Text>

          {!item.read && (
            <View className="w-2 h-2 rounded-full bg-[#7CC7A4]" />
          )}
        </View>

        <Text
          className="text-xs text-neutral-500 mb-2"
          style={{ writingDirection: 'rtl' }}
        >
          {item.body}
        </Text>

        <Text
          className="text-[11px] text-neutral-400"
          style={{ writingDirection: 'rtl' }}
        >
          {item.time}
        </Text>
      </View>
    </Pressable>
  )
}

/* ================== PAGE ================== */

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      const token = await getToken();
      const res = await api.get('/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res?.data, 'eeeeeeeeeeeeeeeeeeeeeeeeeee')

      const formatted: Notification[] =
        res.data.notifications.data.map((n: any) => ({
          id: n.id,
          title: n.data.title,
          body: n.data.body,
          time: formatTime(n.created_at),
          read: !!n.read_at,
          type: 'order',
        }))

      setNotifications(formatted)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const markAllAsRead = async () => {
    try {

      const token = await getToken();

      await api.post('/notifications/read_at', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNotifications()
    markAllAsRead()
  }, [])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // return (
  //   <View className="flex-1 bg-[#F8FAFC] pt-6">
  //     {/* Header */}
  //     <Text
  //       className="text-3xl font-extrabold text-[#1F2937] mb-6 px-4"
  //       style={{ writingDirection: 'rtl' }}
  //     >
  //       الإشعارات
  //     </Text>

  //     {/* List */}
  //     <FlatList
  //       data={notifications}
  //       keyExtractor={item => item.id}
  //       showsVerticalScrollIndicator={false}
  //       contentContainerStyle={{ paddingBottom: 120 }}
  //       renderItem={({ item }) => (
  //         <NotificationItem
  //           item={item}
  //           onPress={() =>
  //             setNotifications(prev =>
  //               prev.map(n =>
  //                 n.id === item.id ? { ...n, read: true } : n
  //               )
  //             )
  //           }
  //         />
  //       )}
  //     />
  //   </View>
  // )

  return (
  <View className="flex-1 bg-[#F8FAFC] pt-6">
    {/* Header */}
    <Text
      className="text-3xl font-extrabold text-[#1F2937] mb-6 px-4"
      style={{ writingDirection: 'rtl' }}
    >
      الإشعارات
    </Text>

    {/* Empty State */}
    {notifications.length === 0 ? (
      <EmptyNotifications />
    ) : (
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={() =>
              setNotifications(prev =>
                prev.map(n =>
                  n.id === item.id ? { ...n, read: true } : n
                )
              )
            }
          />
        )}
      />
    )}
  </View>
)

}
