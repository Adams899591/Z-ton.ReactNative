import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Switch, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'; // Assuming expo-router is used for navigation

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
};

const OverviewScreen = () => {
  const [showBalance, setShowBalance] = useState(false); // Changed to false by default for privacy

  const toggleShowBalance = () => setShowBalance(previousState => !previousState);

  // Placeholder for navigation to history
  const navigateToHistory = () => {
    // Implement navigation to history screen
    console.log('Navigate to History');
    // router.push('/(drawer)/history'); // Example if a history route exists
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Total Balance Section */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>
              {showBalance ? '$1,234.56' : '********'}
            </Text>
            <TouchableOpacity onPress={toggleShowBalance}>
              <Ionicons name={showBalance ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.gold} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Information */}
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountInfoLabel}>Account Number</Text>
          <Text style={styles.accountInfoValue}>0123456789</Text>
          <Text style={styles.accountInfoStatus}>Status: Active</Text>
        </View>

        {/* User Name Section */}
        <View style={styles.divider} />
        <Text style={styles.userName}>Usman Adams</Text> 
        <Text style={styles.lastLogin}>Last Login: 2026-04-09 10:30 AM</Text> 
        <View style={styles.divider} />

        {/* Easy Links Section */}
        <Text style={styles.sectionTitle}>Easy Links</Text>
        <View style={styles.easyLinksGrid}>
          <TouchableOpacity style={styles.easyLinkButton}>
            <Ionicons name="wallet-outline" size={24} color={COLORS.gold} />
            <Text style={styles.easyLinkText}>Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.easyLinkButton}>
            <Ionicons name="swap-horizontal-outline" size={24} color={COLORS.gold} />
            <Text style={styles.easyLinkText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.easyLinkButton}>
            <Ionicons name="tv-outline" size={24} color={COLORS.gold} />
            <Text style={styles.easyLinkText}>Cable TV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.easyLinkButton}>
            <Ionicons name="card-outline" size={24} color={COLORS.gold} />
            <Text style={styles.easyLinkText}>Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.easyLinkButton}>
            <Ionicons name="finger-print-outline" size={24} color={COLORS.gold} />
            <Text style={styles.easyLinkText}>My BVN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.easyLinkButton}>
            <Ionicons name="settings-outline" size={24} color={COLORS.gold} />
            <Text style={styles.easyLinkText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.easyLinkButton}>
            <Ionicons name="help-circle-outline" size={24} color={COLORS.gold} />
            <Text style={styles.easyLinkText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.easyLinkButton}>
            <Ionicons name="document-text-outline" size={24} color={COLORS.gold} />
            <Text style={styles.easyLinkText}>Statements</Text>
          </TouchableOpacity>
        </View>

        {/* History Navigation */}
        <TouchableOpacity style={styles.historyButton} onPress={navigateToHistory}>
          <Text style={styles.historyButtonText}>View Transaction History</Text>
          <Ionicons name="arrow-forward-outline" size={20} color={COLORS.gold} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default OverviewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 60,
    backgroundColor: COLORS.darkGray,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  menuButton: {
    padding: 5,
  },
  bankNameHeader: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceCard: {
    // backgroundColor: '#F9FAFB',
    backgroundColor: COLORS.darkGray,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    marginTop: 10,
  },
  balanceLabel: {
    color: COLORS.gray,
    fontSize: 12,
    marginBottom: 5,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceAmount: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  switchLabel: {
    color: COLORS.white,
    marginRight: 8,
    fontSize: 12,
  },
  accountInfoContainer: {
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
  },
  accountInfoLabel: {
    color: COLORS.gray,
    fontSize: 12,
  },
  accountInfoValue: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  accountInfoStatus: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB', 
    marginVertical: 10,
    marginHorizontal: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 5,
  },
  lastLogin: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  easyLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  easyLinkButton: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 10,
    width: '23%', // Adjusted for 4 columns with spacing
    marginBottom: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  easyLinkText: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    elevation: 2,
  },
  historyButtonText: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: 'bold',
  },
});