import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'; // Assuming expo-router is used for navigation

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
  lightGray: "#F3F4F6", // A lighter gray for backgrounds
};

// Mock data for the user's account details
const MOCK_ACCOUNT_DATA = {
  accountHolder: 'Z-ton User',
  accountNumber: '0123456789',
  accountType: 'Savings Account',
  bankName: 'Z-ton X-L Bank',
  branch: 'Main Branch, City',
  accountBalance: '1,234,567.89', // Example balance
  currency: 'USD',
  bvn: '221133445566', // Bank Verification Number
  dateOpened: 'January 15, 2020',
  status: 'Active',
};

const AccountDetailsScreen = () => {
  const [showBVN, setShowBVN] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Account Holder Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account Holder</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{MOCK_ACCOUNT_DATA.accountHolder}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={styles.detailValueStatus}>{MOCK_ACCOUNT_DATA.status}</Text>
          </View>
        </View>

        {/* Account Summary */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account Summary</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Current Balance</Text>
            <Text style={styles.detailValue}>{MOCK_ACCOUNT_DATA.currency} {MOCK_ACCOUNT_DATA.accountBalance}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Type</Text>
            <Text style={styles.detailValue}>{MOCK_ACCOUNT_DATA.accountType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date Opened</Text>
            <Text style={styles.detailValue}>{MOCK_ACCOUNT_DATA.dateOpened}</Text>
          </View>
        </View>

        {/* Bank & Account Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Bank & Account Info</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Bank Name</Text>
            <Text style={styles.detailValue}>{MOCK_ACCOUNT_DATA.bankName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account Number</Text>
            <Text style={styles.detailValue}>{MOCK_ACCOUNT_DATA.accountNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Branch</Text>
            <Text style={styles.detailValue}>{MOCK_ACCOUNT_DATA.branch}</Text>
          </View>
        </View>

        {/* Security Information */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Security Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>BVN</Text>
            <TouchableOpacity onPress={() => setShowBVN(!showBVN)} style={styles.bvnToggle}>
              <Text style={styles.detailValue}>{showBVN ? MOCK_ACCOUNT_DATA.bvn : '************'}</Text>
              <Ionicons 
                name={showBVN ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color={COLORS.gray} 
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
          {/* Add more security details if needed, e.g., Last Password Change */}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  scrollContent: {
    padding: 20,
  },
  sectionCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  detailLabel: {
    fontSize: 15,
    color: COLORS.gray,
    flex: 1,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.black,
    flex: 2,
    textAlign: 'right',
  },
  detailValueStatus: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gold, // Highlight active status
    flex: 2,
    textAlign: 'right',
  },
  bvnToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'flex-end',
  },
});
