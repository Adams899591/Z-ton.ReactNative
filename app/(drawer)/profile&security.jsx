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
  Pressable,
  Modal,
  Animated, // Import Animated for animation
  Alert,    // Import Alert for user feedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication'; // Import LocalAuthentication
import AccountDetails from '../../components/profile&security/account-details';

const COLORS = { // Define colors for consistency
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
  lightGray: "#F9FAFB",
};

const ProfileSecurityScreen = () => {
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const scanningLineAnim = useRef(new Animated.Value(0)).current; // For scanning line animation
  const timerRef = useRef(null); // Ref to store the 5-second timer
  const progressIntervalRef = useRef(null); // Ref to update the progress indicator

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

  
  // function to start the scanning animation (a line moving up and down over the fingerprint icon)
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

   // function to stop the scanning animation and reset the position of the scanning line
  const stopScanningAnimation = () => {
    scanningLineAnim.stopAnimation();
    scanningLineAnim.setValue(0); // Reset position
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

  // function to clean up timers and intervals to prevent memory leaks and unintended behavior when the user cancels authentication or when the component unmounts
  const cleanupTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // function to handle the biometric authentication process when the user successfully holds the fingerprint icon for 5 seconds, which will attempt to authenticate and provide feedback based on the result
  const handleBiometricAuthentication = async () => {
    cleanupTimer();
    setIsAuthenticating(true);
    setHoldProgress(1);
    try {   
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to enable Fingerprint Login',
        cancelLabel: 'Cancel',
      });

      if (result.success) {
        setIsFingerprintEnabled(true);
        Alert.alert("Success", "Fingerprint authentication enabled!");
      } else if (result.error === 'user_cancel') {
        Alert.alert("Cancelled", "Fingerprint authentication cancelled.");
      } else {
        Alert.alert("Authentication Failed", "Could not authenticate with fingerprint. Please try again.");
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      Alert.alert("Error", "An error occurred during biometric authentication.");
    } finally {
      setIsAuthenticating(false);
      setIsHolding(false);
      setModalVisible(false);
      stopScanningAnimation();
    }
  };

  // useEffect to clean up timers and stop animations when the modal is closed, ensuring that if the user cancels the process or if the component unmounts, there are no lingering timers or animations running in the background
  useEffect(() => {
    if (!modalVisible) {
      stopScanningAnimation();
      cleanupTimer();
      setIsHolding(false);
    }
    return cleanupTimer;
  }, [modalVisible]);

  const translateY = scanningLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-45, 45], // Widened range to cover the 80px icon
  });

  // function to start the hold progress, which will update the holdProgress state every 50ms to create a visual progress indicator for the user as they hold the fingerprint icon, giving them feedback on how long they need to hold before authentication is triggered
  const startHoldProgress = () => {
    const duration = 5000;
    const intervalDuration = 50;
    let elapsed = 0;
    setHoldProgress(0);
    progressIntervalRef.current = setInterval(() => {
      elapsed += intervalDuration;
      setHoldProgress(Math.min(elapsed / duration, 1));
    }, intervalDuration);
  };

   // function to handle press in and out for the fingerprint icon (for visual feedback and hold-to-authenticate)
    function handlePressIn() {
      if (isAuthenticating) return;
      setIsHolding(true);
      startScanningAnimation();
      cleanupTimer();
      startHoldProgress();
      timerRef.current = setTimeout(() => {
        handleBiometricAuthentication();
      }, 5000);
    }
  
    // function to handle press out, which will reset the hold state and stop the scanning animation if the user releases the icon before the 5-second threshold, ensuring that the authentication process is only triggered if they hold for the full duration
    function handlePressOut() {
      if (isAuthenticating) return;
      cleanupTimer();
      setIsHolding(false);
      setHoldProgress(0);
      stopScanningAnimation();
    }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Account Details */}
        <AccountDetails styles={styles}/>
      

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

            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
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
            </Pressable>
            
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${Math.floor(holdProgress * 100)}%` }]} />
            </View>
            <Text style={styles.modalTitle}>Fingerprint Authentication</Text>
            <Text style={styles.modalText}>
              Press and hold the fingerprint icon for 5 seconds to authenticate and enable biometric security.
            </Text>
            <Text style={styles.holdStatus}>
              {isAuthenticating ? 'Authenticating...' : isHolding ? `Hold for ${Math.max(0, 5 - Math.floor(holdProgress * 5))}s` : 'Tap and hold to start.'}
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
  iconCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: COLORS.lightGray, justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderWidth: 2, borderColor: COLORS.gold },
  scanningLine: { position: 'absolute', width: '70%', height: 3, borderRadius: 2, opacity: 0.8 },
  progressContainer: { width: '100%', height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden', marginTop: 10, marginBottom: 20 },
  progressBar: { height: '100%', backgroundColor: COLORS.gold },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.black, marginBottom: 15 },
  modalText: { textAlign: 'center', color: COLORS.gray, fontSize: 16, lineHeight: 24, marginBottom: 10 },
  holdStatus: { textAlign: 'center', color: COLORS.darkGray, fontSize: 14, marginBottom: 20 },
  verifyButton: { backgroundColor: COLORS.gold, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  verifyButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
});
