import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Switch, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
};
const billCategories = [
  { id: 'electricity', name: 'Electricity', icon: 'flash-outline' },
  { id: 'water', name: 'Water', icon: 'water-outline' },
  { id: 'internet', name: 'Internet', icon: 'wifi-outline' },
  { id: 'cable', name: 'Cable TV', icon: 'tv-outline' },
  { id: 'education', name: 'Education', icon: 'school-outline' },
  { id: 'government', name: 'Govt. Payments', icon: 'business-outline' },
];

const BillsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [biller, setBiller] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Account Selection */}
        <Text style={styles.label}>Select Account</Text>
        <TouchableOpacity style={styles.accountBox}>
          <View>
            <Text style={styles.accountNumber}>0123456789</Text>
            <Text style={styles.accountBalance}>Balance: $1,234.56</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
        </TouchableOpacity>

        {/* Bill Categories Selection */}
        <Text style={styles.sectionTitle}>Select Bill Category</Text>
        <View style={styles.categoryGrid}>
          {billCategories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[
                styles.categoryButton, 
                selectedCategory === category.id && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={28} 
                color={selectedCategory === category.id ? COLORS.white : COLORS.gold} 
              />
              <Text 
                style={[
                  styles.categoryText, 
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input Fields */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Biller / Service Provider</Text>
          <TextInput 
            style={styles.input}
            placeholder="e.g., Electricity Company, Water Board"
            placeholderTextColor={COLORS.gray}
            value={biller}
            onChangeText={setBiller}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Customer ID / Account Number</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter customer ID or account number"
            placeholderTextColor={COLORS.gray}
            value={customerId}
            onChangeText={setCustomerId}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Amount"
            placeholderTextColor={COLORS.gray}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Transaction Description (Optional)</Text>
          <TextInput 
            style={styles.input}
            placeholder="Add a note for this bill"
            placeholderTextColor={COLORS.gray}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Schedule Toggle */}
        <View style={styles.scheduleRow}>
          <View>
            <Text style={styles.scheduleTitle}>Schedule Bill Payment</Text>
            <Text style={styles.scheduleSubtitle}>Set a recurring or future payment for this bill</Text>
          </View>
          <Switch 
            value={isScheduled}
            onValueChange={setIsScheduled}
            trackColor={{ false: COLORS.gray, true: COLORS.gold }}
            thumbColor={COLORS.white}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fingerprintButton}>
            <Ionicons name="finger-print" size={40} color={COLORS.gold} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default BillsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 20, paddingBottom: 30 },
  label: { fontSize: 14, color: COLORS.gray, marginBottom: 8, fontWeight: '500' },
  accountBox: {
    backgroundColor: '#F9FAFB', // Using a light gray similar to other screens
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 1,
  },
  accountNumber: { fontSize: 18, fontWeight: 'bold', color: COLORS.black },
  accountBalance: { fontSize: 12, color: COLORS.gray },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginBottom: 15 },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  categoryButton: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 15,
    width: '30%', // Adjusted for 3 columns with spacing
    marginBottom: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.darkGray,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
  inputGroup: { marginBottom: 20 },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.black,
    elevation: 1,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 1,
  },
  scheduleTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.black },
  scheduleSubtitle: { fontSize: 12, color: COLORS.gray },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  continueButton: {
    backgroundColor: COLORS.black,
    flex: 1,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 15,
  },
  continueButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  fingerprintButton: { padding: 5 },
});
