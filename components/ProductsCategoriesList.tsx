import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategorySection from './CategorySection'

const ProductsCategoriesList = ({categories}) => {
  return (
    <View className='mt-10'>
        <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CategorySection category={item} />
              )}
              showsVerticalScrollIndicator={false}
            />
    </View>
  )
}

export default ProductsCategoriesList

const styles = StyleSheet.create({})