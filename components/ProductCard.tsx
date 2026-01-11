import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable, Image } from 'react-native'
import { useCartStore } from '@/store/cartStore'
import { router } from 'expo-router';
import Toast from 'react-native-toast-message'

export default function ProductCard({ id, image, title, price, oldPrice, isNew= true, hasDiscount=true, category, location}: any) {
  const addItem = useCartStore(state => state.addItem);
  const addToCart = () => {
    addItem({
      id,
      name: title,
      price: price,
      quantity: 1,
      image: image,

    });
    Toast.show({
  type: 'success',
  text1: "success",
  text2: 'تمت الإضافة إلى السلة بنجاح',
});
console.log('Item added to cart');
  }



  return (
    // <Pressable className="w-44 bg-white rounded-3xl overflow-hidden shadow-md active:scale-95" onPress={() => router.push('/product/5')}>
    //   <Image source={{ uri: image }} className="w-full h-40" resizeMode="cover" />

    //   <View className="p-4">
    //     <Text className="font-semibold text-sm mb-2" numberOfLines={2}>
    //       {title}
    //     </Text>

    //     <View className="flex-row justify-between items-center">
    //       <Pressable className="bg-black px-4 py-2 rounded-full bg-brand-primary" onPress={addToCart}>
    //         <Text className="text-white text-xs font-bold">أضف</Text>
    //       </Pressable>

    //       <View>
    //         <Text className="text-lg font-extrabold">{price} ر.س</Text>
    //         {oldPrice ? (
    //           <Text className="text-xs text-gray-400 line-through">{oldPrice} ر.س</Text>
    //         ) : null}
    //       </View>
    //     </View>
    //   </View>
    // </Pressable>


     <View className="flex-1 m-2 bg-white rounded-3xl shadow-sm overflow-hidden">
          <View className="relative">
            <Image
              source={{ uri: image }}
              className="w-full h-44"
              resizeMode="cover"
            />
            {isNew && (
              <View className="absolute top-3 left-3 bg-[#6FB7D6] px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-bold">جديد</Text>
              </View>
            )}
            {hasDiscount && (
              <View className="absolute top-3 right-3 bg-[#F6A64D] px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-bold">خصم</Text>
              </View>
            )}
          </View>
    
          <View className="p-4">
            <Text
              className="text-base font-semibold text-[#1F2937] mb-1"
              numberOfLines={1}
              style={{ writingDirection: 'rtl' }}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-neutral-400 mb-3"
              style={{ writingDirection: 'rtl' }}
            >
              {category} · {location}
            </Text>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-extrabold text-[#1F2937]">
                  {price} ر.س
                </Text>
                {hasDiscount && (
                  <Text className="text-xs text-neutral-400 line-through">
                    {oldPrice} ر.س
                  </Text>
                )}
              </View>
              <Pressable className="bg-[#7CC7A4] px-4 py-2 rounded-full" onPress={() => addToCart()}>
                <Text className="text-white text-xs font-bold">أضف للسلة</Text>
              </Pressable>
            </View>
          </View>
        </View>
  )
}


const styles = StyleSheet.create({})

// import React from 'react'
// import { VisNewiew, Text, Image, Pressable } from 'react-native'
// import { router } from 'expo-router'
// import { Ionicons } from '@expo/vector-icons'
// import Toast from 'react-native-toast-message'
// import { useCartStore } from '@/store/cartStore'

// type Props = {
//   id: string
//   image: string
//   title: string
//   price: number
//   oldPrice?: number
//   isNew?: boolean
//   hasDiscount?: boolean
//   category?: string
//   location?: string
// }

// export default function ProductCard({
//   id,
//   image,
//   title,
//   price,
//   oldPrice,
//   isNew,
//   hasDiscount,
//   category,
//   location,
// }: Props) {
//   const addItem = useCartStore(state => state.addItem)

//   const addToCart = () => {
//     addItem({
//       id,
//       name: title,
//       price,
//       quantity: 1,
//       image,
//     })

//     Toast.show({
//       type: 'success',
//       text1: 'تمت الإضافة',
//       text2: 'تمت إضافة المنتج إلى السلة',
//     })
//   }

//   return (
//     <Pressable
//       onPress={() => router.push(`/product/${id}`)}
//       className="flex-1  bg-white rounded-[28px] overflow-hidden shadow-sm active:scale-[0.97]"
//     >
//       {/* Image */}
//       <View className="relative">
//         <Image
//           source={{ uri: image }}
//           className="w-full h-48"
//           resizeMode="cover"
//         />

//         {/* Gradient overlay illusion */}
//         <View className="absolute inset-0 bg-black/5" />

//         {/* Badges */}
//         {isNew && (
//           <View className="absolute top-3 left-3 bg-[#6FB7D6] px-3 py-1 rounded-full">
//             <Text className="text-white text-[11px] font-bold">جديد</Text>
//           </View>
//         )}

//         {hasDiscount && (
//           <View className="absolute top-3 right-3 bg-[#F6A64D] px-3 py-1 rounded-full">
//             <Text className="text-white text-[11px] font-bold">خصم</Text>
//           </View>
//         )}
//       </View>

//       {/* Content */}
//       <View className="p-4 pb-5">
//         {/* Title */}
//         <Text
//           numberOfLines={2}
//           className="text-[14px] font-semibold text-[#1F2937] mb-1 leading-5"
//           style={{ writingDirection: 'rtl' }}
//         >
//           {title}
//         </Text>

//         {/* Meta */}
//         {(category || location) && (
//           <View className="flex-row mb-3">
//             <Text
//               className="text-[11px] text-neutral-400"
//               style={{ writingDirection: 'rtl' }}
//             >
//               {category}
//             </Text>
//             {category && location && (
//               <Text className="text-[11px] text-neutral-400 mx-1">·</Text>
//             )}
//             <Text
//               className="text-[11px] text-neutral-400"
//               style={{ writingDirection: 'rtl' }}
//             >
//               {location}
//             </Text>
//           </View>
//         )}

//         {/* Price + Action */}
//         <View className="flex-row items-center justify-between">
//           <View>
//             <Text className="text-lg font-extrabold text-[#1F2937]">
//               {price} ر.س
//             </Text>

//             {oldPrice ? (
//               <Text className="text-[11px] text-neutral-400 line-through">
//                 {oldPrice} ر.س
//               </Text>
//             ) : null}
//           </View>

//           {/* Add Button */}
//           <Pressable
//             onPress={addToCart}
//             className="bg-[#7CC7A4] px-3 py-2 rounded-full flex-row items-center gap-1 active:scale-95 ml-2"
//           >
//             {/* <Ionicons name="add" size={16} color="#fff" /> */}
//             <Text className="text-white text-[12px] font-bold">
//               أضف
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//     </Pressable>
//   )
// }
