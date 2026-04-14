import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  Animated, // Import Animated for animation
  Alert,    // Import Alert for user feedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication'; // Import LocalAuthentication

const COLORS = { // Define colors for consistency
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
  lightGray: "#F9FAFB",
};

const ProfileSecurityScreen = () => {
  const [name, setName] = useState('Z-ton User');
  const [email, setEmail] = useState('user@zton-bank.com');
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const scanningLineAnim = useRef(new Animated.Value(0)).current; // For scanning line animation

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

  // 
  const startScanningAnimation = () => {
    scanningLineAnim.setValue(0); // Reset animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanningLineAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scanningLineAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopScanningAnimation = () => {
    scanningLineAnim.stopAnimation();
    scanningLineAnim.setValue(0); // Reset position
  };

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

  const handleBiometricAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to enable Fingerprint Login',
        cancelLabel: 'Cancel',
      });

      setIsFingerprintEnabled(result.success);
      if (result.success) Alert.alert("Success", "Fingerprint authentication enabled!");
      else if (result.error === 'user_cancel') Alert.alert("Cancelled", "Fingerprint authentication cancelled.");
      else Alert.alert("Authentication Failed", "Could not authenticate with fingerprint. Please try again.");
    } catch (error) {
      console.error("Biometric authentication error:", error);
      Alert.alert("Error", "An error occurred during biometric authentication.");
    } finally {
      setModalVisible(false);
      stopScanningAnimation();
    }
  };

  // Effect to manage modal visibility, animation, and biometric prompt
  useEffect(() => {
    if (modalVisible) {
      startScanningAnimation();
      // Trigger the real authentication immediately when modal opens
      handleBiometricAuthentication();
    } else {
      stopScanningAnimation();
    }
  }, [modalVisible]);

  const translateY = scanningLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-45, 45], // Widened range to cover the 80px icon
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionTitle}>Account Details</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={COLORS.gold} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={COLORS.gold} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

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

      </ScrollView>

      {/* Fingerprint Verification Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false); stopScanningAnimation(); setIsFingerprintEnabled(false); }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity 
              style={styles.closeModal} 
              onPress={() => { setModalVisible(false); stopScanningAnimation(); setIsFingerprintEnabled(false); }}
            >
              <Ionicons name="close" size={24} color={COLORS.gray} />
            </TouchableOpacity>

            <View style={styles.iconCircle}>
              <Ionicons name="finger-print" size={80} color={COLORS.gold} />
              <Animated.View
                style={[
                  styles.scanningLine,
                  {
                    backgroundColor: COLORS.gold, // Gold scanning line
                    transform: [{ translateY }],
                  },
                ]}
              />
            </View>
            
            <Text style={styles.modalTitle}>Fingerprint Authentication</Text>
            <Text style={styles.modalText}>
              Place your finger on the sensor to enable biometric security.
            </Text>

            {/* The "Simulate Scan" button is removed as the process is now automatic */}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileSecurityScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.black, marginBottom: 20 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: COLORS.gray, marginBottom: 8, fontWeight: '500' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: { flex: 1, paddingVertical: 15, paddingHorizontal: 10, fontSize: 16, color: COLORS.black },
  saveButton: { backgroundColor: COLORS.darkGray, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 30 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.lightGray, padding: 20, borderRadius: 15 },
  settingInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingTextContainer: { marginLeft: 15, flex: 1 },
  settingLabel: { fontSize: 16, fontWeight: 'bold', color: COLORS.black },
  settingSubLabel: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalView: { width: '85%', backgroundColor: COLORS.white, borderRadius: 30, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  closeModal: { position: 'absolute', right: 20, top: 20 },
  iconCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: COLORS.lightGray, justifyContent: 'center', alignItems: 'center', marginBottom: 25, borderWidth: 2, borderColor: COLORS.gold },
  scanningLine: { position: 'absolute', width: '70%', height: 3, borderRadius: 2, opacity: 0.8 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.black, marginBottom: 15 },
  modalText: { textAlign: 'center', color: COLORS.gray, fontSize: 16, lineHeight: 24, marginBottom: 30 },
  verifyButton: { backgroundColor: COLORS.gold, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  verifyButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});









