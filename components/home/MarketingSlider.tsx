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






import { View, Text, Image, ScrollView, Dimensions, Pressable, NativeSyntheticEvent, NativeScrollEvent } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/lib/auth-storage";

const { width } = Dimensions.get("window")
// const SliderSkeleton = () => (
//   <ScrollView
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     contentContainerStyle={{
//       paddingHorizontal: (width - SLIDE_WIDTH) / 2,
//     }}
//   >
//     {[1, 2, 3].map((_, index) => (
//       <View
//         key={index}
//         style={{
//           width: SLIDE_WIDTH,
//           height: 180,
//           marginRight: SLIDE_SPACING,
//           borderRadius: 24,
//           overflow: "hidden",
//           backgroundColor: "#e0e0e0",
//         }}
//       >
//         {/* Text placeholders */}
//         <View
//           style={{
//             position: "absolute",
//             bottom: 16,
//             left: 16,
//           }}
//         >
//           <View
//             style={{
//               width: SLIDE_WIDTH * 0.6,
//               height: 20,
//               backgroundColor: "#c0c0c0",
//               borderRadius: 6,
//               marginBottom: 8,
//             }}
//           />
//           <View
//             style={{
//               width: SLIDE_WIDTH * 0.4,
//               height: 14,
//               backgroundColor: "#c0c0c0",
//               borderRadius: 6,
//               marginBottom: 12,
//             }}
//           />
//           <View
//             style={{
//               width: SLIDE_WIDTH * 0.3,
//               height: 32,
//               backgroundColor: "#b0b0b0",
//               borderRadius: 16,
//             }}
//           />
//         </View>
//       </View>
//     ))}
//   </ScrollView>
// );


const MOCK_SLIDER_DATA = [
  {
    id: "1",
    title: "Summer Sale",
    description: "Up to 50% off on all items",
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: "2",
    title: "New Arrivals",
    description: "Discover our latest collection",
    image: "https://via.placeholder.com/800x400",
  },
];

 function SliderSkeleton() {
  return (
    <View
      style={{ width: SLIDE_WIDTH }}
      className="h-44 mr-3 rounded-3xl overflow-hidden bg-gray-100"
    >
      {/* Image placeholder */}
      <View className="absolute inset-0 bg-gray-200" />

      {/* Content placeholder */}
      <View className="absolute inset-0 px-6 py-5 justify-between">
        {/* Title & Subtitle */}
        <View className="space-y-2">
          <View className="w-60 h-4 rounded-lg bg-gray-300" />
        </View>

        {/* Button */}
        <View className="self-center mb-2">
          <View className="w-32 h-10 rounded-2xl bg-gray-300" />
        </View>
      </View>
    </View>
  );
}

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

  // const [slides, setSlides] = useState(MOCK_SLIDER_DATA);
  // const [loading, setLoading] = useState(true);



  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [fetchingMore, setFetchingMore] = useState(false)

  /* ---------------- Fetch Function ---------------- */
  const fetchSliders = async (pageNumber = 1) => {
    if (!hasMore && pageNumber !== 1) return

    pageNumber === 1 ? setLoading(true) : setFetchingMore(true)

    try {
      const token = await getToken()

      const res = await axios.get(
        "https://docank.mahmoudalbatran.com/api/sliders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: pageNumber,
            per_page: 8,
          },
        }
      )

      const pagination = res.data.sliders
      const newSlides = pagination.data || []

      setSlides(prev =>
        pageNumber === 1 ? newSlides : [...prev, ...newSlides]
      )

      setHasMore(pagination.next_page_url !== null)
      setPage(pageNumber)
    } catch (err) {
      console.log("Slider API error:", err)
    } finally {
      setLoading(false)
      setFetchingMore(false)
    }
  }

  /* ---------------- Initial Load ---------------- */
  useEffect(() => {
    fetchSliders(1)
  }, [])

  /* ---------------- Pagination on Scroll ---------------- */
  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent

      const isNearEnd =
        contentOffset.x + layoutMeasurement.width >=
        contentSize.width - 80

      if (isNearEnd && hasMore && !fetchingMore) {
        fetchSliders(page + 1)
      }
    },
    [page, hasMore, fetchingMore]
  )


  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      onScroll={handleScrollEnd}
      snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
      contentContainerStyle={{
        paddingHorizontal: (width - SLIDE_WIDTH) / 2,
      }}
    >
      {
        loading ? <SliderSkeleton /> : (
          slides.map((slide, index) => (
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
                source={{ uri: `https://docank.mahmoudalbatran.com/storage/${slide.image}` }}
                className="w-full h-full"
                resizeMode="cover"
              />

              {/* Gradient Overlay */}
              <LinearGradient
                colors={[
                  // "rgba(31,41,55,0.45)", // أخف بكثير
                  COLORS.primary + "10",
                  COLORS.primary + "20", // شفافية أقل
                  COLORS.secondary + "20",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 px-6 py-5 justify-between"
              >
                {/* Text Section */}
                {/* <View className="max-w-[70%]">
                  <Text className="text-white text-2xl font-extrabold mb-1">
                    {slide?.title || " أفضل العروض  - كل شيئ في مكان واحد"}
                  </Text>

                  <Text className="text-white text-md opacity-90 leading-5 font-bold mt-1">
                    {slide?.description || " خصومات قوية على أشهر المنتجات في السوق"}
                  </Text>






                </View> */}

                {/* CTA Button */}

                {/* <Pressable
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


                  </View>
                </Pressable> */}
              </LinearGradient>
            </View>
          ))
        )

      }
    </ScrollView>
  )
}








// import {
//   View,
//   Text,
//   ImageBackground,
//   ScrollView,
//   Pressable,
//   Dimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { getToken } from "@/lib/auth-storage";

// const { width } = Dimensions.get("window");

// const SLIDE_WIDTH = width * 0.9;
// const SLIDE_SPACING = 10;

// /* ---------------- Skeleton Loader ---------------- */
// const SliderSkeleton = () => (
//   <ScrollView
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     contentContainerStyle={{
//       paddingHorizontal: (width - SLIDE_WIDTH) / 2,
//     }}
//   >
//     {[1, 2, 3].map((_, index) => (
//       <View
//         key={index}
//         style={{
//           width: SLIDE_WIDTH,
//           height: 180,
//           marginRight: SLIDE_SPACING,
//           borderRadius: 24,
//           overflow: "hidden",
//           backgroundColor: "#e0e0e0",
//         }}
//       >
//         {/* Text placeholders */}
//         <View
//           style={{
//             position: "absolute",
//             bottom: 16,
//             left: 16,
//           }}
//         >
//           <View
//             style={{
//               width: SLIDE_WIDTH * 0.6,
//               height: 20,
//               backgroundColor: "#c0c0c0",
//               borderRadius: 6,
//               marginBottom: 8,
//             }}
//           />
//           <View
//             style={{
//               width: SLIDE_WIDTH * 0.4,
//               height: 14,
//               backgroundColor: "#c0c0c0",
//               borderRadius: 6,
//               marginBottom: 12,
//             }}
//           />
//           <View
//             style={{
//               width: SLIDE_WIDTH * 0.3,
//               height: 32,
//               backgroundColor: "#b0b0b0",
//               borderRadius: 16,
//             }}
//           />
//         </View>
//       </View>
//     ))}
//   </ScrollView>
// );

// /* ---------------- Marketing Slider ---------------- */
// export function MarketingSlider() {
//   const [slides, setSlides] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [fetchingMore, setFetchingMore] = useState(false);

//   /* ---------------- Fetch Function ---------------- */
//   const fetchSliders = async (pageNumber = 1) => {
//     if (!hasMore && pageNumber !== 1) return;

//     pageNumber === 1 ? setLoading(true) : setFetchingMore(true);

//     try {
//       const token = await getToken();

//       const res = await axios.get(
//         "https://docank.mahmoudalbatran.com/api/sliders",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { page: pageNumber, per_page: 8 },
//         }
//       );

//       const pagination = res.data.sliders;
//       const newSlides = pagination.data || [];

//       setSlides((prev) =>
//         pageNumber === 1 ? newSlides : [...prev, ...newSlides]
//       );

//       setHasMore(pagination.next_page_url !== null);
//       setPage(pageNumber);
//     } catch (err) {
//       console.log("Slider API error:", err);
//     } finally {
//       setLoading(false);
//       setFetchingMore(false);
//     }
//   };

//   /* ---------------- Initial Load ---------------- */
//   useEffect(() => {
//     fetchSliders(1);
//   }, []);

//   /* ---------------- Pagination on Scroll ---------------- */
//   const handleScrollEnd = useCallback(
//     (e) => {
//       const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;

//       const isNearEnd =
//         contentOffset.x + layoutMeasurement.width >= contentSize.width - 80;

//       if (isNearEnd && hasMore && !fetchingMore) {
//         fetchSliders(page + 1);
//       }
//     },
//     [page, hasMore, fetchingMore]
//   );

//   /* ---------------- Render ---------------- */
//   if (loading) {
//     return <SliderSkeleton />;
//   }

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       decelerationRate="fast"
//       onScroll={handleScrollEnd}
//       snapToInterval={SLIDE_WIDTH + SLIDE_SPACING}
//       contentContainerStyle={{
//         paddingHorizontal: (width - SLIDE_WIDTH) / 2,
//       }}
//     >
//       {slides.map((slide, index) => (
//         <View
//           key={index}
//           style={{
//             width: SLIDE_WIDTH,
//             height: 180,
//             marginRight: SLIDE_SPACING,
//             borderRadius: 24,
//             overflow: "hidden",
//             backgroundColor: "#f0f0f0",
//           }}
//           className="shadow-xl"
//         >
//           {/* Image */}
//           <ImageBackground
//             source={{
//               uri: `https://docank.mahmoudalbatran.com/storage/${slide.image}`,
//             }}
//             style={{ width: "100%", height: "100%" }}
//             resizeMode="cover"
//           >
//             {/* Soft overlay to make text readable but image clear */}
//             <LinearGradient
//               colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0)"]}
//               start={{ x: 0, y: 1 }}
//               end={{ x: 0, y: 0 }}
//               style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
//             />

//             {/* Texts */}
//             <View
//               style={{
//                 position: "absolute",
//                 bottom: 16,
//                 left: 16,
//                 maxWidth: "70%",
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#fff",
//                   fontSize: 20,
//                   fontWeight: "bold",
//                   marginBottom: 4,
//                 }}
//               >
//                 {slide.title || "أفضل العروض - كل شيء في مكان واحد"}
//               </Text>
//               <Text
//                 style={{
//                   color: "#fff",
//                   fontSize: 14,
//                   opacity: 0.9,
//                   marginBottom: 12,
//                 }}
//               >
//                 {slide.description ||
//                   "خصومات قوية على أشهر المنتجات في السوق"}
//               </Text>

//               {/* CTA Button */}
//               <Pressable
//                 style={({ pressed }) => ({
//                   backgroundColor: "#7CC7A4",
//                   paddingVertical: 6,
//                   paddingHorizontal: 16,
//                   borderRadius: 16,
//                   transform: [{ scale: pressed ? 0.97 : 1 }],
//                   elevation: 5,
//                 })}
//               >
//                 <Text
//                   style={{
//                     color: "#fff",
//                     fontSize: 16,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   تسوق الآن
//                 </Text>
//               </Pressable>
//             </View>
//           </ImageBackground>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }
