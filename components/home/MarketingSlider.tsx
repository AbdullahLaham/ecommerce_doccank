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

const SliderSkeleton = () => {

  
  return (
    <View
      className="w-full h-[220px] rounded-2xl bg-gray-300 overflow-hidden"
    >
      {/* Image placeholder */}
      <View className="absolute inset-0 bg-gray-400" />

      {/* Text placeholders */}
      <View className="absolute bottom-4 left-4 space-y-2">
        <View className="w-40 h-5 bg-gray-500 rounded-md" />
        <View className="w-56 h-4 bg-gray-500 rounded-md" />
        <View className="w-24 h-9 bg-gray-500 rounded-lg mt-2" />
      </View>
    </View>
  );
};

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

  /* ---------------- Render ---------------- */
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await axios.get("/marketing-slider");
        setSlides(response.data);
      } catch (error) {
        console.log("Slider API error:", error.message);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchSliderData();
  }, []);







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
               {slide?.title || " أفضل العروض  - كل شيئ في مكان واحد"}
              </Text>

              <Text className="text-white text-md opacity-90 leading-5 font-bold mt-1">
               {slide?.description || " خصومات قوية على أشهر المنتجات في السوق"}
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
      ))
      )
      
      }
    </ScrollView>
  )
}
