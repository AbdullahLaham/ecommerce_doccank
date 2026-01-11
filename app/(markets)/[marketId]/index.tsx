import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

const marketDetails = {
  name: 'Fresh Mart',
  location: 'Gaza City',
  description: 'Fresh Mart offers a wide variety of fresh vegetables, fruits, and organic products directly sourced from local farms. Enjoy premium quality at affordable prices!',
  image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a',
  openingHours: 'Mon - Sun: 8:00 AM - 8:00 PM',
  contact: '+970 123 456 789',
};

export default function MarketDetails() {
  return (
    <ScrollView className="flex-1 bg-brand-light">
      {/* Header Image */}
      <Image
        source={{ uri: marketDetails.image }}
        className="w-full h-64"
      />

      {/* Content */}
      <View className="p-6">
        {/* Market Name & Location */}
        <Text className="text-3xl font-bold text-brand-dark mb-2">
          {marketDetails.name}
        </Text>
        <Text className="text-sm text-gray-500 mb-4">
          {marketDetails.location}
        </Text>

        {/* Description */}
        <Text className="text-base text-brand-dark mb-6">
          {marketDetails.description}
        </Text>

        {/* Opening Hours */}
        <View className="mb-4">
          <Text className="text-sm text-gray-500 mb-1">Opening Hours</Text>
          <Text className="text-base text-brand-primary font-semibold">
            {marketDetails.openingHours}
          </Text>
        </View>

        {/* Contact */}
        <View className="mb-6">
          <Text className="text-sm text-gray-500 mb-1">Contact</Text>
          <Text className="text-base text-brand-secondary font-semibold">
            {marketDetails.contact}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-1 mr-2 bg-brand-primary py-3 rounded-2xl items-center">
            <Text className="text-white font-semibold">Call Market</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 ml-2 bg-brand-accent py-3 rounded-2xl items-center">
            <Text className="text-white font-semibold">Get Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}