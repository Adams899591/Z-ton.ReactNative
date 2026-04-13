import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
};

function CustomDrawerContent(props) {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop');

  const pickImage = async () => {
    Alert.alert(
      "Profile Picture",
      "Choose an option",
      [
        { text: "Camera", onPress: () => openPicker(true) },
        { text: "Gallery", onPress: () => openPicker(false) },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const openPicker = async (isCamera) => {
    const permission = isCamera 
      ? await ImagePicker.requestCameraPermissionsAsync() 
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "We need access to your photos to change your profile picture.");
      return;
    }

    const result = isCamera 
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 })
      : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: COLORS.white }}>
        {/* Header Profile Section */}
        <View style={styles.drawerHeader}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View style={styles.editIconContainer}>
              <Ionicons name="camera" size={16} color={COLORS.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>Z-ton User</Text>
          <Text style={styles.accountNumber}>Acc: 0123456789</Text>
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerItemsContainer}>
          
          {/* Automatically lists screens defined in the Drawer navigator */}
          {/* <DrawerItemList {...props} /> */}
          
          <View style={styles.divider} />
          <Text style={styles.sectionLabel}>CARD BANK SERVICES</Text>
          
          <DrawerItem
            label="My Cards"
            icon={({ size }) => <Ionicons name="card-outline" size={size} color={COLORS.gold} />}
            onPress={() => router.push('/(drawer)/cards')}
            labelStyle={styles.drawerLabel}
          />
          <DrawerItem
            label="Virtual Cards"
            icon={({ size }) => <Ionicons name="phone-portrait-outline" size={size} color={COLORS.gold} />}
            onPress={() => {}}
            labelStyle={styles.drawerLabel}
          />
          <DrawerItem
            label="Profile & Security"
            icon={({ size }) => <Ionicons name="person-outline" size={size} color={COLORS.gold} />}
            onPress={() => router.push('/(drawer)/profile&security')}
            labelStyle={styles.drawerLabel}
          />
          <DrawerItem
            label="Card Settings"
            icon={({ size }) => <Ionicons name="settings-outline" size={size} color={COLORS.gold} />}
            onPress={() => {}}
            labelStyle={styles.drawerLabel}
          />
        </View>
      </DrawerContentScrollView>

      {/* Bottom Logout */}
      <View style={styles.footer}>
        <DrawerItem
          label="Logout"
          icon={({ size }) => <Ionicons name="log-out-outline" size={size} color="#FF3B30" />}
          onPress={() => router.replace('/')}
          labelStyle={{ color: '#FF3B30', fontWeight: 'bold' }}
        />
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: COLORS.darkGray },
        headerTintColor: COLORS.white,
        headerRight: () => (
          <TouchableOpacity 
            style={{ marginRight: 20, position: 'relative' }} 
            onPress={() => router.push('/pages/views/global-notification')}
          >
            <Ionicons name="notifications-outline" size={26} color={COLORS.white} />
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        ),
        drawerActiveBackgroundColor: COLORS.gold + '15', // Subtle gold background for active item
        drawerActiveTintColor: COLORS.gold,
        drawerInactiveTintColor: COLORS.black,
      }}
    >
      {/* This screen points to your existing (tabs) group */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Z-ton Bank',
          drawerIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
        }}
      />
      {/* Hidden from the main list if you want it only in the custom section, 
          but we'll keep it here for direct access if needed */}
      <Drawer.Screen
        name="cards"
        options={{
          drawerLabel: 'Card Management',
          title: 'My Cards',
          drawerIcon: ({ color, size }) => <Ionicons name="card-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: { paddingVertical: 30, paddingHorizontal: 20, backgroundColor: COLORS.darkGray, alignItems: 'center', marginBottom: 10 },
  profileImageContainer: { marginBottom: 12, position: 'relative' },
  profileImage: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: COLORS.gold },
  editIconContainer: { position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.gold, borderRadius: 15, width: 28, height: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.darkGray },
  userName: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  accountNumber: { color: COLORS.gray, fontSize: 14 },
  drawerItemsContainer: { flex: 1 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 15, marginHorizontal: 20 },
  sectionLabel: { fontSize: 12, color: COLORS.gray, marginLeft: 20, marginBottom: 10, fontWeight: 'bold' },
  drawerLabel: { fontSize: 15 },
  footer: { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingBottom: 20 },
  headerBadge: {
    position: 'absolute',
    right: -4,
    top: -2,
    backgroundColor: '#FF3B30',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.darkGray,
  },
  headerBadgeText: { color: COLORS.white, fontSize: 10, fontWeight: 'bold' },
});
