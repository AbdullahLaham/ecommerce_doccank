// import React from 'react'
// import { View, Text, Image, Pressable } from 'react-native'
// import { router } from 'expo-router'

// type Props = {
//   item: {
//     id: string
//     title: string
//     subtitle: string
//     image: any
//     bg: string
//     badge?: string
//   }
// }

// export default function CategoryCard({ item }: Props) {
//   console.log(item, 'yy')
//   return (
//     <Pressable
//       onPress={() => router.push('/products')}
//       className="mr-4 active:scale-95 relative py-1 "
//       style={{ width: 120 }}
//     >
//       <View
//         className="rounded-3xl overflow-hidden "
//         style={{
//           backgroundColor: item.bg,
//           shadowColor: '#000',
//           shadowOpacity: 0.1,
//           shadowRadius: 14,
//           elevation: 6,
//         }}
//       >
//         {/* Image area */}
//         <View className="h-36  overflow-hidden">
//           {/* <Image
//             source={`https://docank.mahmoudalbatran.com/storage/${item.icon}`}
//             className="absolute inset-0 w-full h-full"
//             resizeMode="cover"
//           /> */}
//           <Image
//             source={{uri: `https://docank.mahmoudalbatran.com/storage/${item.icon}`}}
//             className="absolute inset-0 w-full h-full"
//             resizeMode="cover"
//           />

//           {/* Dark overlay (pure View) */}
//           <View className="absolute inset-0 bg-black/40" />

//           {/* Diagonal separator */}
//           <View
//             className="absolute -bottom-10 right-0 w-[120%] h-20"
//             style={{
//               backgroundColor: item.bg,
//               transform: [{ skewY: '-8deg' }],
//             }}
//           />
//         </View>

//         {/* Content */}
//         <View className="px-4 pb-4 -mt-6 " >
//           {/* {item.badge && (
//             <View className="self-start mb-2 bg-black/70 px-3 py-1 rounded-full absolute top-2 right-2 ">
//               <Text className="text-white text-[10px] font-bold">
//                 {item.badge}
//               </Text>
//             </View>
//           )} */}

//           <Text
//             className="text-lg font-extrabold text-[#1F2937] mb-1"
//             style={{ writingDirection: 'rtl' }}
//           >
//             {item.name}
//           </Text>

//           <Text
//             className="text-xs text-neutral-600"
//             numberOfLines={2}
//             style={{ writingDirection: 'rtl' }}
//           >
//             {item.description}
//           </Text>
//         </View>
//       </View>
//     </Pressable>
//   )
// }






// import React, { useRef } from 'react'
// import {
//   View,
//   Text,
//   ImageBackground,
//   Pressable,
//   Animated,
// } from 'react-native'
// import { router } from 'expo-router'



// type Props = {
//   item: {
//     id: string
//     name: string
//     description: string
//     icon: string
//     bg: string
//   },
//     bgColor: string,
// }

// export default function CategoryCard({ item, bgColor }: Props) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;



//   return (
//     <Pressable
//       onPress={() => router.push('/products')}
//       className="mr-4 active:scale-95"
//       style={{ width: 130 }}
//     >
//       <View
//         className="rounded-3xl overflow-hidden"
//         style={{
//           shadowColor: '#000',
//           shadowOpacity: 0.15,
//           shadowRadius: 20,
//           elevation: 9,
//         }}
//       >
//         {/* IMAGE BACKGROUND */}
//         <ImageBackground
//           source={{
//             uri: `https://docank.mahmoudalbatran.com/storage/${item.icon}`,
//           }}
//           resizeMode="cover"
//           className="h-52 justify-end"
//           onLoadEnd={() => {
//             Animated.timing(fadeAnim, {
//               toValue: 1,
//               duration: 300,
//               useNativeDriver: true,
//             }).start()
//           }}
//         >
//           {/* Fallback background */}
//           <View
//             className="absolute inset-0"
//             style={{ backgroundColor: item.bg }}
//           />

//           {/* Dark overlay */}
//           <Animated.View
//             className="absolute inset-0 bg-black/45"
//             style={{ opacity: fadeAnim }}
//           />

//           {/* Diagonal separator */}
//           <View
//             className="absolute bottom-14 left-0 w-[120%] z-40"
//             style={{
//               height: 10,                 // 👈 صغير جدًا
//               backgroundColor: bgColor, // نفس لون المحتوى
//               transform: [{ skewY: '-4deg' }], // 👈 ميل خفيف
//             }}
//           />

          

//           {/* CONTENT */}
//           <View className="px-4 pb-4 z-50 " style={{ backgroundColor: bgColor }}>
//             <Text
//               className="text-brand-dark text-lg font-extrabold mb-1"
//               numberOfLines={1}
//               style={{ writingDirection: 'rtl' }}
//             >
//               {item.name}
//             </Text>

//             <Text
//               className="text-brand-dark/90 text-xs"
//               numberOfLines={2}
//               style={{ writingDirection: 'rtl' }}
//             >
//               {item.description}
//             </Text>
//           </View>
//         </ImageBackground>
//       </View>
//     </Pressable>
//   )
// }





// import React from 'react'
// import { View, Text, ImageBackground, Pressable } from 'react-native'
// import { router } from 'expo-router'

// type Props = {
//   item: {
//     id: string
//     name: string
//     description: string
//     icon: string
//   }
//   width: number
//   bgColor: string
// }

// export default function CategoryCard({ item, width, bgColor }: Props) {
//   const height = width * 1.35 // perfect aspect ratio
//   const imageHeight = height * 0.65
//   const contentHeight = height - imageHeight

//   return (
//     <Pressable
//       onPress={() => router.push('/products')}
//       style={{ width, height }}
//       className="active:scale-95"
//     >
//       <View
//         style={{
//           borderRadius: 20,
//           overflow: 'hidden',
//           shadowColor: '#000',
//           shadowOpacity: 0.12,
//           shadowRadius: 12,
//           elevation: 6,
//         }}
//       >
//         {/* IMAGE */}
//         <ImageBackground
//           source={{ uri: `https://docank.mahmoudalbatran.com/storage/${item.icon}` }}
//           style={{ height: imageHeight, width: '100%' }}
//           resizeMode="cover"
//         >
//           {/* subtle overlay for readability */}
//           <View
//             style={{
//               position: 'absolute',
//               inset: 0,
//               backgroundColor: 'rgba(0,0,0,0.15)',
//             }}
//           />
//         </ImageBackground>

//         {/* DIAGONAL TOP BORDER OF CONTENT */}
//         <View
//           style={{
//             width: '120%',
//             height: 12,          // slim and elegant
//             backgroundColor: bgColor,
//             transform: [{ skewY: '-4deg' }],
//             marginTop: -8,       // overlap slightly over image
//             marginLeft: -10,     // align visually
//           }}
//         />

//         {/* CONTENT AREA */}
//         <View
//           style={{
//             backgroundColor: bgColor,
//             paddingHorizontal: 6,
//             paddingVertical: 3,
//             marginTop: -8,       // overlap slightly over image
//             // height: contentHeight - 8,
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 13,
//               fontWeight: '700',
//               color: '#1F2937',
//             }}
//             numberOfLines={1}
//           >
//             {item.name}
//           </Text>

//           <Text
//             style={{
//               fontSize: 11,
//               color: '#4B5563',
//               marginTop: 2,
//             }}
//             numberOfLines={2}
//           >
//             {item.description}
//           </Text>
//         </View>
//       </View>
//     </Pressable>
//   )
// }


import React from 'react'
import { View, Text, ImageBackground, Pressable } from 'react-native'
import { router } from 'expo-router'

type Props = {
  item: {
    id: string
    name: string
    description: string
    icon: string
  }
  width: number
  bgColor: string
}

export default function CategoryCard({ item, width, bgColor }: Props) {
  const height = width * 1.35
  const imageHeight = height * 0.65
  const contentHeight = height - imageHeight + 15;

  return (
    <Pressable
      onPress={() => router.push({
      pathname: '/products',
      params: {
        categoryId: item.id,
        categoryName: item.name, // optional (for title)
      },
    })}
      style={{ width, height }}
      className="active:scale-95"
    >
      <View
        style={{
          borderRadius: 15,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        {/* IMAGE */}
        <ImageBackground
          source={{ uri: `https://docank.mahmoudalbatran.com/storage/${item.icon}` }}
          style={{ height: imageHeight, width: '100%' }}
          resizeMode="cover"
        >
          <View
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.15)',
            }}
          />
        </ImageBackground>
        {/* Dark overlay (pure View) */}
          <View className="absolute inset-0 bg-black/40" />

        {/* DIAGONAL */}
        <View
          style={{
            width: '120%',
            height: 16,
            backgroundColor: bgColor,
            transform: [{ skewY: '-7.5deg' }],
            marginTop: -8,
            marginLeft: -10,
          }}
        />

        {/* CONTENT */}
        <View
          style={{
            backgroundColor: bgColor,
            paddingHorizontal: 6,
            paddingVertical: 8,
            marginTop: -8.6,
            height: contentHeight - 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#1F2937',
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text className='text-neutral-600'
            style={{
              fontSize: 10,
              marginTop: 2,
            }}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
