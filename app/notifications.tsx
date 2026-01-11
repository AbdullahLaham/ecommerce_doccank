import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Pressable,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type Notification = {
  id: string
  title: string
  body: string
  time: string
  read: boolean
  type?: 'order' | 'promo' | 'system'
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'تم تأكيد طلبك',
    body: 'طلبك رقم #2456 تم تأكيده بنجاح',
    time: 'منذ 5 دقائق',
    read: false,
    type: 'order',
  },
  {
    id: '2',
    title: 'خصم جديد 🎉',
    body: 'استمتع بخصم 20٪ على الإلكترونيات',
    time: 'منذ ساعة',
    read: false,
    type: 'promo',
  },
  {
    id: '3',
    title: 'تم شحن الطلب',
    body: 'طلبك في طريقه إليك الآن',
    time: 'أمس',
    read: true,
    type: 'order',
  },
  {
    id: '4',
    title: 'تحديث النظام',
    body: 'تم تحسين تجربة التطبيق',
    time: 'منذ يومين',
    read: true,
    type: 'system',
  },
]

/* ---------------- Notification Item ---------------- */

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
      className={`mx-4 mb-3 rounded-3xl p-4 flex-row items-start gap-4 ${
        item.read
          ? 'bg-white'
          : 'bg-[#7CC7A4]/10'
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
        <Ionicons name={iconMap[item.type ?? 'system'] as any} size={22} color="#fff" />
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text
            className={`text-sm ${
              item.read ? 'font-semibold text-[#1F2937]' : 'font-extrabold text-[#1F2937]'
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

/* ---------------- Page ---------------- */

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS)

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    )
  }

  return (
    <View className="flex-1 bg-[#F8FAFC] pt-6">
      {/* Header */}
      <Text
        className="text-3xl font-extrabold text-[#1F2937] mb-6 px-4"
        style={{ writingDirection: 'rtl' }}
      >
        الإشعارات
      </Text>

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={() => markAsRead(item.id)}
          />
        )}
      />
    </View>
  )
}
