


// import { View, Text, Image, ScrollView, TouchableOpacity, I18nManager, SafeAreaView } from "react-native";

// // تفعيل RTL (يفضل مرة واحدة عند بداية التطبيق)
// I18nManager.allowRTL(true);
// I18nManager.forceRTL(true);

// const cartItems = [
//   {
//     id: 1,
//     name: "حقيبة جلدية فاخرة",
//     price: 129.99,
//     image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: "سماعات احترافية",
//     price: 199.99,
//     image: "https://images.unsplash.com/photo-1518441902113-f3bca6d1f4b7",
//     quantity: 2,
//   },
// ];

// export default function CartScreen() {
//   return (
//     <SafeAreaView className="flex-1 bg-neutral-50 dark:bg-neutral-900 py-12 pb-20 ">
//       {/* Header */}
//       <View className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
//         <Text className="text-2xl font-extrabold text-neutral-900 dark:text-white text-right">
//           سلة التسوق
//         </Text>
//         <Text className="text-neutral-500 dark:text-neutral-400 mt-1 text-right">
//           راجع المنتجات قبل إتمام الشراء
//         </Text>
//       </View>

//       {/* Items */}
//       <ScrollView
//         className="flex-1 px-6 pt-6"
//         showsVerticalScrollIndicator={false}
//       >
//         {cartItems.map((item) => (
//           <View
//             key={item.id}
//             className="flex-row-reverse bg-white dark:bg-neutral-800 rounded-2xl mb-5 shadow-sm overflow-hidden"
//           >
//             {/* Image */}
//             <Image
//               source={{ uri: item.image }}
//               className="w-28 h-28"
//               resizeMode="cover"
//             />

//             {/* Info */}
//             <View className="flex-1 p-4 justify-between">
//               <View>
//                 <Text
//                   numberOfLines={2}
//                   className="text-base font-semibold text-neutral-900 dark:text-white text-right"
//                 >
//                   {item.name}
//                 </Text>

//                 <Text className="text-lg font-bold text-neutral-900 dark:text-white mt-1 text-right">
//                   {item.price.toFixed(2)} $
//                 </Text>
//               </View>

//               {/* Quantity */}
//               <View className="flex-row-reverse items-center justify-between mt-3">
//                 <View className="flex-row items-center bg-neutral-100 dark:bg-neutral-700 rounded-full px-4 py-1">
//                   <TouchableOpacity>
//                     <Text className="text-lg font-bold">+</Text>
//                   </TouchableOpacity>

//                   <Text className="mx-4 font-semibold text-neutral-900 dark:text-white">
//                     {item.quantity}
//                   </Text>

//                   <TouchableOpacity>
//                     <Text className="text-lg font-bold">−</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <TouchableOpacity>
//                   <Text className="text-red-500 font-medium">حذف</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}

//         {/* Summary */}
//         <View className="bg-white dark:bg-neutral-800 rounded-2xl p-5 mb-32 shadow-sm">
//           <Text className="text-lg font-extrabold text-neutral-900 dark:text-white mb-4 text-right">
//             ملخص الطلب
//           </Text>

//           <View className="flex-row-reverse justify-between mb-2">
//             <Text className="text-neutral-500 dark:text-neutral-400">
//               المجموع الفرعي
//             </Text>
//             <Text className="font-medium text-neutral-900 dark:text-white">
//               529.97 $
//             </Text>
//           </View>

//           <View className="flex-row-reverse justify-between mb-2">
//             <Text className="text-neutral-500 dark:text-neutral-400">
//               الشحن
//             </Text>
//             <Text className="font-medium text-neutral-900 dark:text-white">
//               12.00 $
//             </Text>
//           </View>

//           <View className="flex-row-reverse justify-between border-t border-neutral-200 dark:border-neutral-700 pt-3 mt-3">
//             <Text className="text-base font-bold text-neutral-900 dark:text-white">
//               الإجمالي
//             </Text>
//             <Text className="text-xl font-extrabold text-neutral-900 dark:text-white">
//               541.97 $
//             </Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Checkout */}
//       <View className="px-6 py-12 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
//         <TouchableOpacity className="bg-black dark:bg-white rounded-2xl py-4">
//           <Text className="text-center text-white dark:text-black text-lg font-extrabold">
//             إتمام الشراء
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }



import { useCartStore } from "@/store/cartStore";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import SafeView from "@/components/SafeView";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CartCard from "@/components/CartCard";

export default function CartScreen() {

  const {
    items: cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    subtotal,
  } = useCartStore();

  const shipping = cartItems.length > 0 ? 12 : 0
  const total = subtotal() + shipping


  return (
    <SafeView className="flex-1 bg-brand-light dark:bg-brand-dark">
      {/* Header */}
      <View className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <Text
          className="text-2xl font-extrabold text-brand-dark dark:text-white"
          style={{ writingDirection: "rtl" }}
        >
          سلة التسوق
        </Text>
        <Text
          className="text-neutral-500 dark:text-neutral-400 mt-1 "
          style={{ writingDirection: "rtl" }}
        >
          راجع المنتجات قبل إتمام الشراء
        </Text>
      </View>

      {/* Items */}
      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item, i) => (
          <CartCard key={i} item={item} i={i} increaseQty={increaseQty} decreaseQty={decreaseQty} removeItem={removeItem} />
          
        ))}

        {/* Summary */}
        <View className="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-sm">
          <Text
            className="text-lg font-extrabold text-neutral-900 dark:text-white mb-4"
            style={{ writingDirection: "rtl" }}
          >
            ملخص الطلب
          </Text>

          <View className="flex flex-row justify-between mb-2">
            <Text
              className="text-neutral-500 dark:text-neutral-400"
              style={{ writingDirection: "rtl" }}
            >
              المجموع الفرعي
            </Text>
            <Text className="font-medium text-neutral-900 dark:text-white">
              {total.toFixed(2)} ₪
            </Text>
          </View>

          <View className="flex flex-row justify-between mb-2">
            <Text
              className="text-neutral-500 dark:text-neutral-400"
              style={{ writingDirection: "rtl" }}
            >
              الشحن
            </Text>
            <Text className="font-medium text-neutral-900 dark:text-white">
              {shipping.toFixed(2)} ₪
            </Text>
          </View>

          <View className="flex flex-row justify-between border-t border-neutral-200 dark:border-neutral-700 pt-3 mt-3">
            <Text
              className="text-base font-bold text-neutral-900 dark:text-white"
              style={{ writingDirection: "rtl" }}
            >
              الإجمالي
            </Text>
            <Text className="text-xl font-extrabold text-neutral-900 dark:text-white">
              {(total + shipping).toFixed(2)} ₪
            </Text>
          </View>
        </View>



        <View className="  px-6 py-6 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mb-[80px]">
          <TouchableOpacity className="bg-brand-primary rounded-2xl py-4 shadow-md active:opacity-90" onPress={() => router.push('/(checkout)/checkout')}>
            <Text
              className="text-center text-white dark:text-black text-lg font-extrabold"
              style={{ writingDirection: "rtl" }}
            >
              إتمام الشراء
            </Text>
          </TouchableOpacity>
        </View>


      </ScrollView>

      {/* Checkout */}

    </SafeView>
  );
}
