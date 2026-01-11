import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { router } from 'expo-router'

type Props = {
  item: {
    id: string
    title: string
    subtitle: string
    image: any
    bg: string
    badge?: string
  }
}

export default function CategoryCard({ item }: Props) {
  return (
    <Pressable
      onPress={() => router.push('/products')}
      className="mr-4 active:scale-95 relative py-1 "
      style={{ width: 120 }}
    >
      <View
        className="rounded-3xl overflow-hidden "
        style={{
          backgroundColor: item.bg,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 14,
          elevation: 6,
        }}
      >
        {/* Image area */}
        <View className="h-36  overflow-hidden">
          <Image
            source={item.image}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />

          {/* Dark overlay (pure View) */}
          <View className="absolute inset-0 bg-black/40" />

          {/* Diagonal separator */}
          <View
            className="absolute -bottom-10 right-0 w-[120%] h-20"
            style={{
              backgroundColor: item.bg,
              transform: [{ skewY: '-8deg' }],
            }}
          />
        </View>

        {/* Content */}
        <View className="px-4 pb-4 -mt-6 " >
          {item.badge && (
            <View className="self-start mb-2 bg-black/70 px-3 py-1 rounded-full absolute top-2 right-2 ">
              <Text className="text-white text-[10px] font-bold">
                {item.badge}
              </Text>
            </View>
          )}

          <Text
            className="text-lg font-extrabold text-[#1F2937] mb-1"
            style={{ writingDirection: 'rtl' }}
          >
            {item.title}
          </Text>

          <Text
            className="text-xs text-neutral-600"
            numberOfLines={2}
            style={{ writingDirection: 'rtl' }}
          >
            {item.subtitle}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
