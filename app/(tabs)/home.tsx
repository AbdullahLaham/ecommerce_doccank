


import CategoriesSlider from '@/components/home/CategoriesSlider'
import Header from '@/components/home/Header'
import { MarketingSlider } from '@/components/home/MarketingSlider'
import SafeView from '@/components/SafeView'
import React from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { useCategoriesStore } from '@/store/categories.store'
import ProductsCategoriesList from '@/components/ProductsCategoriesList'
import AppBackground from '@/components/AppBackground'

export default function HomeScreen() {
  const {  categories } = useCategoriesStore();
    return (
    <SafeView>9*
      <AppBackground>
        {/* <ScrollView className="flex-1 " contentContainerStyle={{ paddingBottom: 40 }}>

        <Header />

        <MarketingSlider />

        <CategoriesSlider />


        <ProductsCategoriesList categories={categories} />
        
        
      </ScrollView> */}

      <ProductsCategoriesList categories={categories} />
      <View style={{ height: 40 }} />
      </AppBackground>
    </SafeView>




  )
}



//eas build --profile production --platform android































