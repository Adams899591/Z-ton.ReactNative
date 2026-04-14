import React, { useState, useRef } from 'react';
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
  Alert,
} from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';

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

  const handleVideoCall = () => {
    Alert.alert(
      "Start Video Call",
      "Would you like to start a secure video session with a core supporter?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Start Call", onPress: () => console.log("Initializing WebRTC Video...") }
      ]
    );
  };

  const handleImagePicker = () => {
    Alert.alert("Attachment", "Upload a document or image for verification.");
  };

  const handleAudioRecord = () => {
    Alert.alert("Voice Message", "Hold to record your query.");
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
          <Text style={[styles.messageText, isUser ? styles.userText : styles.supportText]}>
            {item.text}
          </Text>
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
            <TouchableOpacity onPress={handleAudioRecord} style={styles.micButton}>
              <Ionicons name="mic" size={22} color={COLORS.gray} />
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
  
  messageText: { fontSize: 15, lineHeight: 20 },
  userText: { color: COLORS.white },
  supportText: { color: COLORS.darkGray },
  
  timestamp: { fontSize: 10, marginTop: 5, alignSelf: 'flex-end' },
  userTimestamp: { color: 'rgba(255,255,255,0.6)' },
  supportTimestamp: { color: COLORS.gray },

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
});