import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../UserContext";
import {API_URL} from "../../server/config"

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
};

const loginScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  // error state 
  const [accountNumberError, setAccountNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  // hand submit 
  const handleSubmit = async () => {
     setIsLoading(true);
     setAccountNumberError("");
     setPasswordError("");

      try {
            
            // send request to laravel
            const response =  await axios.post(`${API_URL}/auth/login`, {
                account_number: accountNumber,
                password: password,
            });

            const data = response.data ;

            // if it success from laravel
            if (data.status === "success") {

                  // Save the user data to AsyncStorage for persistence across app restarts
                  await AsyncStorage.setItem("user", JSON.stringify(data.user));

                  // Save the user data to global context for access across the app
                  setUser(data.user);
                  
                  // Successfully logged in
                  router.replace("(drawer)/(tabs)/overview");

                //  console.log(JSON.stringify(data, null, 2));
            }

           
      }catch (error) { // handle errors from the API or network issues
           const data = error.response?.data; // Safely extract response data if it exists
          
            // validation error from Laravel
            if (data?.errors) { // check if there are validation errors in the response
              setAccountNumberError(data.errors.account_number?.[0] || "");
              setPasswordError(data.errors.password?.[0] || "");
            } else {
              // other errors (e.g. connection issues)
              const message = data?.message || "Connection failed. Please check if the server is running.";
              Alert.alert("Login Failed", message);
            } 


   } finally { // reset loading state after the login process is complete, regardless of success or failure
     setIsLoading(false);
   }


  }



  return (
    <>
    
    <SafeAreaView style={styles.container} >

         <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
         
      {/* Header: Back Button and Bank Logo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
             <Ionicons name="arrow-back" size={28} color={COLORS.white} />
        </TouchableOpacity>
        
        <View>
          <Text style={styles.bankName}> Z-ton Bank </Text>
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
          
              {/* accountNumberError */}
              {accountNumberError ? ( // Corrected syntax for optional chaining
                  <Text style={{ color: "red", marginTop: 4 }}>{accountNumberError}</Text>
                ) : null}
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

              {/* passwordError */}
              {passwordError ? ( // Corrected syntax for optional chaining
                  <Text style={{ color: "red", marginTop: 4 }}>{passwordError}</Text>
                ) : null}
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

          {/* Sign In */}
          <TouchableOpacity style={styles.signInButton} onPress={() => handleSubmit()}>
            
                {isLoading ? ( // Only show spinner if login is loading, not biometric success animation
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.signInButtonText}>SIGN IN</Text>
                )}

          </TouchableOpacity>

          {/* finger print */}
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

// pls i am try ing to mak the user global to be accessable on all pages pls i have already started but i may not be doing it well or placeing it it a position where it stays global pls can u help me fix it 

export default loginScreen
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    // display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 2,
    height: 70,
    backgroundColor: COLORS.darkGray,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bankName:{
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  backButton: {
    padding: 5,
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