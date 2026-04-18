import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Switch } from 'react-native-gesture-handler'
import * as LocalAuthentication from 'expo-local-authentication'; // Import LocalAuthentication
const COLORS = { // Define colors for consistency
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
  lightGray: "#F9FAFB",
};

const SecuritySettings = ({styles,setModalVisible,isFingerprintEnabled,setIsFingerprintEnabled}) => {

  // Function to check biometric availability and enrollment
  const checkBiometricAvailability = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware) {
      Alert.alert("Biometrics Not Available", "Your device does not support biometric authentication.");
      return false;
    }
    if (!isEnrolled) {
      Alert.alert("Biometrics Not Set Up", "Please set up fingerprint or face ID in your device settings to use this feature.");
      return false;
    }
    return true;
  };

  // function to handle toggling the fingerprint switch, which will check for biometric availability and show the modal if enabling, or disable if turning off
  const toggleFingerprint = (value) => {
    if (value) { // If trying to enable fingerprint
      checkBiometricAvailability().then(canAuthenticate => {
        if (canAuthenticate) {
          setModalVisible(true);
        } else {
          setIsFingerprintEnabled(false); // Keep switch off if biometrics are not available
        }
      });
    } else { // If trying to disable fingerprint
      setIsFingerprintEnabled(false);
    }
  };


  return (
      <>
              <Text style={styles.sectionTitle}>Security Settings</Text>
              
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Ionicons name="finger-print" size={24} color={COLORS.darkGray} />
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingLabel}>Enable Fingerprint</Text>
                    <Text style={styles.settingSubLabel}>Use biometrics to login and authorize transfers</Text>
                  </View>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: COLORS.gold }}
                  thumbColor={isFingerprintEnabled ? COLORS.white : "#f4f3f4"}
                  onValueChange={toggleFingerprint}
                  value={isFingerprintEnabled}
                />
              </View>
      </>
  )
}

export default SecuritySettings

