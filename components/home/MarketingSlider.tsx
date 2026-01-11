// import { View, Text, Image, ScrollView, Dimensions } from 'react-native'

// const { width } = Dimensions.get('window')

// // Card width smaller than screen
// const SLIDE_WIDTH = width * 0.90
// const SLIDE_SPACING = 5

// export function MarketingSlider() {
//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       decelerationRate="fast"
//       snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
//       contentContainerStyle={{
//         paddingHorizontal: (width - SLIDE_WIDTH) / 2,
//       }}
//     >
//       {[1, 2, 3].map((_, index) => (
//         <View
//           key={index}
//           style={{
//             width: SLIDE_WIDTH,
//             marginRight: SLIDE_SPACING,
//           }}
//           className="h-40 rounded-3xl overflow-hidden" // قللنا الارتفاع من h-64 إلى h-40
//         >
//           <Image
//             source={{ uri: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae' }}
//             className="w-full h-full"
//             resizeMode="cover"
//           />

//           {/* Overlay */}
//           <View className="absolute inset-0 bg-black/40 items-center justify-center px-6">
//             <Text className="text-white text-2xl font-extrabold mb-2 text-center">
//               عروض حصرية
//             </Text>
//             <Text className="text-white text-sm opacity-90 text-center">
//               أفضل العلامات التجارية
//             </Text>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   )
// }



import { View, Text, Image, ScrollView, Dimensions, Pressable } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

const SLIDE_WIDTH = width * 0.9
const SLIDE_SPACING = 10

const COLORS = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
}

export function MarketingSlider() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
      contentContainerStyle={{
        paddingHorizontal: (width - SLIDE_WIDTH) / 2,
      }}
    >
      {[1, 2, 3].map((_, index) => (
        <View
          key={index}
          style={{
            width: SLIDE_WIDTH,
            marginRight: SLIDE_SPACING,
          }}
          className="h-44 rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Background Image */}
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={[
              "rgba(31,41,55,0.85)",
              COLORS.primary + "cc",
              COLORS.secondary + "cc",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 px-6 py-5 justify-between"
          >
            {/* Text Section */}
            <View className="max-w-[70%]">
              <Text className="text-white text-2xl font-extrabold mb-1">
                أفضل العروض  - كل شيئ في مكان واحد
              </Text>

              <Text className="text-white text-sm opacity-90 leading-5 font-bold mt-1">
                خصومات قوية على أشهر المنتجات في السوق
              </Text>



              


            </View>

            {/* CTA Button */}

             <Pressable
  className="w-[50%] self-center active:scale-95 ml-auto mb-2"
  style={({ pressed }) => [
    {
      transform: [{ scale: pressed ? 0.97 : 1 }],
    },
  ]}
>
  <View
    className="rounded-2xl px-4 py-1 flex flex-row items-center justify-center gap-2 bg-brand-primary"
    style={{
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 8,
    }}
  >
    <Text className="text-white text-xl font-extrabold">
      تسوق الآن
    </Text>

    {/* Optional arrow for action feel */}
   
  </View>
</Pressable>






          </LinearGradient>
        </View>
      ))}
    </ScrollView>
  )
}
