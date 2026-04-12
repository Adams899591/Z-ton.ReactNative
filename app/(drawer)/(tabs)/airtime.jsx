import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
  lightGray: "#F3F4F6",
};

const AirtimeScreen = () => {
  const [selectedOperator, setSelectedOperator] = useState('MTN');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);

  const operators = [
    { id: 'MTN', name: 'MTN', color: '#FFCC00' },
    { id: 'GLO', name: 'Glo', color: '#00FF00' },
    { id: '9MOBILE', name: '9mobile', color: '#006600' },
    { id: 'AIRTEL', name: 'Airtel', color: '#FF0000' },
  ];

  return (
    <SafeAreaView style={styles.container}>
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

        {/* Mobile Operator Selection */}
        <Text style={styles.label}>Select Mobile Operator</Text>
        <View style={styles.operatorRow}>
          {operators.map((op) => (
            <TouchableOpacity 
              key={op.id} 
              style={[
                styles.operatorItem, 
                selectedOperator === op.id && styles.selectedOperatorItem
              ]}
              onPress={() => setSelectedOperator(op.id)}
            >
              <View style={[styles.operatorIcon, { backgroundColor: op.color }]}>
                <Text style={styles.operatorInitial}>{op.name[0]}</Text>
              </View>
              <Text style={styles.operatorText}>{op.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mobile Number Input */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Mobile Number</Text>
            <TouchableOpacity style={styles.contactTrigger}>
              <Ionicons name="person-add-outline" size={16} color={COLORS.gold} />
              <Text style={styles.contactText}>Select from contacts</Text>
            </TouchableOpacity>
          </View>
          <TextInput 
            style={styles.input}
            placeholder="e.g. 08012345678"
            placeholderTextColor={COLORS.gray}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
          />
        </View>

        {/* Amount Input */}
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

        {/* Schedule Toggle */}
        <View style={styles.scheduleRow}>
          <View>
            <Text style={styles.scheduleTitle}>Schedule payment</Text>
            <Text style={styles.scheduleSubtitle}>Set a recurring time for this top-up</Text>
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

export default AirtimeScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 20 },
  label: { fontSize: 14, color: COLORS.gray, marginBottom: 8, fontWeight: '500' },
  accountBox: {
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountNumber: { fontSize: 18, fontWeight: 'bold', color: COLORS.black },
  accountBalance: { fontSize: 12, color: COLORS.gray },
  operatorRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 25 
  },
  operatorItem: { alignItems: 'center', width: '22%' },
  selectedOperatorItem: { 
    borderBottomWidth: 2, 
    borderBottomColor: COLORS.gold, 
    paddingBottom: 5 
  },
  operatorIcon: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 5,
    elevation: 2,
  },
  operatorInitial: { color: COLORS.white, fontWeight: 'bold', fontSize: 20 },
  operatorText: { fontSize: 12, fontWeight: '600' },
  inputGroup: { marginBottom: 20 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  contactTrigger: { flexDirection: 'row', alignItems: 'center' },
  contactText: { color: COLORS.gold, fontSize: 12, marginLeft: 4, fontWeight: 'bold' },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.black,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
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