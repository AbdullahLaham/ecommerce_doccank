// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Pressable, Image } from 'react-native'
// import { useCartStore } from '@/store/cartStore'
// import { router } from 'expo-router';
// import Toast from 'react-native-toast-message'

// export default function ProductCard({ id, image, title, price, oldPrice, isNew= true, hasDiscount=true, category, location}: any) {
//   const addItem = useCartStore(state => state.addItem);
//   const addToCart = () => {
//     addItem({
//       id,
//       name: title,
//       price: price,
//       quantity: 1,
//       image: image,

//     });
//     Toast.show({
//   type: 'success',
//   text1: "success",
//   text2: 'تمت الإضافة إلى السلة بنجاح',
// });
// console.log('Item added to cart');
//   }



//   return (
//     // <Pressable className="w-44 bg-white rounded-3xl overflow-hidden shadow-md active:scale-95" onPress={() => router.push('/product/5')}>
//     //   <Image source={{ uri: image }} className="w-full h-40" resizeMode="cover" />

//     //   <View className="p-4">
//     //     <Text className="font-semibold text-sm mb-2" numberOfLines={2}>
//     //       {title}
//     //     </Text>

//     //     <View className="flex-row justify-between items-center">
//     //       <Pressable className="bg-black px-4 py-2 rounded-full bg-brand-primary" onPress={addToCart}>
//     //         <Text className="text-white text-xs font-bold">أضف</Text>
//     //       </Pressable>

//     //       <View>
//     //         <Text className="text-lg font-extrabold">{price} ر.س</Text>
//     //         {oldPrice ? (
//     //           <Text className="text-xs text-gray-400 line-through">{oldPrice} ر.س</Text>
//     //         ) : null}
//     //       </View>
//     //     </View>
//     //   </View>
//     // </Pressable>


//      <View className="flex-1 m-1 bg-white rounded-3xl shadow-sm overflow-hidden">
//           <View className="relative">
//             <Image
//               source={{ uri: image }}
//               className="w-full h-44"
//               resizeMode="cover"
//             />
//             {isNew && (
//               <View className="absolute top-3 left-3 bg-[#6FB7D6] px-3 py-1 rounded-full">
//                 <Text className="text-white text-xs font-bold">جديد</Text>
//               </View>
//             )}
//             {hasDiscount && (
//               <View className="absolute top-3 right-3 bg-[#F6A64D] px-3 py-1 rounded-full">
//                 <Text className="text-white text-xs font-bold">خصم</Text>
//               </View>
//             )}
//           </View>
    
//           <View className="p-4">
//             <Text
//               className="text-base font-semibold text-[#1F2937] mb-1"
//               numberOfLines={1}
//               style={{ writingDirection: 'rtl' }}
//             >
//               {title}
//             </Text>
//            {category || location && 
//            <Text
//               className="text-xs text-neutral-400 mb-3"
//               style={{ writingDirection: 'rtl' }}
//             >
//               {category} · {location}
//             </Text>}
//             <View className="flex-row items-center justify-between">
//               <View>
//                 <Text className="text-lg font-extrabold text-[#1F2937]">
//                   {price} ر.س
//                 </Text>
//                 {hasDiscount && (
//                   <Text className="text-xs text-neutral-400 line-through">
//                     {oldPrice} ر.س
//                   </Text>
//                 )}
//               </View>
//               <Pressable className="bg-[#7CC7A4] px-3 py-2 rounded-full" onPress={() => addToCart()}>
//                 <Text className="text-white text-xs font-bold">أضف للسلة</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//   )
// }


// const styles = StyleSheet.create({})















// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Pressable, Image } from 'react-native'
// import { useCartStore } from '@/store/cartStore'
// import { router } from 'expo-router';
// import Toast from 'react-native-toast-message'
// import { useProductStore } from '@/store/useProductStore';

// export default function ProductCard({ item }: any) {
//   const setProduct = useProductStore((s) => s.setProduct)

//   const handlePress = () => {
//     setProduct(item)
//     router.push(`/product/${item?.id}`)
//   }


//   const addItem = useCartStore(state => state.addItem);
 
//   const addToCart = () => {
//        if (item) {
//          addItem({
//           id: item?.id,
//           name: item?.name,
//           price: item.price,
//           quantity: 1,
//           image: item.image,
    
//         });
//        }
//         Toast.show({
//       type: 'success',
//       text1: "success",
//       text2: 'تمت الإضافة إلى السلة بنجاح',
//     });
//     console.log('Item added to cart');
//       }

// // if (!item) return null;

//   return (
//      <Pressable className=" m-1 bg-white rounded-3xl shadow-sm overflow-hidden px-3" onPress={handlePress}>
//           <View className="relative">
//              <Image
//         source={{
//           uri: `https://docank.mahmoudalbatran.com/storage/${item?.image}`,
//         }}
//         className="w-full h-52"
//         resizeMode="cover"
//       />
//             {item?.isNew && (
//               <View className="absolute top-3 left-3 bg-[#6FB7D6] px-3 py-1 rounded-full">
//                 <Text className="text-white text-xs font-bold">جديد</Text>
//               </View>
//             )}
//             {item?.hasDiscount && (
//               <View className="absolute top-3 right-3 bg-[#F6A64D] px-3 py-1 rounded-full">
//                 <Text className="text-white text-xs font-bold">خصم</Text>
//               </View>
//             )}
//           </View>
    
//           <View className="p-4">
//             <Text
//               className="text-base font-semibold text-[#1F2937] mb-1"
//               numberOfLines={1}
//               style={{ writingDirection: 'rtl' }}
//             >
//               {item?.name}
//             </Text>
//            {/* {item?.category || item?.location && 
//            <Text
//               className="text-xs text-neutral-400 mb-3"
//               style={{ writingDirection: 'rtl' }}
//             >
//               {item?.category} · {item?.location}
//             </Text>} */}
//             <View className="flex-row items-center justify-between">
//               <View>
//                 <Text className="text-lg font-extrabold text-[#1F2937]">
//                   {item?.price} ₪
//                 </Text>
//                 {item?.hasDiscount && (
//                   <Text className="text-xs text-neutral-400 line-through">
//                     {item?.oldPrice} ₪
//                   </Text>
//                 )}
//               </View>
//               <Pressable className="bg-[#7CC7A4] px-3 py-2 rounded-full ml-3" onPress={() => addToCart()}>
//                 <Text className="text-white text-xs font-bold">أضف للسلة</Text>
//               </Pressable>
//             </View>
//           </View>
//         </Pressable>
//   )
// }


// const styles = StyleSheet.create({})












// import React from 'react'
// import { View, Text, Pressable, Image } from 'react-native'
// import { router } from 'expo-router'
// import Toast from 'react-native-toast-message'
// import { Ionicons } from '@expo/vector-icons'

// import { useCartStore } from '@/store/cartStore'
// import { useFavoritesStore } from '@/store/favoritesStore'
// import { useProductStore } from '@/store/useProductStore'

// export default function ProductCard({ item }: any) {
//   const setProduct = useProductStore(s => s.setProduct)
//   const addItem = useCartStore(state => state.addItem)

//   const toggleFavorite = useFavoritesStore(s => s.toggleFavorite)
//   const isFavorite = useFavoritesStore(s => s.isFavorite(item?.id))

//   const handlePress = () => {
//     setProduct(item)
//     router.push(`/product/${item?.id}`)
//   }

//   const addToCart = () => {
//     addItem({
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       quantity: 1,
//       image: item.image,
//     })

//     Toast.show({
//       type: 'success',
//       text1: 'تم بنجاح',
//       text2: 'تمت الإضافة إلى السلة',
//     })
//   }

//   const handleFavorite = () => {
//     const added = toggleFavorite({
//       // id: item.id,
//       // name: item.name,
//       // price: item.price,
//       // image: item.image,
//       ...item,
//     })

//     Toast.show({
//       type: 'success',
//       text1: added ? 'أضيف للمفضلة ❤️' : 'أزيل من المفضلة',
//     })
//   }

//   return (
//     <Pressable
//       className="m-1 bg-white rounded-3xl shadow-sm overflow-hidden px-3"
//       onPress={handlePress}
//     >
//       {/* IMAGE */}
//       <View className="relative">
//         <Image
//           source={{
//             uri: `https://docank.mahmoudalbatran.com/storage/${item.image}`,
//           }}
//           className="w-full h-52"
//           resizeMode="cover"
//         />

//         {/* ❤️ FAVORITE BUTTON */}
//         <Pressable
//           onPress={handleFavorite}
//           className="absolute top-3 right-3 bg-white/90 p-2 rounded-full"
//           hitSlop={10}
//         >
//           <Ionicons
//             name={isFavorite ? 'heart' : 'heart-outline'}
//             size={22}
//             color={isFavorite ? '#ef4444' : '#374151'}
//           />
//         </Pressable>

//         {item?.isNew && (
//           <View className="absolute top-3 left-3 bg-[#6FB7D6] px-3 py-1 rounded-full">
//             <Text className="text-white text-xs font-bold">جديد</Text>
//           </View>
//         )}
//       </View>

//       {/* CONTENT */}
//       <View className="p-4">
//         <Text
//           className="text-base font-semibold text-[#1F2937] mb-1"
//           numberOfLines={1}
//           style={{ writingDirection: 'rtl' }}
//         >
//           {item.name}
//         </Text>

//         <View className="flex-row items-center justify-between">
//           <View>
//             <Text className="text-lg font-extrabold text-[#1F2937]">
//               {item.price} ₪
//             </Text>
//             {item?.hasDiscount && (
//               <Text className="text-xs text-neutral-400 line-through">
//                 {item.oldPrice} ₪
//               </Text>
//             )}
//           </View>

//           <Pressable
//             className="bg-[#7CC7A4] px-3 py-2 rounded-full "
//             onPress={addToCart}
//           >
//             <Text className="text-white text-xs font-bold">أضف للسلة</Text>
//           </Pressable>
//         </View>
//       </View>
//     </Pressable>
//   )
// }








// import React from 'react'
// import { View, Text, Pressable, Image, Dimensions } from 'react-native'
// import { router } from 'expo-router'
// import Toast from 'react-native-toast-message'
// import { Ionicons } from '@expo/vector-icons'

// import { useCartStore } from '@/store/cartStore'
// import { useFavoritesStore } from '@/store/favoritesStore'
// import { useProductStore } from '@/store/useProductStore'

// interface Product {
//   id: string
//   name: string
//   price: number
//   oldPrice?: number
//   image: string
//   isNew?: boolean
//   hasDiscount?: boolean
// }

// const CARD_WIDTH = Dimensions.get('window').width / 2 - 20 // Efficient width for 2 cards per row

// export default function ProductCard({ item }: { item: Product }) {
//   const setProduct = useProductStore(s => s.setProduct)
//   const addItem = useCartStore(state => state.addItem)
//   const toggleFavorite = useFavoritesStore(s => s.toggleFavorite)
//   const isFavorite = useFavoritesStore(s => s.isFavorite(item?.id))

//   const handlePress = () => {
//     setProduct(item)
//     router.push(`/product/${item?.id}`)
//   }

//   const addToCart = () => {
//     addItem({
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       quantity: 1,
//       image: item.image,
//     })

//     Toast.show({
//       type: 'success',
//       text1: 'تم بنجاح',
//       text2: 'تمت الإضافة إلى السلة',
//     })
//   }

//   const handleFavorite = (e: any) => {
//     e.stopPropagation()
//     const added = toggleFavorite({ ...item })
//     Toast.show({
//       type: 'success',
//       text1: added ? 'أضيف للمفضلة ❤️' : 'أزيل من المفضلة',
//     })
//   }

//   return (
//     <Pressable
//       onPress={handlePress}
//       className="bg-white rounded-3xl overflow-hidden shadow-lg m-2"
//       style={{ width: CARD_WIDTH }}
//       android_ripple={{ color: '#E5F5EE' }}
//     >
//       {/* IMAGE */}
//       <View className="relative">
//         <Image
//           source={{
//             uri: `https://docank.mahmoudalbatran.com/storage/${item.image}`,
//           }}
//           className="w-full h-48 rounded-t-3xl"
//           resizeMode="cover"
//         />

//         {/* FAVORITE BUTTON */}
//         <Pressable
//           onPress={handleFavorite}
//           className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow"
//           hitSlop={10}
//         >
//           <Ionicons
//             name={isFavorite ? 'heart' : 'heart-outline'}
//             size={22}
//             color={isFavorite ? '#ef4444' : '#374151'}
//           />
//         </Pressable>

//         {/* NEW BADGE */}
//         {item?.isNew && (
//           <View className="absolute top-3 left-3 bg-[#6FB7D6] px-3 py-1 rounded-full shadow">
//             <Text className="text-white text-xs font-bold">جديد</Text>
//           </View>
//         )}
//       </View>

//       {/* CONTENT */}
//       <View className="p-4">
//         {/* PRODUCT NAME */}
//         <Text
//           className="text-base font-semibold text-[#1F2937] mb-2"
//           numberOfLines={2}
//           style={{ writingDirection: 'rtl' }}
//         >
//           {item.name}
//         </Text>

//         {/* PRICE */}
//         <View className="mb-3">
//           <Text className="text-lg font-extrabold text-[#1F2937]">
//             {item.price} ₪{' '}
//             {item?.hasDiscount && (
//               <Text className="text-xs text-neutral-400 line-through">
//                 {item.oldPrice} ₪
//               </Text>
//             )}
//           </Text>
//         </View>

//         {/* ADD TO CART BUTTON */}
//         <Pressable
//           onPress={addToCart}
//           className="bg-[#7CC7A4] py-2 rounded-full shadow-md items-center"
//         >
//           <Text className="text-white font-bold text-sm">أضف للسلة</Text>
//         </Pressable>
//       </View>
//     </Pressable>
//   )
// }






import React from 'react'
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import { useCartStore } from '@/store/cartStore'
import { useFavoritesStore } from '@/store/favoritesStore'
import { useProductStore } from '@/store/useProductStore'

interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  image: string
  isNew?: boolean
  hasDiscount?: boolean
}

const CARD_WIDTH = Dimensions.get('window').width / 2 - 20

export default function ProductCard({ item }: { item: Product }) {
  const setProduct = useProductStore(s => s.setProduct)
  const addItem = useCartStore(state => state.addItem)
  const toggleFavorite = useFavoritesStore(s => s.toggleFavorite)
  const isFavorite = useFavoritesStore(s => s.isFavorite(item?.id))

  const handlePress = () => {
    setProduct(item)
    router.push(`/product/${item?.id}`)
  }

  const addToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })
    Toast.show({
      type: 'success',
      text1: 'تم بنجاح',
      text2: 'تمت الإضافة إلى السلة',
    })
  }

  const handleFavorite = (e: any) => {
    e.stopPropagation()
    const added = toggleFavorite({ ...item })
    Toast.show({
      type: 'success',
      text1: added ? 'أضيف للمفضلة ❤️' : 'أزيل من المفضلة',
    })
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: CARD_WIDTH,
        borderRadius: 20,
        margin: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
      }}
    >
      {/* IMAGE */}
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: `https://docank.mahmoudalbatran.com/storage/${item.image}` }}
          style={{
            width: '100%',
            height: 180,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          resizeMode="cover"
        />

        {/* FAVORITE */}
        <Pressable
          onPress={handleFavorite}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: 8,
            borderRadius: 50,
          }}
          hitSlop={10}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? '#ef4444' : '#374151'}
          />
        </Pressable>

        {/* NEW BADGE */}
        {item.isNew ? (
          <LinearGradient
            colors={['#6FB7D6', '#7CC7A4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
              جديد
            </Text>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={['#ccd66fff', '#7CC7A4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
              مستعمل
            </Text>
          </LinearGradient>

        )}

        {/* ADD TO CART SMALL BUTTON */}
        <TouchableOpacity
          onPress={addToCart}
          style={{
            position: 'absolute',
            bottom: -70,
            right: 10,
            backgroundColor: '#7CC7A4',
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 10,
            shadowColor: '#7CC7A4',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
            أضف للسلة
          </Text>
        </TouchableOpacity>

        {/* DISCOUNT BADGE */}
        {item.hasDiscount && item.oldPrice && (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              backgroundColor: '#F6A64D',
              paddingVertical: 2,
              paddingHorizontal: 6,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>
              خصم
            </Text>
          </View>
        )}
      </View>

      {/* CONTENT */}
      <View style={{ padding: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: 6,
            writingDirection: 'rtl',
          }}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        {/* PRICE */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2937' }}>
            {item.price} ₪
          </Text>
          {item.hasDiscount && item.oldPrice && (
            <Text
              style={{
                fontSize: 12,
                color: '#9CA3AF',
                textDecorationLine: 'line-through',
                marginLeft: 8,
              }}
            >
              {item.oldPrice} ₪
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  )
}
