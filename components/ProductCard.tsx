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















import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable, Image } from 'react-native'
import { useCartStore } from '@/store/cartStore'
import { router } from 'expo-router';
import Toast from 'react-native-toast-message'
import { useProductStore } from '@/store/useProductStore';

export default function ProductCard({ item }: any) {
  const setProduct = useProductStore((s) => s.setProduct)

  const handlePress = () => {
    setProduct(item)
    router.push(`/product/${item?.id}`)
  }


  const addItem = useCartStore(state => state.addItem);
 
  const addToCart = () => {
       if (item) {
         addItem({
          id: item?.id,
          name: item?.name,
          price: item.price,
          quantity: 1,
          image: item.image,
    
        });
       }
        Toast.show({
      type: 'success',
      text1: "success",
      text2: 'تمت الإضافة إلى السلة بنجاح',
    });
    console.log('Item added to cart');
      }

// if (!item) return null;

  return (
     <Pressable className=" m-1 bg-white rounded-3xl shadow-sm overflow-hidden px-3" onPress={handlePress}>
          <View className="relative">
             <Image
        source={{
          uri: `https://docank.mahmoudalbatran.com/storage/${item?.image}`,
        }}
        className="w-full h-52"
        resizeMode="cover"
      />
            {item?.isNew && (
              <View className="absolute top-3 left-3 bg-[#6FB7D6] px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-bold">جديد</Text>
              </View>
            )}
            {item?.hasDiscount && (
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
              {item?.name}
            </Text>
           {/* {item?.category || item?.location && 
           <Text
              className="text-xs text-neutral-400 mb-3"
              style={{ writingDirection: 'rtl' }}
            >
              {item?.category} · {item?.location}
            </Text>} */}
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-extrabold text-[#1F2937]">
                  {item?.price} ₪
                </Text>
                {item?.hasDiscount && (
                  <Text className="text-xs text-neutral-400 line-through">
                    {item?.oldPrice} ₪
                  </Text>
                )}
              </View>
              <Pressable className="bg-[#7CC7A4] px-3 py-2 rounded-full ml-3" onPress={() => addToCart()}>
                <Text className="text-white text-xs font-bold">أضف للسلة</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
  )
}


const styles = StyleSheet.create({})
