// import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { router } from 'expo-router'

// const CategoriesSlider = () => {
//     return (
//         <View className="mt-8">
//             <Text className="text-xl font-extrabold px-4 mb-4">الأقسام</Text>
//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                 <View className="flex-row gap-4 px-4">
//                     {[
//                         { name: 'إلكترونيات', icon: '📱' },
//                         { name: 'أزياء', icon: '👕' },
//                         { name: 'عطور', icon: '🧴' },
//                         { name: 'منزل', icon: '🏠' },
//                         { name: 'رياضة', icon: '🏀' },
//                         { name: 'سيارات', icon: '🚗' },
//                     ].map((cat) => (
//                         <Pressable
//                             key={cat?.name}
//                             onPress={() => router.push('/products')}
//                             className="w-24 mb-4 bg-white rounded-2xl py-6 items-center shadow-sm active:scale-95"
//                         >
//                             <Text className="font-bold text-sm">{cat?.name}</Text>
//                         </Pressable>
//                     ))}
//                 </View>
//             </ScrollView>
//         </View>
//     )
// }

// export default CategoriesSlider

// const styles = StyleSheet.create({})


import React from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList
} from 'react-native'
import { router } from 'expo-router'
import elec from '@/assets/images/elec.jpg'
import cloth from '@/assets/images/cloth.jpg'
import home from '@/assets/images/home.jpg'
import mobiles from '@/assets/images/mobiles.jpg'
import comps from '@/assets/images/comps.jpg'
import shoes from '@/assets/images/shoes.jpg'
import watch from '@/assets/images/watch.jpg'
import sport from '@/assets/images/sport.jpg'
import toys from '@/assets/images/toys.jpg'
import barfan from '@/assets/images/barfan.jpg'
import mekiaj from '@/assets/images/mekiaj.jpg'
import access from '@/assets/images/access.jpg'
import books from '@/assets/images/books.jpg'
import gifts from '@/assets/images/gifts.jpg'
import CategoryCard from '../CategoryCard'
export const CATEGORIES = [
  {
    id: '1',
    title: 'الإلكترونيات',
    subtitle: 'أحدث الأجهزة والتقنيات',
    image: elec,
    bg: '#EAF7F1',
  },
  {
    id: '2',
    title: 'الملابس',
    subtitle: 'أزياء رجالية ونسائية',
    image: cloth,
    bg: '#FFF4E8',
    badge: 'الأكثر طلباً',
  },
  {
    id: '3',
    title: 'المنزل',
    subtitle: 'كل ما يحتاجه بيتك',
    image: home,
    bg: '#F3F6FF',
  },
  {
    id: '4',
    title: 'الجوالات',
    subtitle: 'هواتف وإكسسوارات',
    image: mobiles,
    bg: '#F0FDF9',
  },
  {
    id: '5',
    title: 'الكمبيوتر',
    subtitle: 'لابتوبات وملحقات',
    image: comps,
    bg: '#EEF2FF',
  },
  {
    id: '6',
    title: 'الأحذية',
    subtitle: 'رياضية وكاجوال',
    image: shoes,
    bg: '#FFF1F2',
    badge: 'عروض',
  },
  {
    id: '7',
    title: 'الساعات',
    subtitle: 'ساعات ذكية وكلاسيك',
    image: watch,
    bg: '#F8FAFC',
  },
  {
    id: '8',
    title: 'الرياضة',
    subtitle: 'مستلزمات رياضية',
    image: sport,
    bg: '#ECFEFF',
  },
  {
    id: '9',
    title: 'الألعاب',
    subtitle: 'ألعاب للأطفال',
    image: toys,
    bg: '#FEFCE8',
  },
  {
    id: '10',
    title: 'العطور',
    subtitle: 'عطور أصلية ومميزة',
    image: barfan,
    bg: '#FDF2F8',
    badge: 'جديد',
  },
  {
    id: '11',
    title: 'المكياج',
    subtitle: 'منتجات تجميل مختارة',
    image: mekiaj,
    bg: '#FFF7ED',
  },
  {
    id: '12',
    title: 'الإكسسوارات',
    subtitle: 'لمسات أناقة',
    image: access,
    bg: '#F1F5F9',
  },
  {
    id: '13',
    title: 'الكتب',
    subtitle: 'ثقافة ومعرفة',
    image: books,
    bg: '#ECFDF5',
  },
  {
    id: '14',
    title: 'الهدايا',
    subtitle: 'اختر هديتك المثالية',
    image: gifts,
    bg: '#FDF4FF',
    badge: 'مميز',
  },
]



export default function CategoriesSlider() {
  return (
    <View className="mt-3">
      <Text
        className="text-2xl font-extrabold mb-2 px-4 text-[#1F2937]"
        style={{ writingDirection: 'rtl' }}
      >
        تصنيفات المنتجات
      </Text>

      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => <CategoryCard item={item} />}
      />
    </View>
  )
}
