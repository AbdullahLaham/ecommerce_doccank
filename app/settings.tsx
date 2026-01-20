import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SafeView from '@/components/SafeView';

const BRAND = {
  primary: "#7CC7A4",
  secondary: "#6FB7D6",
  accent: "#F6A64D",
  dark: "#1F2937",
  light: "#F8FAFC",
  muted: "#9CA3AF",
  danger: "#EF4444",
};



const Section = ({ title, children }) => (
  <View style={{ marginBottom: 28 }}>
    <Text
      style={{
        fontSize: 16,
        fontWeight: '700',
        color: BRAND.dark,
        marginBottom: 10,
      }}
    >
      {title}
    </Text>

    <View
      style={{
        backgroundColor: BRAND.light,
        borderRadius: 18,
        padding: 16,
        elevation: 4,
      }}
    >
      {children}
    </View>
  </View>
);

const Input = (props) => (
  <TextInput
    placeholderTextColor={BRAND.muted}
    {...props}
    style={[
      {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: BRAND.dark,
        marginBottom: 12,
      },
      props.style,
    ]}
  />
);

const Button = ({ title, onPress, color }) => (
  <Pressable
    onPress={onPress}
    style={{
      backgroundColor: color || BRAND.primary,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: 'center',
      marginTop: 6,
    }}
  >
    <Text style={{ color: '#fff', fontWeight: '700' }}>
      {title}
    </Text>
  </Pressable>
);

export default function SettingsScreen() {
  // Profile
  const [name, setName] = useState('Abdullah Allahham');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [addresses, setAddresses] = useState<any>([]);
const [showForm, setShowForm] = useState(false);

const [addressType, setAddressType] = useState('Home');
const [addressValue, setAddressValue] = useState('');

const addAddress = () => {
  if (!addressValue.trim()) return;

  setAddresses((prev: any) => [
    ...prev,
    {
      id: Date.now().toString(),
      type: addressType,
      value: addressValue,
      selected: prev.length === 0, // first one default
    },
  ]);

  setAddressValue('');
  setAddressType('Home');
  setShowForm(false);
};

const selectDeliveryAddress = (id) => {
  setAddresses((prev) =>
    prev.map((a) => ({
      ...a,
      selected: a.id === id,
    }))
  );
};




const AddressTypeButton = ({ label, icon }) => (
  <Pressable
    onPress={() => setAddressType(label)}
    style={{
      flex: 1,
      paddingVertical: 12,
      borderRadius: 14,
      borderWidth: 2,
      borderColor:
        addressType === label ? BRAND.primary : '#E5E7EB',
      backgroundColor:
        addressType === label ? '#ECFDF5' : '#fff',
      alignItems: 'center',
    }}
  >
    <Ionicons
      name={icon}
      size={20}
      color={
        addressType === label
          ? BRAND.primary
          : BRAND.muted
      }
    />
    <Text
      style={{
        marginTop: 4,
        fontWeight: '600',
        color: BRAND.dark,
      }}
    >
      {label}
    </Text>
  </Pressable>
);






  // Fake API handler
  const save = (label) => {
    console.log(`Saving ${label}`);
  };

  return (
    <SafeView>
      <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: '#F1F5F9' }}
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Header */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: '800',
            color: BRAND.dark,
            marginBottom: 24,
          }}
        >
          اعدادات الحساب
        </Text>

        {/* NAME */}
        <Section title="اسم المستخدم">
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
          />
          <Button
            title="Update Name"
            onPress={() => save('name')}
          />
        </Section>

        {/* PHONE */}
        <Section title="رقم الهاتف المحمول">
          <Input
            value={phone}
            onChangeText={setPhone}
            placeholder="e.g. +970 59X XXX XXX"
            keyboardType="phone-pad"
          />
          <Button
            title="Save Phone Number"
            onPress={() => save('phone')}
            color={BRAND.secondary}
          />
        </Section>

        {/* ADDRESS */}
        <Section title="العنوان">
          <Input
            value={address}
            onChangeText={setAddress}
            placeholder="Delivery Address"
            multiline
            style={{ height: 90, textAlignVertical: 'top' }}
          />
          <Button
            title="Save Address"
            onPress={() => save('address')}
            color={BRAND.accent}
          />
        </Section>

        {/* PASSWORD */}
        <Section title="تغيير كلمة المرور">
          <Input
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current Password"
            secureTextEntry
          />
          <Input
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            secureTextEntry
          />
          <Button
            title="Change Password"
            onPress={() => save('password')}
            color={BRAND.danger}
          />
        </Section>


<Section title="عناوين التوصيل">
  {/* Existing addresses */}
  {addresses.map((address) => (
    <Pressable
      key={address.id}
      onPress={() => selectDeliveryAddress(address.id)}
      style={{
        padding: 14,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: address.selected
          ? BRAND.primary
          : '#E5E7EB',
        backgroundColor: address.selected
          ? '#ECFDF5'
          : '#fff',
        marginBottom: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          name={
            address.type === 'Home'
              ? 'home-outline'
              : address.type === 'Work'
              ? 'briefcase-outline'
              : 'location-outline'
          }
          size={22}
          color={BRAND.primary}
        />

        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontWeight: '700', color: BRAND.dark }}>
            {address.type}
          </Text>
          <Text style={{ fontSize: 13, color: BRAND.muted }}>
            {address.value}
          </Text>
        </View>

        {address.selected && (
          <Ionicons
            name="checkmark-circle"
            size={22}
            color={BRAND.primary}
          />
        )}
      </View>
    </Pressable>
  ))}

  {/* Add new */}
  {!showForm && (
    <Pressable
      onPress={() => setShowForm(true)}
      style={{
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: BRAND.primary,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: BRAND.primary,
          fontWeight: '700',
        }}
      >
        + Add New Address
      </Text>
    </Pressable>
  )}

  {/* FORM */}
  {showForm && (
    <View style={{ marginTop: 16 }}>
      {/* Type selector */}
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginBottom: 12,
        }}
      >
        <AddressTypeButton label="Home" icon="home-outline" />
        <AddressTypeButton label="Work" icon="briefcase-outline" />
        <AddressTypeButton label="Other" icon="location-outline" />
      </View>

      <Input
        placeholder="Enter full address"
        value={addressValue}
        onChangeText={setAddressValue}
        multiline
        style={{ height: 80 }}
      />

      <Button title="Save Address" onPress={addAddress} />

      <Pressable
        onPress={() => setShowForm(false)}
        style={{ marginTop: 10, alignItems: 'center' }}
      >
        <Text style={{ color: BRAND.muted }}>Cancel</Text>
      </Pressable>
    </View>
  )}
</Section>



        {/* LOGOUT */}
        {/* <Pressable
          onPress={() => console.log('Logout')}
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={BRAND.danger}
          />
          <Text
            style={{
              marginLeft: 6,
              color: BRAND.danger,
              fontWeight: '600',
            }}
          >
            Logout
          </Text>
        </Pressable> */}
      </ScrollView>
    </KeyboardAwareScrollView>

    </SafeView>
  );
}
