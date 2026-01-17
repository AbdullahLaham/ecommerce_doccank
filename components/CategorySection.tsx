// import { View, Text, FlatList, Pressable } from 'react-native'
// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import ProductCard from './ProductCard'
// import ProductsSliderSkeleton from './ProductsSliderSkeleton'

// export default function CategoryProductsSection({ category }) {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(
//         'https://docank.mahmoudalbatran.com/api/products',
//         {
//           params: { category_id: category.id },
//         }
//       )

//       setProducts(res.data.products)
//     } catch (e) {
//       console.log(e)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <View className="mb-6">
//       {/* CATEGORY TITLE */}
//       <View className="flex-row justify-between items-center px-4 mb-3">
//         <Text className="text-xl font-extrabold text-gray-800">
//           {category.name}
//         </Text>

//         <Pressable>
//           <Text className="text-sm text-brand-primary">عرض الكل</Text>
//         </Pressable>
//       </View>

//       {/* PRODUCTS SLIDER */}
//       {loading ? (
//         <ProductsSliderSkeleton />
//       ) : (
//         <FlatList
//           data={products}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 16 }}
//           renderItem={({ item }) => (
//             <ProductCard item={item} />
//           )}
//         />
//       )}
//     </View>
//   )
// }




import { View, Text, FlatList, Pressable, Image } from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import ProductCard from '../product/ProductCard'
import ProductsSliderSkeleton from './ProductsSliderSkeleton'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'
import { useCartStore } from '@/store/cartStore'
import { getToken } from '@/lib/auth-storage'
import ProductCard from './ProductCard'
/* ---------------- Product Card ---------------- */
// const ProductCard = ({ item }: any) => {
//   const addItem = useCartStore(state => state.addItem);
//    const addToCart = () => {
//       addItem({
//         id: item?.id,
//         name: item?.name,
//         price: item.price,
//         quantity: 1,
//         image: item.image,
  
//       });
//       Toast.show({
//     type: 'success',
//     text1: "success",
//     text2: 'تمت الإضافة إلى السلة بنجاح',
//   });
//   console.log('Item added to cart');
//     }
//   return (
//     <View className="flex-1 m-2 bg-white rounded-3xl shadow-sm overflow-hidden">
//       <Image
//         source={{
//           uri: `https://docank.mahmoudalbatran.com/storage/${item.image}`,
//         }}
//         className="w-full h-52"
//         resizeMode="cover"
//       />

//       <View className="p-4">
//         <Text
//           className="text-base font-semibold text-[#1F2937] mb-1"
//           numberOfLines={1}
//           style={{ writingDirection: 'rtl' }}
//         >
//           {item?.name}
//         </Text>

//         <Text
//           className="text-xs text-neutral-400 mb-3"
//           style={{ writingDirection: 'rtl' }}
//         >
//           {item?.category?.name}
//         </Text>

//         <View className="flex-row items-center justify-between">
//           <Text className="text-lg font-extrabold text-[#1F2937]">
//             {item?.price} ر.س
//           </Text>

//           <Pressable className="bg-[#7CC7A4] px-4 py-2 rounded-full" onPress={addToCart}>
//             <Text className="text-white text-xs font-bold">أضف للسلة</Text>
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   )
// }








// type Props = {
//   category: {
//     id: string
//     name: string
//   }
// }

export default function CategorySection({ category }: any) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const token = await getToken();
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", token)

    try {
      const res = await axios.get(
        'https://docank.mahmoudalbatran.com/api/products',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { 
            type: category?.name,
            // condition: filters.condition,
            // search,
            per_page: 20, 
          },
        }
      )
      setProducts(res.data.products.data)
    } finally {
      setLoading(false)
    }
  }
  if (!category || products?.length == 0) return null

  return (
    <View className="mb-6 ">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-xl font-extrabold text-gray-800">
          {category?.name}
        </Text>

        <Pressable
          onPress={() =>
            router.push({
              pathname: '/products',
              params: {
                categoryId: category.id,
                categoryName: category.name,
              },
            })
          }
        >
          <Text className="text-brand-primary font-extrabold text-xl">عرض الكل</Text>
        </Pressable>
      </View>

      {/* Products */}
      {loading ? (
        <ProductsSliderSkeleton />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <ProductCard item={item} />
          )}
        />
      )}
    </View>
  )
}
