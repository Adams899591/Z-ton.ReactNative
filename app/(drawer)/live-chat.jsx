import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

const COLORS = {
  black: "#000000",
  gold: "#B8860B",
  gray: "#9CA3AF",
  white: "#FFFFFF",
  darkGray: "#1F2937",
  lightGray: "#F3F4F6",
  userBubble: "#1F2937",
  supportBubble: "#F3F4F6",
};

const MOCK_MESSAGES = [
  {
    id: '1',
    text: "Hello! Welcome to Z-ton X-L Support. How can we assist you today?",
    sender: 'support',
    timestamp: '09:00 AM',
    type: 'text',
  },
  {
    id: '2',
    text: "I'm having trouble with my recent card transaction.",
    sender: 'user',
    timestamp: '09:01 AM',
    type: 'text',
  },
];

const LiveChatScreen = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();
  
  // Audio & Video States
  const [recording, setRecording] = useState(null);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);

  // Handles sending standard text messages
  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  // Opens the professional video call overlay
  const handleVideoCall = () => {
    setIsVideoCallActive(true);
  };

  // Handles image selection from the device gallery
  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        const newMessage = {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'image',
        };
        setMessages(prev => [...prev, newMessage]);
      }
    } catch (err) {
      Alert.alert("Error", "Could not access gallery.");
    }
  };

  // Starts the audio recording process
  const startRecording = async () => {
    try {
      // Request microphone permissions
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        // Prepare the audio mode for recording
        await Audio.setAudioModeAsync({ 
          allowsRecordingIOS: true, 
          playsInSilentModeIOS: true 
        });
        
        // Create and start the recording
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
      }
    } catch (err) {
      Alert.alert('Failed to start recording', err.message);
    }
  };

  // Stops the audio recording and adds it to the chat
  const stopRecording = async () => {
    // Safety check: prevent calling methods on null if recording didn't start yet
    if (!recording) return;

    try {
      // Stop the hardware and unload the recording
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      // Reset the recording state so the UI updates
      setRecording(null);

      const newMessage = {
        id: Date.now().toString(),
        uri: uri,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'audio',
      };
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error("Failed to stop recording:", error);
      setRecording(null);
    }
  };
  
  // Helper to play back audio messages in the chat
  const playAudio = async (uri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (err) {
      Alert.alert("Error", "Could not play audio.");
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    
    return (
      <View style={[styles.messageWrapper, isUser ? styles.userWrapper : styles.supportWrapper]}>
        {!isUser && (
          <View style={styles.supportAvatar}>
            <Ionicons name="headset" size={16} color={COLORS.white} />
          </View>
        )}
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.supportBubble]}>
          {item.type === 'text' && (
            <Text style={[styles.messageText, isUser ? styles.userText : styles.supportText]}>
              {item.text}
            </Text>
          )}
          
          {item.type === 'image' && (
            <Image source={{ uri: item.uri }} style={styles.messageImage} resizeMode="cover" />
          )}

          {item.type === 'audio' && (
            <TouchableOpacity onPress={() => playAudio(item.uri)} style={styles.audioPlayer}>
              <Ionicons name="play-circle" size={32} color={isUser ? COLORS.gold : COLORS.darkGray} />
              <View style={styles.audioWaveformPlaceholder}>
                <View style={[styles.waveBar, { height: 10 }]} />
                <View style={[styles.waveBar, { height: 20 }]} />
                <View style={[styles.waveBar, { height: 15 }]} />
                <View style={[styles.waveBar, { height: 25 }]} />
                <View style={[styles.waveBar, { height: 12 }]} />
              </View>
            </TouchableOpacity>
          )}

          <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.supportTimestamp]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Support Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.statusDot} />
          <View>
            <Text style={styles.supportName}>Core Support Team</Text>
            <Text style={styles.supportStatus}>Always active for you</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleVideoCall} style={styles.actionIcon}>
            <Ionicons name="videocam" size={24} color={COLORS.gold} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="ellipsis-vertical" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current.scrollToEnd()}
        />

        {/* Input Area */}
        <View style={styles.inputWrapper}>
          <TouchableOpacity onPress={handleImagePicker} style={styles.attachButton}>
            <Ionicons name="add-circle" size={30} color={COLORS.gold} />
          </TouchableOpacity>
          
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your message..."
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              onPressIn={startRecording} 
              onPressOut={stopRecording} 
              style={styles.micButton}
            >
              <Ionicons name="mic" size={22} color={recording ? "#EF4444" : COLORS.gray} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={sendMessage} 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Professional Video Call Modal Overlay */}
      <Modal visible={isVideoCallActive} animationType="slide" transparent={false}>
        <View style={styles.videoCallContainer}>
          <View style={styles.remoteVideo}>
            <ActivityIndicator size="large" color={COLORS.gold} />
            <Text style={styles.videoStatusText}>Connecting to Core Supporter...</Text>
          </View>
          <View style={styles.localVideoSmall}>
            <Ionicons name="person" size={40} color={COLORS.gray} />
          </View>
          <View style={styles.videoControls}>
            <TouchableOpacity style={styles.videoActionBtn}>
              <Ionicons name="mic-off" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setIsVideoCallActive(false)} 
              style={[styles.videoActionBtn, { backgroundColor: '#EF4444' }]}
            >
              <Ionicons name="call" size={28} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.videoActionBtn}>
              <Ionicons name="videocam-off" size={28} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LiveChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  headerInfo: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981', marginRight: 10 },
  supportName: { fontWeight: 'bold', fontSize: 16, color: COLORS.darkGray },
  supportStatus: { fontSize: 12, color: COLORS.gray },
  headerActions: { flexDirection: 'row' },
  actionIcon: { marginLeft: 20 },
  
  chatContainer: { flex: 1 },
  messageList: { padding: 20 },
  
  messageWrapper: { flexDirection: 'row', marginBottom: 20, maxWidth: '80%' },
  userWrapper: { alignSelf: 'flex-end' },
  supportWrapper: { alignSelf: 'flex-start' },
  
  supportAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 5,
  },
  
  messageBubble: { padding: 12, borderRadius: 18 },
  userBubble: { backgroundColor: COLORS.userBubble, borderBottomRightRadius: 2 },
  supportBubble: { backgroundColor: COLORS.supportBubble, borderBottomLeftRadius: 2 },
  
  messageImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 5 },
  
  messageText: { fontSize: 15, lineHeight: 20 },
  userText: { color: COLORS.white },
  supportText: { color: COLORS.darkGray },
  
  timestamp: { fontSize: 10, marginTop: 5, alignSelf: 'flex-end' },
  userTimestamp: { color: 'rgba(255,255,255,0.6)' },
  supportTimestamp: { color: COLORS.gray },

  audioPlayer: { flexDirection: 'row', alignItems: 'center', width: 150 },
  audioWaveformPlaceholder: { flexDirection: 'row', alignItems: 'center', marginLeft: 10, flex: 1, justifyContent: 'space-between' },
  waveBar: { width: 3, backgroundColor: COLORS.gold, borderRadius: 2 },

  inputWrapper: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  attachButton: { marginRight: 10 },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 15, color: COLORS.black, maxHeight: 100 },
  micButton: { marginLeft: 10 },
  sendButton: {
    backgroundColor: COLORS.gold,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: { backgroundColor: COLORS.gray },

  // Video Call Styles
  videoCallContainer: { flex: 1, backgroundColor: COLORS.black, justifyContent: 'center', alignItems: 'center' },
  remoteVideo: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  videoStatusText: { color: COLORS.white, marginTop: 20, fontSize: 16 },
  localVideoSmall: { position: 'absolute', top: 50, right: 20, width: 100, height: 150, backgroundColor: COLORS.darkGray, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.gold },
  videoControls: { position: 'absolute', bottom: 50, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' },
  videoActionBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
});