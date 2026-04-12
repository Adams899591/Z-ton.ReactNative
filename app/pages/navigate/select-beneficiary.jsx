import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
  lightGray: "#F3F4F6",
};

// Sample data for saved beneficiaries
const SAVED_TRANSFERS = [
  { id: '1', name: 'Usman Adams', bank: 'Z-ton Bank', account: '0123456789', type: 'Z-ton Bank' },
  { id: '2', name: 'Grace Ojo', bank: 'Zenith Bank', account: '2098765432', type: 'Other Bank' },
  { id: '3', name: 'Savings Account', bank: 'Z-ton Bank', account: '0011223344', type: 'Own Accounts' },
  { id: '4', name: 'Babatunde John', bank: 'Access Bank', account: '0142356789', type: 'Other Bank' },
];

const SelectBeneficiary = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetails = (item) => {
    Alert.alert(
      "Beneficiary Details",
      `Name: ${item.name}\nBank: ${item.bank}\nAccount: ${item.account}\nCategory: ${item.type}`,
      [
        { text: "Dismiss", style: "cancel" },
        { text: "Transfer Now", onPress: () => router.back() }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={28} color={COLORS.gold} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.transactionTitle}>{item.name}</Text>
        <Text style={styles.transactionSubtitle}>{item.bank} • {item.account}</Text>
      </View>
      <TouchableOpacity 
        style={styles.viewButton} 
        onPress={() => handleViewDetails(item)}
      >
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredData = SAVED_TRANSFERS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.account.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Professional Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Beneficiary</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search beneficiaries..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Beneficiary List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={60} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No saved beneficiaries found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default SelectBeneficiary;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.black },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.black },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  transactionItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.lightGray 
  },
  iconContainer: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    backgroundColor: COLORS.gold + '15',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  detailsContainer: { flex: 1 },
  transactionTitle: { fontSize: 15, fontWeight: '600', color: COLORS.black, marginBottom: 4 },
  transactionSubtitle: { fontSize: 12, color: COLORS.gray },
  viewButton: {
    backgroundColor: COLORS.black,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewButtonText: { color: COLORS.white, fontSize: 12, fontWeight: 'bold' },
  emptyContainer: { marginTop: 80, alignItems: 'center' },
  emptyText: { color: COLORS.gray, fontSize: 16, marginTop: 10 },
});