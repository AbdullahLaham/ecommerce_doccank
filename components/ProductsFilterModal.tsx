import React from 'react'
import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import { useCategoriesStore } from '@/store/categories.store'

export interface ProductsFilterValues {
  categoryId: number | null
  condition: 'new' | 'used' | null
}

interface Props {
  visible: boolean
  values: ProductsFilterValues
  onApply: (values: ProductsFilterValues) => void
  onClose: () => void
}

export default function ProductsFilterModal({
  visible,
  values,
  onApply,
  onClose,
}: Props) {
  const { categories, loading } = useCategoriesStore()

  const [localValues, setLocalValues] =
    React.useState<ProductsFilterValues>(values)

  // Sync when opening
  React.useEffect(() => {
    if (visible) setLocalValues(values)
  }, [visible])

  const toggleCategory = (id: number) => {
    console.log(id, 'yyyyyyyyy');
    setLocalValues(prev => ({
      ...prev,
      categoryId: prev.categoryId === id ? null : id,
    }))

  }

  const toggleCondition = (condition: 'new' | 'used') => {
    setLocalValues(prev => ({
      ...prev,
      condition: prev.condition === condition ? null : condition,
    }))
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-3xl p-6 max-h-[75%]">

          {/* Header */}
          <Text className="text-lg font-bold text-center mb-4">
            تصفية المنتجات
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Categories */}
            <Text className="font-semibold mb-2">الفئة</Text>

            {loading ? (
              <ActivityIndicator className="my-4" />
            ) : (
              <View className="flex-row flex-wrap mb-4">
                {categories.map(cat => (
                  <Pressable
                    key={cat.id}
                    onPress={() => toggleCategory(cat.name)} //id
                    className={`px-4 py-2 m-1 rounded-full border ${
                      localValues.categoryId === cat.name  //id
                        ? 'bg-[#7CC7A4]'
                        : 'border-neutral-300'
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        localValues.categoryId === cat.name  //id
                          ? 'text-white'
                          : 'text-[#1F2937]'
                      }`}
                    >
                      {cat.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* Condition */}
            <Text className="font-semibold mb-2">الحالة</Text>
            <View className="flex-row gap-3 mb-4">
              {['new', 'used'].map(cond => (
                <Pressable
                  key={cond}
                  onPress={() =>
                    toggleCondition(cond as 'new' | 'used')
                  }
                  className={`px-4 py-2 rounded-full border ${
                    localValues.condition === cond
                      ? 'bg-[#6FB7D6]'
                      : 'border-neutral-300'
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      localValues.condition === cond
                        ? 'text-white'
                        : 'text-[#1F2937]'
                    }`}
                  >
                    {cond === 'new' ? 'جديد' : 'مستعمل'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* Actions */}
          <View className="flex-row gap-3 mt-4">
            <Pressable
              onPress={onClose}
              className="flex-1 py-3 rounded-full border border-neutral-300"
            >
              <Text className="text-center font-semibold">إلغاء</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onApply(localValues)
                onClose()
              }}
              className="flex-1 py-3 rounded-full bg-[#7CC7A4]"
            >
              <Text className="text-white text-center font-bold">
                تطبيق
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}
