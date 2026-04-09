import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
};

const BillsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bills</Text>
        {/* Placeholder for right-aligned elements if any */}
        <View style={{ width: 28 }} /> 
      </View>

      {/* Bills Content */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Your Bills will appear here.</Text>
        <Text style={styles.contentText}>You can add categories like Electricity, Water, Internet, etc.</Text>
        {/* Further UI elements for bill management can go here */}
      </View>
    </SafeAreaView>
  );
};

export default BillsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Or a light background for the main content
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10, // Adjust as needed for status bar spacing
    height: 60, // Fixed height for the header
    backgroundColor: COLORS.darkGray, // Consistent with login header
  },
  menuButton: {
    padding: 5,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 10,
  },
});