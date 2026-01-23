
// import React, { useState, useEffect } from 'react'
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   Pressable,
//   Modal,
//   ScrollView,
//   TextInput,
//   ActivityIndicator,
// } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
// import SafeView from '@/components/SafeView'
// import { getToken } from '@/lib/auth-storage'
// import axios from 'axios'

// /* ---------------- Product Card ---------------- */
// const ProductCard = ({ item }: any) => {
//   return (
//     <View className="flex-1 m-2 bg-white rounded-3xl shadow-sm overflow-hidden">
//       <View className="relative">
//         <Image
//           source={{ uri: `https://docank.mahmoudalbatran.com/storage/${item.image}` }}
//           className="w-full h-52"
//           resizeMode="cover"
//         />
//       </View>

//       <View className="p-4">
//         <Text
//           className="text-base font-semibold text-[#1F2937] mb-1"
//           numberOfLines={1}
//           style={{ writingDirection: 'rtl' }}
//         >
//           {item.name}
//         </Text>
//         <Text
//           className="text-xs text-neutral-400 mb-3"
//           style={{ writingDirection: 'rtl' }}
//         >
//           {item.category?.name} · {/* Placeholder for location if needed */}
//         </Text>
//         <View className="flex-row items-center justify-between">
//           <View>
//             <Text className="text-lg font-extrabold text-[#1F2937]">
//               {item.price} ر.س
//             </Text>
//           </View>
//           <Pressable className="bg-[#7CC7A4] px-4 py-2 rounded-full">
//             <Text className="text-white text-xs font-bold">أضف للسلة</Text>
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   )
// }

// /* ---------------- Page ---------------- */
// export default function ProductsPage() {
//   const [search, setSearch] = useState('')
//   const [filterVisible, setFilterVisible] = useState(false)
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
//   const [showNew, setShowNew] = useState(false)
//   const [showDiscount, setShowDiscount] = useState(false)
//   const [products, setProducts] = useState<any[]>([])
//   const [loading, setLoading] = useState(false)
//   const [categories, setCategories] = useState<any[]>([])
//   const [page, setPage] = useState(1)

//   const fetchProducts = async () => {
//     setLoading(true)
//     try {
//       const token = await getToken()
//       const response = await axios.get(
//         'https://docank.mahmoudalbatran.com/api/products',
//         {
//           params: {
//             page,
//             type: selectedCategory || '',
//             per_page: 20,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )

//       // API returns products in response.data.products.data
//       let data = response.data.products.data || []

//       // Client-side filtering (optional if API supports)
//       if (showNew) data = data.filter((p: any) => p.status === 'new') // Adjust if needed
//       if (showDiscount) data = data.filter((p: any) => p.hasDiscount) // Add property if available
//       if (search) data = data.filter((p: any) => p.name.includes(search))

//       setProducts(data)
//     } catch (error) {
//       console.log('Error fetching products:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchCategories = async () => {
//     try {
//       const token = await getToken()
//       const res = await axios.get(
//         'https://docank.mahmoudalbatran.com/api/categories',
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       setCategories(res.data.data || [])
//     } catch (err) {
//       console.log('Error fetching categories:', err)
//     }
//   }

//   useEffect(() => {
//     fetchProducts()
//   }, [selectedCategory, showNew, showDiscount, search, page])

//   useEffect(() => {
//     fetchCategories()
//   }, [])

//   return (
//     <SafeView className="flex-1 bg-[#F8FAFC] pt-4">
//       {/* Header: Search + Filter */}
//       <View className="flex-row px-4 mb-4 items-center gap-2">
//         <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 h-12 shadow-sm">
//           <Ionicons
//             name="search-outline"
//             size={18}
//             color="#9CA3AF"
//             style={{ marginRight: 6 }}
//           />
//           <TextInput
//             placeholder="ابحث عن المنتجات"
//             value={search}
//             onChangeText={setSearch}
//             placeholderTextColor="#9CA3AF"
//             className="flex-1 text-sm text-[#1F2937]"
//             returnKeyType="search"
//           />
//         </View>
//         <Pressable
//           onPress={() => setFilterVisible(true)}
//           className="bg-[#7CC7A4] p-3 rounded-2xl shadow-sm"
//         >
//           <Ionicons name="options-outline" size={20} color="#fff" />
//         </Pressable>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#7CC7A4" className="mt-20" />
//       ) : (
//         <FlatList
//           data={products}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 120 }}
//           renderItem={({ item }) => <ProductCard item={item} />}
//         />
//       )}

//       {/* Filter Modal */}
//       <Modal visible={filterVisible} transparent animationType="slide">
//         <View className="flex-1 justify-end bg-black/30">
//           <View className="bg-white rounded-t-3xl p-6 max-h-[70%]">
//             <Text className="text-lg font-bold text-[#1F2937] mb-4 text-center">
//               تصفية المنتجات
//             </Text>
//             <ScrollView>
//               {/* Categories */}
//               <Text className="font-semibold mb-2">الفئة</Text>
//               <View className="flex-row flex-wrap mb-4">
//                 {categories.map((cat: any) => (
//                   <Pressable
//                     key={cat.id}
//                     onPress={() =>
//                       setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
//                     }
//                     className={`px-4 py-2 m-1 rounded-full border ${
//                       selectedCategory === cat.id ? 'bg-[#7CC7A4]' : 'border-neutral-300'
//                     }`}
//                   >
//                     <Text
//                       className={`${
//                         selectedCategory === cat.id ? 'text-white' : 'text-[#1F2937]'
//                       } text-sm`}
//                     >
//                       {cat.name}
//                     </Text>
//                   </Pressable>
//                 ))}
//               </View>

//               {/* New / Discount */}
//               <Text className="font-semibold mb-2">الحالات الخاصة</Text>
//               <View className="flex-row gap-4 mb-4">
//                 <Pressable
//                   onPress={() => setShowNew(!showNew)}
//                   className={`px-4 py-2 rounded-full border ${
//                     showNew ? 'bg-[#6FB7D6]' : 'border-neutral-300'
//                   }`}
//                 >
//                   <Text
//                     className={`${showNew ? 'text-white' : 'text-[#1F2937]'} text-sm`}
//                   >
//                     جديد
//                   </Text>
//                 </Pressable>

//                 <Pressable
//                   onPress={() => setShowDiscount(!showDiscount)}
//                   className={`px-4 py-2 rounded-full border ${
//                     showDiscount ? 'bg-[#F6A64D]' : 'border-neutral-300'
//                   }`}
//                 >
//                   <Text
//                     className={`${showDiscount ? 'text-white' : 'text-[#1F2937]'} text-sm`}
//                   >
//                     خصم
//                   </Text>
//                 </Pressable>
//               </View>
//             </ScrollView>

//             <Pressable
//               onPress={() => {
//                 setFilterVisible(false)
//                 fetchProducts()
//               }}
//               className="bg-[#7CC7A4] px-4 py-3 rounded-full mt-4"
//             >
//               <Text className="text-white text-center font-bold">تطبيق</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </SafeView>
//   )
// }




































// import React, { useState, useEffect } from 'react'
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   Pressable,
//   TextInput,
//   ActivityIndicator,
// } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
// import SafeView from '@/components/SafeView'
// import { getToken } from '@/lib/auth-storage'
// import axios from 'axios'

// import ProductsFilterModal, {
//   ProductsFilterValues,
// } from '@/components/ProductsFilterModal'
// import { useLocalSearchParams } from 'expo-router'
// import { useCartStore } from '@/store/cartStore'
// import Toast from 'react-native-toast-message'
// import ProductCard from '@/components/ProductCard'

/* ---------------- Product Card ---------------- */
// const ProductCard = ({ item }: any) => {
//   const addItem = useCartStore(state => state.addItem);
//   const addToCart = () => {
//     addItem({
//       id: item?.id,
//       name: item?.name,
//       price: item.price,
//       quantity: 1,
//       image: item.image,

//     });
//     Toast.show({
//       type: 'success',
//       text1: "success",
//       text2: 'تمت الإضافة إلى السلة بنجاح',
//     });
//     console.log('Item added to cart');
//   }
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
//           {item.name}
//         </Text>

//         <Text
//           className="text-xs text-neutral-400 mb-3"
//           style={{ writingDirection: 'rtl' }}
//         >
//           {item.category?.name}
//         </Text>

//         <View className="flex-row items-center justify-between">
//           <Text className="text-lg font-extrabold text-[#1F2937]">
//             {item.price} ر.س
//           </Text>

//           <Pressable className="bg-[#7CC7A4] px-4 py-2 rounded-full" onPress={addToCart}>
//             <Text className="text-white text-xs font-bold">أضف للسلة</Text>
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   )
// }



















































/* ---------------- Page ---------------- */
// export default function ProductsPage() {
//   const [search, setSearch] = useState('')
//   const [filterVisible, setFilterVisible] = useState(false)
//   const [products, setProducts] = useState<any[]>([])
//   const [loading, setLoading] = useState(false)
//   const [page, setPage] = useState(1)

//   const [filters, setFilters] = useState<ProductsFilterValues>({
//     categoryId: null,
//     condition: null,
//   })

//   const { categoryId, categoryName } = useLocalSearchParams<{
//     categoryId?: string
//     categoryName?: string
//   }>()

//   const fetchProducts = async () => {
//     setLoading(true)
//     try {
//       const token = await getToken()

//       const res = await axios.get(
//         'https://docank.mahmoudalbatran.com/api/products',
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: {
//             page,
//             type: filters.categoryId || categoryName,
//             // condition: filters.condition,
//             // search,
//             per_page: 20,
//           },
//         }
//       )


//       setProducts(res.data.products.data || [])
//     } catch (err) {
//       console.log('Fetch products error:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Fetch when filters/search/page change
//   useEffect(() => {
//     fetchProducts()
//   }, [filters, search, page])

//   return (
//     <SafeView className="flex-1 bg-[#F8FAFC] pt-4">
//       {/* Header */}
//       <View className="flex-row px-4 mb-4 items-center gap-2">
//         <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 h-12 shadow-sm">
//           <Ionicons
//             name="search-outline"
//             size={18}
//             color="#9CA3AF"
//             style={{ marginRight: 6 }}
//           />
//           <TextInput
//             placeholder="ابحث عن المنتجات"
//             value={search}
//             onChangeText={setSearch}
//             placeholderTextColor="#9CA3AF"
//             className="flex-1 text-sm text-[#1F2937]"
//           />
//         </View>

//         <Pressable
//           onPress={() => setFilterVisible(true)}
//           className="bg-[#7CC7A4] p-3 rounded-2xl shadow-sm"
//         >
//           <Ionicons name="options-outline" size={20} color="#fff" />
//         </Pressable>
//       </View>

//       {/* Products */}
//       {loading ? (
//         <ActivityIndicator size="large" className="mt-20" />
//       ) : (
//         <FlatList
//           data={products}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 120 }}
//           renderItem={({ item }) => <ProductCard item={item} />}
//         />
//       )}

//       {/* ✅ Filter Modal */}
//       <ProductsFilterModal
//         visible={filterVisible}
//         values={filters}
//         onClose={() => setFilterVisible(false)}
//         onApply={newFilters => {
//           setFilters(newFilters)
//           setPage(1)
//         }}
//       />
//     </SafeView>
//   )
// }

















import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import SafeView from '@/components/SafeView'
import { getToken } from '@/lib/auth-storage'
import axios from 'axios'

import ProductsFilterModal, {
  ProductsFilterValues,
} from '@/components/ProductsFilterModal'
import { useLocalSearchParams } from 'expo-router'
import { useCartStore } from '@/store/cartStore'
import Toast from 'react-native-toast-message'
import ProductCard from '@/components/ProductCard'

/* ---------------- Product Card ---------------- */
// const ProductCard = ({ item }: any) => {
//   const addItem = useCartStore(state => state.addItem);
//   const addToCart = () => {
//     addItem({
//       id: item?.id,
//       name: item?.name,
//       price: item.price,
//       quantity: 1,
//       image: item.image,

//     });
//     Toast.show({
//       type: 'success',
//       text1: "success",
//       text2: 'تمت الإضافة إلى السلة بنجاح',
//     });
//     console.log('Item added to cart');
//   }
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
//           {item.name}
//         </Text>

//         <Text
//           className="text-xs text-neutral-400 mb-3"
//           style={{ writingDirection: 'rtl' }}
//         >
//           {item.category?.name}
//         </Text>

//         <View className="flex-row items-center justify-between">
//           <Text className="text-lg font-extrabold text-[#1F2937]">
//             {item.price} ر.س
//           </Text>

//           <Pressable className="bg-[#7CC7A4] px-4 py-2 rounded-full" onPress={addToCart}>
//             <Text className="text-white text-xs font-bold">أضف للسلة</Text>
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   )
// }

/* ---------------- Page ---------------- */
export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [filterVisible, setFilterVisible] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)


  

  const [filters, setFilters] = useState<ProductsFilterValues>({
    categoryId: null,
    condition: null,
  })

  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId?: string
    categoryName?: string
  }>()

  const fetchProducts = async () => {

    setLoading(true)
    try {
      const token = await getToken()

      const res = await axios.get(
        'https://docank.mahmoudalbatran.com/api/products',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page,
            type: filters.categoryId || categoryName,
            // condition: filters.condition,
            // search,
            per_page: 20,
          },
        }
      )


      setProducts(res.data.products.data || [])
    } catch (err) {
      console.log('Fetch products error:', err)
    } finally {
      setLoading(false)
    }
  }











//   const fetchProducts = async () => {
//   if (loading || !hasMore) return

//   setLoading(true)
//   try {
//     const token = await getToken()

//     const res = await axios.get(
//       'https://docank.mahmoudalbatran.com/api/products',
//       {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           page,
//           type: filters.categoryId || categoryName,
//           per_page: 20,
//         },
//       }
//     )

//     const pagination = res.data.products
//     const newProducts = pagination.data

//     setProducts(prev =>
//       page === 1 ? newProducts : [...prev, ...newProducts]
//     )

//     // 🔴 هنا التحديد الصحيح
//     setHasMore(pagination.next_page_url !== null)

//   } catch (err) {
//     console.log('Fetch products error:', err)
//   } finally {
//     setLoading(false)
//   }
// }



  // Fetch when filters/search/page change
  useEffect(() => {
    fetchProducts()
  }, [filters, search, page])

  return (
    <SafeView className="flex-1 bg-[#F8FAFC] pt-4">
      {/* Header */}
      <View className="flex-row px-4 mb-4 items-center gap-2">
        <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 h-12 shadow-sm">
          <Ionicons
            name="search-outline"
            size={18}
            color="#9CA3AF"
            style={{ marginRight: 6 }}
          />
          <TextInput
            placeholder="ابحث عن المنتجات"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-sm text-[#1F2937]"
          />
        </View>

        <Pressable
          onPress={() => setFilterVisible(true)}
          className="bg-[#7CC7A4] p-3 rounded-2xl shadow-sm"
        >
          <Ionicons name="options-outline" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Products */}
      {loading ? (
        <ActivityIndicator size="large" className="mt-20" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      )}

      {/* ✅ Filter Modal */}
      <ProductsFilterModal
        visible={filterVisible}
        values={filters}
        onClose={() => setFilterVisible(false)}
        onApply={newFilters => {
          setFilters(newFilters)
          setPage(1)
        }}
      />
    </SafeView>
  )
}
