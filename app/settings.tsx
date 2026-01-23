// import { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import SafeView from '@/components/SafeView';
// import * as Location from 'expo-location';
// import AddressTypeButton from '@/components/AddressTypeButton';
// import { useUserStore } from '@/store/user.store';
// import { api } from '@/lib/api';
// import Section from '@/components/settings/Section';
// import { getToken } from '@/lib/auth-storage';

// const BRAND = {
//   primary: "#7CC7A4",
//   secondary: "#6FB7D6",
//   accent: "#F6A64D",
//   dark: "#1F2937",
//   light: "#F8FAFC",
//   muted: "#9CA3AF",
//   danger: "#EF4444",
// };



// // const Section = ({ title, children }) => (
// //   <View style={{ marginBottom: 28 }}>
// //     <Text
// //       style={{
// //         fontSize: 16,
// //         fontWeight: '700',
// //         color: BRAND.dark,
// //         marginBottom: 10,
// //       }}
// //     >
// //       {title}
// //     </Text>

// //     <View
// //       style={{
// //         backgroundColor: BRAND.light,
// //         borderRadius: 18,
// //         padding: 16,
// //         elevation: 4,
// //       }}
// //     >
// //       {children}
// //     </View>
// //   </View>
// // );

// const Input = (props) => (
//   <TextInput
//     placeholderTextColor={BRAND.muted}
//     {...props}
//     style={[
//       {
//         borderWidth: 1,
//         borderColor: '#E5E7EB',
//         borderRadius: 14,
//         paddingHorizontal: 14,
//         paddingVertical: 12,
//         fontSize: 15,
//         color: BRAND.dark,
//         marginBottom: 12,
//       },
//       props.style,
//     ]}
//   />
// );

// const Button = ({ title, onPress, color }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     style={{
//       backgroundColor: color || BRAND.primary,
//       paddingVertical: 14,
//       borderRadius: 14,
//       alignItems: 'center',
//       marginTop: 6,
//     }}
//   >
//     <Text style={{ color: '#fff', fontWeight: '700' }}>
//       {title}
//     </Text>
//   </TouchableOpacity>
// );


// export default function SettingsScreen() {

//   const user = useUserStore((state) => state.user);



//   // Profile
//   const [name, setName] = useState(user?.name);
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');



//   // Password
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   const [addresses, setAddresses] = useState<any>([]);
//   const [showForm, setShowForm] = useState(false);


//   const [loading, setLoading] = useState(false);

//   const [type, setType] = useState("Home");
//   const [city, setCity] = useState("");



//   const [addressType, setAddressType] = useState('Home');
//   const [addressValue, setAddressValue] = useState('');
//   const [locating, setLocating] = useState(false);

//   const userId = user?.id;

//   useEffect(() => {
//     loadAddresses();
//   }, []);

//   const loadAddresses = async () => {
//     try {
//       const token = await getToken();
//       console.log('uuuuuuuuuuuuuuuuuuuuuu', token)
//       setLoading(true);
//       const res = await api.get("/addresses", {
//         params: { user_id: userId },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(res.data.address, 'yyyyyyyyyyyyyyyyyyyyyyyyyyyy')
//       setAddresses(res.data.address.data ?? res.data);
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAddresses();
//   }, []);

//   const createAddress = async () => {
//     if (!address.trim()) return;

//     await api.post("/addresses",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//        {
//       name: type,
//       address,
//       city,
//       isMain: addresses.length === 0,
//     }
//   );

//     setAddress("");
//     setCity("");
//     setType("Home");
//     setShowForm(false);
//     loadAddresses();
//   };

//   const selectMainAddress = async (id) => {
//     await Promise.all(
//       addresses.map((a) =>
//         api.put(`/addresses/${a.id}`, {
//           isMain: a.id === id,
//         })
//       )
//     );
//     loadAddresses();
//   };

//   const deleteAddress = async (id) => {
//     await api.delete(`/addresses/${id}`);
//     setAddresses((prev) => prev.filter((a) => a.id !== id));
//   };



//   const addAddress = () => {
//     if (!addressValue.trim()) return;
//     const newAddress = {
      
//         name: addressType,
//         address: addressValue,
//         city: city,
//         isMain: true,
//     }

//     setAddresses((prev: any) => [
//       ...prev,
//       {
//         id: Date.now().toString(),
//         ...newAddress,
//         selected: prev.length === 0, // first one default
//       },
//     ]);

//     setAddressValue('');
//     setAddressType('Home');
//     setShowForm(false);
//   };

//   const selectDeliveryAddress = (id) => {
//     setAddresses((prev) =>
//       prev.map((a) => ({
//         ...a,
//         selected: a.id === id,
//       }))
//     );
//   };






//   // Fake API handler
//   const save = (label) => {
//     console.log(`Saving ${label}`);
//   };





//   const getCurrentLocation = async () => {
//     try {
//       setLocating(true);
//       const { status } =
//         await Location.requestForegroundPermissionsAsync();

//       if (status !== 'granted') {
//         alert('Location permission denied');
//         return;
//       }

//       const location =
//         await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.Balanced,
//           timeout: 10000,
//         });

//       const { latitude, longitude } = location.coords;

//       // 🔹 FIRST: try reverse geocode
//       try {
//         const result =
//           await Location.reverseGeocodeAsync({
//             latitude,
//             longitude,
//           });

//         if (result.length > 0) {
//           const place = result[0];

//           setAddressValue(
//             `${place.city || ''} ${place.region || ''} ${place.street || ''
//               }`.trim()
//           );
//           return;
//         }
//       } catch (e) {
//         console.log('Reverse geocode failed, fallback used');
//       }

//       // 🔹 FALLBACK
//       setAddressValue(
//         `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`
//       );
//     } catch (error) {
//       console.log(error);
//       alert('Unable to get location');
//     }
//     finally {
//       setLocating(false);
//     }
//   };


//   return (
//     <SafeView>
//       <KeyboardAwareScrollView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={{ flex: 1 }}
//       >
//         <ScrollView
//           style={{ flex: 1, backgroundColor: '#F1F5F9' }}
//           contentContainerStyle={{ padding: 16 }}
//         >
//           {/* Header */}
//           <Text
//             style={{
//               fontSize: 24,
//               fontWeight: '800',
//               color: BRAND.dark,
//               marginBottom: 24,
//             }}
//           >
//             اعدادات الحساب
//           </Text>

//           {/* NAME */}
//           <Section title="اسم المستخدم">
//             <Input
//               value={name}
//               onChangeText={setName}
//               placeholder="Full Name"
//             />
//             <Button
//               title="Update Name"
//               onPress={() => save('name')}
//             />
//           </Section>

//           {/* PHONE */}
//           <Section title="رقم الهاتف المحمول">
//             <Input
//               value={phone}
//               onChangeText={setPhone}
//               placeholder="e.g. +970 59X XXX XXX"
//               keyboardType="phone-pad"
//             />
//             <Button
//               title="Save Phone Number"
//               onPress={() => save('phone')}
//               color={BRAND.secondary}
//             />
//           </Section>

//           {/* PASSWORD */}
//           <Section BRAND={BRAND} title="تغيير كلمة المرور">
//             <Input
//               value={currentPassword}
//               onChangeText={setCurrentPassword}
//               placeholder="Current Password"
//               secureTextEntry
//             />
//             <Input
//               value={newPassword}
//               onChangeText={setNewPassword}
//               placeholder="New Password"
//               secureTextEntry
//             />
//             <Button
//               title="Change Password"
//               onPress={() => save('password')}
//               color={BRAND.danger}
//             />
//           </Section>


//           <KeyboardAvoidingView>
//             <Section title="عناوين التوصيل">
//               {/* Existing addresses */}
//               {addresses.map((address) => (
//                 <Pressable
//                   key={address.id}
//                   onPress={() => selectDeliveryAddress(address.id)}
//                   style={{
//                     padding: 14,
//                     borderRadius: 16,
//                     borderWidth: 2,
//                     borderColor: address.selected
//                       ? BRAND.primary
//                       : '#E5E7EB',
//                     backgroundColor: address.selected
//                       ? '#ECFDF5'
//                       : '#fff',
//                     marginBottom: 12,
//                   }}
//                 >
//                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Ionicons
//                       name={
//                         address.name === 'Home'
//                           ? 'home-outline'
//                           : address.name === 'Work'
//                             ? 'briefcase-outline'
//                             : 'location-outline'
//                       }
//                       size={22}
//                       color={BRAND.primary}
//                     />

//                     <View style={{ marginLeft: 12, flex: 1 }}>
//                       <Text style={{ fontWeight: '700', color: BRAND.dark }}>
//                          {address.name}
//                       </Text>
//                       <Text style={{ fontSize: 13, color: BRAND.muted }}>
//                         {address.city} {address.address}
//                       </Text>
//                     </View>

//                     {address.selected && (
//                       <Ionicons
//                         name="checkmark-circle"
//                         size={22}
//                         color={BRAND.primary}
//                       />
//                     )}
//                   </View>
//                 </Pressable>
//               ))}

//               {/* {addresses.map((item) => (
//   <Pressable
//     key={item.id}
//     onPress={() => selectMainAddress(item.id)}
//     style={{
//       padding: 14,
//       borderRadius: 16,
//       borderWidth: 2,
//       borderColor: item.isMain ? BRAND.primary : "#E5E7EB",
//       backgroundColor: item.isMain ? "#ECFDF5" : "#fff",
//       marginBottom: 12,
//     }}
//   >
//     <View style={{ flexDirection: "row", alignItems: "center" }}>
//       <Ionicons
//         name={
//           item.name === "Home"
//             ? "home-outline"
//             : item.name === "Work"
//             ? "briefcase-outline"
//             : "location-outline"
//         }
//         size={22}
//         color={BRAND.primary}
//       />

//       <View style={{ marginLeft: 12, flex: 1 }}>
//         <Text style={{ fontWeight: "700" }}>{item.name}</Text>
//         <Text style={{ fontSize: 13, color: BRAND.muted }}>
//           {item.address}
//         </Text>
//       </View>

//       {item.isMain && (
//         <Ionicons
//           name="checkmark-circle"
//           size={22}
//           color={BRAND.primary}
//         />
//       )}
//     </View>

//     <Pressable
//       onPress={() => deleteAddress(item.id)}
//       style={{ marginTop: 8, alignSelf: "flex-end" }}
//     >
//       <Ionicons
//         name="trash-outline"
//         size={18}
//         color={BRAND.danger}
//       />
//     </Pressable>
//   </Pressable>
// ))} */}


//               {/* Add new */}
//               {!showForm && (
//                 <Pressable
//                   onPress={() => setShowForm(true)}
//                   style={{
//                     paddingVertical: 14,
//                     borderRadius: 16,
//                     borderWidth: 1,
//                     borderStyle: 'dashed',
//                     borderColor: BRAND.primary,
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: BRAND.primary,
//                       fontWeight: '700',
//                     }}
//                   >
//                     + Add New Address
//                   </Text>
//                 </Pressable>
//               )}

//               {/* FORM */}
//               {showForm && (
//                 <View style={{ marginTop: 16 }}>
//                   {/* Type selector */}
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       gap: 10,
//                       marginBottom: 12,
//                     }}
//                   >
//                     <AddressTypeButton label="Home" icon="home-outline" BRAND={BRAND} addressType={addressType} setAddressType={setAddressType} />
//                     <AddressTypeButton label="Work" icon="briefcase-outline" BRAND={BRAND} addressType={addressType} setAddressType={setAddressType} />
//                     <AddressTypeButton label="Other" icon="location-outline" BRAND={BRAND} addressType={addressType} setAddressType={setAddressType} />
//                   </View>

//                   <Input
//                     placeholder="Enter city"
//                     value={city}
//                     onChangeText={setCity}
//                     // multiline
//                     style={{ height: 80 }}
//                   />

//                   <Input
//                     placeholder="Enter full address"
//                     value={addressValue}
//                     onChangeText={setAddressValue}
//                     multiline
//                     style={{ height: 80 }}
//                   />

//                   <Button title="Save Address" onPress={addAddress} />

//                   <TouchableOpacity disabled={locating}
//                     onPress={getCurrentLocation}
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       paddingVertical: 12,
//                       borderRadius: 14,
//                       borderWidth: 1,
//                       borderColor: BRAND.secondary,
//                       marginTop: 5,
//                       marginBottom: 5,
//                     }}
//                   >
//                     <Ionicons
//                       name="locate-outline"
//                       size={20}
//                       color={BRAND.secondary}
//                     />
//                     <Text
//                       style={{
//                         marginLeft: 6,
//                         color: BRAND.secondary,
//                         fontWeight: '700',
//                       }}
//                     >
//                       {locating ? 'Locating...' : 'Use current location'}
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => setShowForm(false)}
//                     style={{ marginTop: 10, alignItems: 'center' }}
//                   >
//                     <Text style={{ color: BRAND.muted }}>Cancel</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </Section>
//           </KeyboardAvoidingView>






        
//         </ScrollView>
//       </KeyboardAwareScrollView>

//     </SafeView>
//   );
// }











import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Location from "expo-location";

import SafeView from "@/components/SafeView";
import Section from "@/components/settings/Section";
import AddressTypeButton from "@/components/AddressTypeButton";

import { useUserStore } from "@/store/user.store";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";

const BRAND = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
  muted: "#9CA3AF",
  danger: "#EF4444",
};

const Input = (props: any) => (
  <TextInput
    placeholderTextColor={BRAND.muted}
    {...props}
    style={[
      {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: BRAND.dark,
        marginBottom: 12,
        backgroundColor: "#fff",
      },
      props.style,
    ]}
  />
);

const Button = ({ title, onPress, color }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: color || BRAND.primary,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      marginTop: 6,
    }}
  >
    <Text style={{ color: "#fff", fontWeight: "700" }}>{title}</Text>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const user = useUserStore((s) => s.user);
  const userId = user?.id;

  /** Profile */
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");

  /** Password */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  /** Addresses */
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [addressType, setAddressType] = useState("Home");
  const [city, setCity] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  /* ================== LOAD ADDRESSES ================== */
  const loadAddresses = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const res = await api.get("/addresses", {
        params: { user_id: userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddresses(res.data.address?.data || []);
    } catch (e) {
      console.log("Load addresses error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  /* ================== CREATE ADDRESS ================== */
  const createAddress = async () => {
    if (!addressValue.trim() || !city.trim()) return;

    try {
      const token = await getToken();

      await api.post(
        "/addresses",
        {
          name: addressType,
          address: addressValue,
          city,
          isMain: addresses.length === 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAddressValue("");
      setCity("");
      setAddressType("Home");
      setShowForm(false);
      loadAddresses();
    } catch (e) {
      console.log("Create address error:", e);
    }
  };


const setMainAddress = async (selectedId: number) => {
  try {
    const token = await getToken();

    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isMain: address.id === selectedId,
      }))
    );

    await Promise.all(
      addresses.map((address) =>
        api.put(
          `/addresses/${address.id}`,
          {
            ...address,
            isMain: address.id === selectedId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      )
    );

    // reload to sync UI with backend
    loadAddresses();
  } catch (error) {
    console.log("Failed to update main address:", error);
  }
};



  /* ================== DELETE ================== */
  const deleteAddress = async (id: number) => {
    try {
      const token = await getToken();

      await api.delete(`/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.log("Delete error:", e);
    }
  };

  /* ================== LOCATION ================== */
  const getCurrentLocation = async () => {
    try {
      setLocating(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Location permission denied");
        return;
      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      const { latitude, longitude } = location.coords;

      try {
        const result =
          await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });

        if (result.length) {
          const place = result[0];
          setAddressValue(
            `${place.city || ""} ${place.street || ""}`.trim()
          );
          return;
        }
      } catch {}

      setAddressValue(
        `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`
      );
    } catch {
      alert("Unable to get location");
    } finally {
      setLocating(false);
    }
  };

  return (
    <SafeView>
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: "#F1F5F9" }}
          contentContainerStyle={{ padding: 16 }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              color: BRAND.dark,
              marginBottom: 24,
            }}
          >
            إعدادات الحساب
          </Text>

          {/* NAME */}
          <Section title="اسم المستخدم">
            <Input value={name} onChangeText={setName} />
            <Button title="Update Name" onPress={() => {}} />
          </Section>

          {/* PHONE */}
          <Section title="رقم الهاتف">
            <Input
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Button
              title="Save Phone"
              color={BRAND.secondary}
              onPress={() => {}}
            />
          </Section>

          {/* PASSWORD */}
          <Section title="تغيير كلمة المرور">
            <Input
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <Input
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Button
              title="Change Password"
              color={BRAND.danger}
              onPress={() => {}}
            />
          </Section>

          {/* ADDRESSES */}
          <Section title="عناوين التوصيل">
            {addresses.map((a) => (
              <Pressable
                key={a.id}
                onPress={() => setMainAddress(a.id)}
                style={{
                  padding: 14,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: a.isMain
                    ? BRAND.primary
                    : "#E5E7EB",
                  backgroundColor: a.isMain
                    ? "#ECFDF5"
                    : "#fff",
                  marginBottom: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>
                    <Ionicons
                    name={
                      a.name === "Home"
                        ? "home-outline"
                        : a.name === "Work"
                        ? "briefcase-outline"
                        : "location-outline"
                    }
                    size={22}
                    color={BRAND.primary}
                  />
                  </Text>

                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ fontWeight: "700" }}>{a.name}</Text>
                    <Text style={{ color: BRAND.muted, fontSize: 13 }}>
                      {a.city} - {a.address}
                    </Text>
                  </View>

                  {a.isMain && (
                    <Text><Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={BRAND.primary}
                    /></Text>
                  )}
                </View>

                <Pressable
                  onPress={() => deleteAddress(a.id)}
                  style={{ marginTop: 8, alignSelf: "flex-end" }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={BRAND.danger}
                  />
                </Pressable>
              </Pressable>
            ))}

            {!showForm && (
              <Pressable
                onPress={() => setShowForm(true)}
                style={{
                  paddingVertical: 14,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: BRAND.primary,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: BRAND.primary, fontWeight: "700" }}>
                  + Add New Address
                </Text>
              </Pressable>
            )}

            {showForm && (
              <View style={{ marginTop: 16 }}>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 8, }}>
                  <AddressTypeButton
                    label="Home"
                    icon="home-outline"
                    BRAND={BRAND}
                    addressType={addressType}
                    setAddressType={setAddressType}
                  />
                  <AddressTypeButton
                    label="Work"
                    icon="briefcase-outline"
                    BRAND={BRAND}
                    addressType={addressType}
                    setAddressType={setAddressType}
                  />
                  <AddressTypeButton
                    label="Other"
                    icon="location-outline"
                    BRAND={BRAND}
                    addressType={addressType}
                    setAddressType={setAddressType}
                  />
                </View>

                <Input
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                />
                <Input
                  placeholder="Full address"
                  multiline
                  value={addressValue}
                  onChangeText={setAddressValue}
                  style={{ height: 80 }}
                />

                <Button title="Save Address" onPress={createAddress} />

                <TouchableOpacity
                  onPress={getCurrentLocation}
                  disabled={locating}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 12,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: BRAND.secondary,
                    marginTop: 8,
                  }}
                >
                  <Ionicons
                    name="locate-outline"
                    size={20}
                    color={BRAND.secondary}
                  />
                  <Text
                    style={{
                      marginLeft: 6,
                      color: BRAND.secondary,
                      fontWeight: "700",
                    }}
                  >
                    {locating ? "Locating..." : "Use current location"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowForm(false)}
                  style={{ marginTop: 10, alignItems: "center" }}
                >
                  <Text style={{ color: BRAND.muted }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </Section>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeView>
  );
}
