import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
};

const loginScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
    
    <SafeAreaView style={styles.container} >
       {/* <StatusBar></StatusBar> */}
      {/* Header: Back Button and Bank Logo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={COLORS.white} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Image 
            source={require("../../../assets/images/icon.jpg")} 
            style={styles.logoImage} 
          />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome</Text>
        
        {/* Account Number Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter account number"
            placeholderTextColor={COLORS.gray}
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor={COLORS.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Remember Login Checkbox */}
        <TouchableOpacity 
          style={styles.rememberContainer} 
          onPress={() => setRememberMe(!rememberMe)}
        >
          <Ionicons 
            name={rememberMe ? "checkbox" : "square-outline"} 
            size={24} 
            color={COLORS.gold} 
          />
          <Text style={styles.rememberText}>Remember Login</Text>
        </TouchableOpacity>

        {/* Sign In Button and Fingerprint Icon */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.signInButton} onPress={() => router.push("overview")}>
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fingerprintButton}>
            <Ionicons name="finger-print" size={44} color={COLORS.gold} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Internet Banking Link at the bottom */}
        <TouchableOpacity style={styles.internetBanking}>
          <Text style={styles.internetBankingText}>Continue with Internet Banking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
  );
};

export default loginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 100,
    backgroundColor: COLORS.darkGray,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.gray,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: COLORS.black,
    fontSize: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberText: {
    color: COLORS.black,
    marginLeft: 10,
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: COLORS.black,
    flex: 1,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 15,
  },
  signInButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fingerprintButton: {
    padding: 5,
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '500',
  },
  internetBanking: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  internetBankingText: {
    color: COLORS.black,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});