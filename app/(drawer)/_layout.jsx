import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
};

function CustomDrawerContent(props) {

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: COLORS.white }}>
        {/* Header Profile Section */}
        <View style={styles.drawerHeader}>
          <View style={styles.profileImageContainer}>
            <Ionicons name="person-circle" size={80} color={COLORS.gold} />
          </View>
          <Text style={styles.userName}>Z-ton User</Text>
          <Text style={styles.accountNumber}>Acc: 0123456789</Text>
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerItemsContainer}>
          {/* Automatically lists screens defined in the Drawer navigator */}
          <DrawerItemList {...props} />
          
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
// pls help me make this section profetion so it show an image from unples annd also design it in shuch a where is has a icon where clicking on it the user choses either camara or gallery and it shouls also be edicted before saving 
export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: COLORS.darkGray },
        headerTintColor: COLORS.white,
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
  drawerHeader: { padding: 20, backgroundColor: COLORS.darkGray, alignItems: 'center', marginBottom: 10 },
  profileImageContainer: { marginBottom: 10 },
  userName: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  accountNumber: { color: COLORS.gray, fontSize: 14 },
  drawerItemsContainer: { flex: 1 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 15, marginHorizontal: 20 },
  sectionLabel: { fontSize: 12, color: COLORS.gray, marginLeft: 20, marginBottom: 10, fontWeight: 'bold' },
  drawerLabel: { fontSize: 15 },
  footer: { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingBottom: 20 },
});










