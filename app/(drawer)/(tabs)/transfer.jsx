import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Switch, Modal, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
  lightGray: "#F3F4F6",
};

// Placeholder for bank data - in a real app, this would come from your Laravel backend API
const bankList = [
  { id: '1', name: 'Z-ton Bank' },
  { id: '2', name: 'Zenith Bank' },
  { id: '3', name: 'Access Bank' },
  { id: '4', name: 'Guaranty Trust Bank (GTB)' },
  { id: '5', name: 'First Bank of Nigeria' },
  { id: '6', name: 'United Bank for Africa (UBA)' },
  { id: '7', name: 'Fidelity Bank' },
  { id: '8', name: 'Union Bank of Nigeria' },
  { id: '9', name: 'Stanbic IBTC Bank' },
  { id: '10', name: 'Ecobank Nigeria' },
  { id: '11', name: 'Polaris Bank' },
  { id: '12', name: 'Wema Bank' },
];

const TransferScreen = () => {
  const [selectedMode, setSelectedMode] = useState('Z-ton Bank');
  const [showBankModal, setShowBankModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null); // Stores the selected bank object { id, name }
  const [isScheduled, setIsScheduled] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
                           
        {/* Top Action Row: History and Saved */}
        <View style={styles.topActionRow}>
          <TouchableOpacity style={styles.topActionButton} onPress={() => router.push("/pages/navigate/transfer-history")}>
            <Ionicons name="time-outline" size={20} color={COLORS.gold} />
            <Text style={styles.topActionText}>Transfer History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topActionButton}  onPress={() => router.push("/pages/navigate/saved-transfers")}>
            <Ionicons name="save-outline" size={20} color={COLORS.gold} />
            <Text style={styles.topActionText}>Saved Transfer</Text>
          </TouchableOpacity>
        </View>

        {/* Select Transfer Mode */}
        <Text style={styles.sectionLabel}>Select Transfer Mode</Text>
        <View style={styles.modeRow}>
          {['Own Accounts', 'Z-ton Bank', 'Other Bank'].map((mode) => (
            <TouchableOpacity 
              key={mode} 
              style={[
                styles.modeItem, 
                selectedMode === mode && styles.selectedModeItem
              ]}
              onPress={() => setSelectedMode(mode)}
            >
              <Text style={[
                styles.modeText, 
                selectedMode === mode && styles.selectedModeText
              ]}>
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input Fields */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Source Account</Text>
          <TouchableOpacity style={styles.pickerBox}>
            <Text style={styles.pickerText}>0123456789 ($1,234.56)</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        {/* Select Bank (Conditional for 'Other Bank' mode) */}
        <View style={styles.inputGroup} >
          <Text style={styles.label}>Select Bank</Text>
          <TouchableOpacity 
            style={styles.pickerBox} 
            onPress={() => setShowBankModal(true)}
          >
            <Text style={styles.pickerText}>{selectedBank ? selectedBank.name : "Choose Bank"}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View> 

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Destination Account</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter account number"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric" // Keep numeric for account number
          />
        </View>

        {/* Horizontal Divider */}
        <View style={styles.horizontalDivider} />

        {/* Quick Select Beneficiary */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quick Select Beneficiary</Text>
          <TouchableOpacity 
            style={styles.pickerBox} 
            onPress={() => router.push("/pages/navigate/select-beneficiary")} // Link to saved transfers
          >
            <Text style={styles.pickerText}>Choose from Saved</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        
        {/* Amount Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter Amount"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
          />
        </View>
        

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Transaction Description</Text>
          <TextInput 
            style={styles.input}
            placeholder="Add a note (Optional)"
            placeholderTextColor={COLORS.gray}
          />
        </View>

        {/* Schedule Toggle */}
        <View style={styles.scheduleRow}>
          <View>
            <Text style={styles.scheduleTitle}>Schedule Transfer</Text>
            <Text style={styles.scheduleSubtitle}>Perform this transaction later</Text>
          </View>
          <Switch 
            value={isScheduled}
            onValueChange={setIsScheduled}
            trackColor={{ false: COLORS.gray, true: COLORS.gold }}
            thumbColor={COLORS.white}
          />
        </View>

        {/* Footer Actions: Continue and Fingerprint */}
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fingerprintButton}>
            <Ionicons name="finger-print" size={44} color={COLORS.gold} />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bank Selection Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showBankModal}
        onRequestClose={() => setShowBankModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowBankModal(false)} style={styles.modalCloseButton}>
              <Ionicons name="close-outline" size={28} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select a Bank</Text>
            <View style={{ width: 28 }} />{/* Placeholder for alignment */}
          </View>
          <TextInput 
            style={styles.modalSearchInput}
            placeholder="Search banks..."
            placeholderTextColor={COLORS.gray}
          />
          <FlatList
            data={bankList} // Your dynamic bank data goes here
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.bankListItem}
                onPress={() => {
                  setSelectedBank(item);
                  setShowBankModal(false);
                }}
              >
                <Text style={styles.bankListItemText}>{item.name}</Text>
                {selectedBank && selectedBank.id === item.id && (
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.gold} />
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No banks found.</Text>
              </View>
            }
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};






export default TransferScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 20 },
  topActionRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 25 
  },
  topActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    width: '48%',
  },
  topActionText: { marginLeft: 8, fontSize: 12, fontWeight: '600', color: COLORS.black },
  sectionLabel: { fontSize: 14, fontWeight: 'bold', color: COLORS.black, marginBottom: 15 },
  modeRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 25 
  },
  modeItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '31%',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
  },
  selectedModeItem: { backgroundColor: COLORS.black },
  modeText: { fontSize: 11, color: COLORS.black, fontWeight: '600' },
  selectedModeText: { color: COLORS.white },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, color: COLORS.gray, marginBottom: 8, fontWeight: '500' },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.black,
  },
  pickerBox: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: { fontSize: 16, color: COLORS.black, fontWeight: '500' },

  horizontalDivider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 25, // Adjust spacing as needed
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalCloseButton: { padding: 5 },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  modalSearchInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    margin: 15,
    fontSize: 16,
    color: COLORS.black,
  },
  bankListItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  bankListItemText: { fontSize: 16, color: COLORS.black },

  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 10,
  },
  scheduleTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.black },
  scheduleSubtitle: { fontSize: 12, color: COLORS.gray },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
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
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { color: COLORS.gray, fontSize: 16 },
});



// OK that's a good job let's work for the transfer section now so this is how I want you to design the transfer section I want you to design the transfer section in such a way that like the first one when you have something like transfer history and save transfer so the both of them should be in the same line next time Dennis you show show something like select transfer mode ahead with it with it's got able to continue like owner accounts zenith owner account zeton bank hey and other bank you understand but all of these three should also be in the same line then there should be an input field that says select source accounts select the another input field for select destination account you understand the amount transaction description then then if you contain something like schedule transfer to them before continue with the fingerprint also