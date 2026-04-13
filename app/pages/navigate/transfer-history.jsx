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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
  lightGray: "#F3F4F6",
  red: "#FF3B30",
  green: "#34C759",
};

// Sample data for transactions
const TRANSACTIONS = [
  {
    id: '1',
    type: 'debit',
    title: 'Transfer to Usman Adams',
    amount: '-$200.00',
    date: '10 Apr 2026',
    time: '02:30 PM',
    category: 'Transfer',
  },
  {
    id: '2',
    type: 'credit',
    title: 'Salary Deposit',
    amount: '+$3,500.00',
    date: '05 Apr 2026',
    time: '09:00 AM',
    category: 'Deposit',
  },
  {
    id: '3',
    type: 'debit',
    title: 'Electricity Bill',
    amount: '-$45.20',
    date: '03 Apr 2026',
    time: '11:15 AM',
    category: 'Bills',
  },
  {
    id: '4',
    type: 'debit',
    title: 'MTN Airtime Top-up',
    amount: '-$10.00',
    date: '01 Apr 2026',
    time: '08:45 PM',
    category: 'Airtime',
  },
  {
    id: '5',
    type: 'credit',
    title: 'Refund from Amazon',
    amount: '+$25.50',
    date: '28 Mar 2026',
    time: '04:20 PM',
    category: 'Refund',
  },
];

const TransferHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(TRANSACTIONS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or data reload
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleDelete = (id) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  const renderRightActions = (id) => (
    <TouchableOpacity 
      style={styles.deleteAction} 
      onPress={() => handleDelete(id)}
    >
      <Ionicons name="trash-outline" size={24} color={COLORS.white} />
    </TouchableOpacity>
  );

   // this function renders each transaction item with swipeable delete action
  const renderItem = ({ item }) => {
    const isDebit = item.type === 'debit';

    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item.id)}
        friction={2}
        rightThreshold={40}
      >
        <TouchableOpacity style={styles.transactionItem} activeOpacity={0.7}>
        <View style={[styles.iconContainer, { backgroundColor: isDebit ? COLORS.red + '15' : COLORS.green + '15' }]}>
          <Ionicons
            name={isDebit ? "arrow-up-outline" : "arrow-down-outline"}
            size={22}
            color={isDebit ? COLORS.red : COLORS.green}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionSubtitle}>{item.date} • {item.time}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amountText, { color: isDebit ? COLORS.red : COLORS.green }]}>
            {item.amount}
          </Text>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </TouchableOpacity>
      </Swipeable>
    );
  };

  const filteredTransactions = data.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        
        {/* Professional Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={COLORS.gold} />
        </TouchableOpacity>
      </View>
 
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions found.</Text>
          </View>
        }
      />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default TransferHistory;

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
  filterButton: { padding: 5 },
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
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white 
  },
  iconContainer: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  detailsContainer: { flex: 1 },
  transactionTitle: { fontSize: 15, fontWeight: '600', color: COLORS.black, marginBottom: 4 },
  transactionSubtitle: { fontSize: 12, color: COLORS.gray },
  amountContainer: { alignItems: 'flex-end' },
  amountText: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  categoryText: { fontSize: 10, color: COLORS.gray, textTransform: 'uppercase', letterSpacing: 0.5 },
  emptyContainer: { marginTop: 50, alignItems: 'center' },
  emptyText: { color: COLORS.gray, fontSize: 16 },
  deleteAction: {
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});