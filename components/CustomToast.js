// import { Ionicons } from '@expo/vector-icons';
// import { View, Text } from 'react-native';

// export const CustomToast = ({ text1, text2 }) => {
//   return (
//     <View
//       style={{
//         width: '90%',
//         padding: 16,
//         borderRadius: 12,
//         backgroundColor: '#1b2b50ff',
//         flexDirection: 'row',
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOpacity: 0.2,
//         shadowRadius: 6,
//         elevation: 5,
//       }}
//     >
//       <Ionicons name="checkmark-circle-outline" size={26} color="#22C55E" />

//       <View style={{ marginLeft: 12, flex: 1 }}>
//         <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
//           {text1}
//         </Text>

//         {text2 && (
//           <Text style={{ color: '#CBD5E1', marginTop: 4 }}>
//             {text2}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// };








import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CustomToast = ({
  text1,
  text2,
  type = 'success',
}) => {
  const variants = {
    success: {
      icon: 'checkmark-circle-outline',
      color: '#7CC7A4', // brand.primary
    },
    error: {
      icon: 'close-circle-outline',
      color: '#F87171',
    },
    warning: {
      icon: 'alert-circle-outline',
      color: '#F6A64D', // brand.accent
    },
    info: {
      icon: 'information-circle-outline',
      color: '#6FB7D6', // brand.secondary
    },
  };

  const { icon, color } = variants[type];

  return (
    <View
      style={{
        width: '92%',
        borderRadius: 16,
        backgroundColor: '#1F2937', // brand.dark
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
      }}
    >
      {/* Accent bar */}
      <View
        style={{
          width: 4,
          height: '100%',
          backgroundColor: color,
          borderRadius: 4,
          marginRight: 12,
        }}
      />

      {/* Icon */}
      <Ionicons name={icon} size={26} color={color} />

      {/* Text */}
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text
          style={{
            color: '#F8FAFC', // brand.light
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          {text1}
        </Text>

        {text2 && (
          <Text
            style={{
              color: '#CBD5E1',
              marginTop: 4,
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            {text2}
          </Text>
        )}
      </View>
    </View>
  );
};
