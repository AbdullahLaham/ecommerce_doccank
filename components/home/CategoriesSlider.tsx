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


import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions
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
import axios from 'axios'
import { getToken } from '@/lib/auth-storage'
import { useCategoriesStore } from '@/store/categories.store'
import CategorySliderSkeleton from '../CategorySliderSkeleton'
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

// const CARD_BACKGROUNDS = [
//   '#EAF7F1',
//   '#FFF4E8',
//   '#F3F6FF',
//   '#F0FDF9',
//   '#EEF2FF',
//   '#FFF1F2',
// ]
// import { Dimensions } from 'react-native'

// const SCREEN_WIDTH = Dimensions.get('window').width
// const CARD_GAP = 12
// const CARD_WIDTH = (SCREEN_WIDTH - 16 * 2 - CARD_GAP * 3) / 4 



// export default function CategoriesSlider() {
//   const [categories, setCategories] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//   const token = await getToken(); // ضع التوكن هنا

//   const res = await axios.get(
//     'https://docank.mahmoudalbatran.com/api/categories',
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   setCategories(res.data?.categories?.data)


//   console.log(res.data?.categories?.data[res.data?.categories?.data?.length - 1]);
// };


//     // 12|1COoob8rLUV9szNV0PXMTZvAMnSlHm8drOX7XGDGb7354da9
//     fetchData()
//   }, [])
//   return (
//     <View className="mt-3">
//       <Text
//         className="text-2xl font-extrabold mb-2 px-4 text-[#1F2937]"
//         style={{ writingDirection: 'rtl' }}
//       >
//         تصنيفات المنتجات
//       </Text>

//       {/* <FlatList
//         data={categories}
//         keyExtractor={item => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16 }}
//         renderItem={({ item, index }) => <CategoryCard item={item}  bgColor={CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]}
//        />}
//       /> */}

//       <FlatList
//   data={categories}
//   keyExtractor={item => item.id}
//   numColumns={4}
//   scrollEnabled={false} // shows exactly 2 rows
//   columnWrapperStyle={{ gap: CARD_GAP }}
//   contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
//   renderItem={({ item, index }) => (
//     <CategoryCard
//       item={item}
//       bgColor={CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]}
//       width={CARD_WIDTH}
//     />
//   )}
// />

//     </View>
//   )
// }










const CARD_BACKGROUNDS = [
  '#EAF7F1',
  '#FFF4E8',
  '#F3F6FF',
  '#F0FDF9',
  '#EEF2FF',
  '#FFF1F2',
]

const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_GAP = 12
const CARD_VISIBLE = 2.5
const CARD_WIDTH = (SCREEN_WIDTH - CARD_GAP * (CARD_VISIBLE + 1)) / CARD_VISIBLE

const SKELETON_DATA = Array.from({ length: 6 }) // number of skeleton cards


export default function CategoriesSlider() {
  // const [categories, setCategories] = useState<any[]>([])


  const { fetchCategories, categories, loading } = useCategoriesStore()

  useEffect(() => {
    fetchCategories()
  }, [])



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = await getToken()
  //     const res = await axios.get(
  //       'https://docank.mahmoudalbatran.com/api/categories',
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     setCategories(res.data?.categories?.data || [])
  //   }

  //   fetchData()
  // }, [])

  return (
    <View className="mt-3">
      <Text
        className="text-2xl font-extrabold mb-2 px-4 text-[#1F2937]"
        style={{ writingDirection: 'rtl' }}
      >
        تصنيفات المنتجات
      </Text>

      {/* <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={4} // 4 cards per row
        scrollEnabled={false} // fits exactly 2 rows
        columnWrapperStyle={{ gap: CARD_GAP, paddingVertical: 5 }}
        
        contentContainerStyle={{ paddingHorizontal: 12, gap: 12,   paddingBottom: 17, // top & bottom padding
 }}
        renderItem={({ item, index }) => (
          <CategoryCard
            item={item}
            width={CARD_WIDTH}
            bgColor={CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]}
          />
        )}
      /> */}

      {!loading ? <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: CARD_GAP, paddingVertical: 10, }}
        ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
        renderItem={({ item, index }) => (
          <CategoryCard
            item={item}
            width={CARD_WIDTH}
            bgColor={CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]}
          />
        )}
      /> : (
        <FlatList
  data={SKELETON_DATA}
  keyExtractor={(_, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: CARD_GAP }}
  renderItem={() => <CategorySliderSkeleton width={CARD_WIDTH} />}
/>
      )}
    </View>
  )
}
