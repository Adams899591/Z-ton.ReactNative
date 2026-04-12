import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Switch, Modal, FlatList, StatusBar, ActivityIndicator } from 'react-native';
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pin, setPin] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle number press for PIN input
  const handleNumberPress = (num) => {
    if (pin.length < 4 && !isLoading) {
      setPin(prev => prev + num);
    }
  };

  // Handle backspace for PIN input
  const handleBackspace = () => {
    if (!isLoading) {
      setPin(pin.slice(0, -1));
    }
  };

  // Simulate transfer action
  const handleTransfer = () => {
    setIsLoading(true);
    // Simulate an API call delay
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setPin('');
      // You would typically navigate to a success screen or show a success message here
    }, 3000);
  };


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
        <TouchableOpacity 
          style={styles.quickSelectRow} 
          onPress={() => router.push("/pages/navigate/select-beneficiary")}
        >
          <Text style={styles.quickSelectText}>Quick Select Beneficiary? <Text style={styles.goldText}>Choose from Saved</Text></Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gold} />
        </TouchableOpacity>
        
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
          <TouchableOpacity style={styles.continueButton} onPress={() => setShowConfirmModal(true)}>
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
        transparent={true}
        visible={showBankModal}
        onRequestClose={() => setShowBankModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bankModalContent}>
            <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowBankModal(false)} style={styles.modalCloseButton}>
              <Ionicons name="close-outline" size={28} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select a Bank</Text>
            <View style={{ width: 28 }} />
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
          </View>
        </View>
      </Modal>

      {/* Confirm Transfer Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModalContent}>
            <View style={styles.confirmHeader}>
              <Text style={styles.confirmTitle}>Confirm Transfer</Text>
              <TouchableOpacity onPress={() => { setShowConfirmModal(false); setPin(''); }}>
                <Ionicons name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <View style={styles.confirmBody}>
              <Text style={styles.confirmSubtext}>You are about to transfer the money to:</Text>
              <View style={styles.staticDetailBox}>
                <Text style={styles.staticName}>Usman Adams</Text>
                <Text style={styles.staticAccount}>0123456789 | Z-ton Bank</Text>
              </View>

              <View style={styles.modalHorizontalDivider} />

              <Text style={styles.enterPinLabel}>Enter PIN</Text>
              
              {/* PIN Display Dots */}
              <View style={styles.pinDisplayRow}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={COLORS.gold} />
                ) : (
                  [1, 2, 3, 4].map((_, index) => (
                    <View 
                      key={index} 
                      style={[
                        styles.pinDot, 
                        pin.length > index && styles.pinDotFilled
                      ]} 
                    />
                  ))
                )}
              </View>

              {/* Custom Keypad */}
              <View style={styles.keypadContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <TouchableOpacity 
                    key={num} 
                    style={[styles.keypadButton, isLoading && { opacity: 0.5 }]}
                    disabled={isLoading}
                    onPress={() => handleNumberPress(num.toString())}
                  >
                    <Text style={styles.keypadButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.keypadButton} />
                <TouchableOpacity 
                  style={[styles.keypadButton, isLoading && { opacity: 0.5 }]}
                  disabled={isLoading}
                  onPress={() => handleNumberPress('0')}
                >
                  <Text style={styles.keypadButtonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.keypadButton, isLoading && { opacity: 0.5 }]}
                  disabled={isLoading}
                  onPress={handleBackspace}
                >
                  <Ionicons name="backspace-outline" size={24} color={COLORS.black} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.modalTransferButton, (pin.length < 4 || isLoading) && styles.disabledButton]}
                disabled={pin.length < 4 || isLoading}
                onPress={handleTransfer}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.modalTransferButtonText}>Confirm & Transfer</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={100} color={COLORS.gold} />
            </View>
            
            <Text style={styles.successTitle}>Transfer Successful</Text>
            <Text style={styles.successMessage}>
              Your transfer to <Text style={{ fontWeight: 'bold', color: COLORS.black }}>Usman Adams</Text> (Z-ton Bank - 9902910283) was successful.
            </Text>

            <View style={styles.successButtonRow}>
              <TouchableOpacity style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>View Receipt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>Save Payment</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.successCloseButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.successCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  quickSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -10,
  },
  quickSelectText: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: '500',
  },
  goldText: { color: COLORS.gold, fontWeight: 'bold' },
  // Modal Styles
  bankModalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '75%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
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
  bankListItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
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

  // Confirm Modal Specific Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  confirmModalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 20,
    minHeight: '55%',
  },
  confirmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  confirmTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.black },
  confirmBody: { padding: 15, alignItems: 'center' },
  confirmSubtext: { fontSize: 14, color: COLORS.gray, marginBottom: 8 },
  staticDetailBox: { alignItems: 'center', marginBottom: 10 },
  staticName: { fontSize: 20, fontWeight: 'bold', color: COLORS.black },
  staticAccount: { fontSize: 14, color: COLORS.gray, marginTop: 5 },
  modalHorizontalDivider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    width: '100%',
    marginVertical: 15,
  },
  enterPinLabel: { fontSize: 16, fontWeight: '600', color: COLORS.black, marginBottom: 15 },
  pinDisplayRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pinDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginHorizontal: 15,
  },
  pinDotFilled: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  keypadButton: {
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  keypadButtonText: { fontSize: 24, fontWeight: '600', color: COLORS.black },
  modalTransferButton: {
    backgroundColor: COLORS.black,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalTransferButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  disabledButton: { backgroundColor: COLORS.gray },

  // Success Modal Styles
  successModalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 25,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  successButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  outlineButton: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: COLORS.gold,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  outlineButtonText: { color: COLORS.gold, fontWeight: 'bold', fontSize: 14 },
  successCloseButton: {
    backgroundColor: COLORS.black,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  successCloseButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});
