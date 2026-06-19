import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import { useTabBar } from '../../utils/TabBarContext';

interface Message {
  id: string;
  sender: 'aura' | 'user';
  text: string;
  time: string;
  status?: 'Read' | 'Sent';
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'aura',
    text: "Hi there! 👋 I'm Aura, your LaundroWise assistant. How can I help you today?",
    time: '10:42 AM',
  }
];

const QUICK_REPLIES = [
  { id: 'order', text: 'Where is my order?', icon: 'bus-outline' },
  { id: 'payment', text: 'Payment issues', icon: 'card-outline' },
  { id: 'price', text: 'Price list', icon: 'document-text-outline' },
];

const ChatSupportScreen = () => {
  const navigation = useNavigation();
  const { setTabBarVisible } = useTabBar();
  const insets = useSafeAreaInsets();

  // Hide bottom tab bar
  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        setTabBarVisible(false);
      }, 50);
      return () => {
        clearTimeout(timeout);
        setTabBarVisible(true);
      };
    }, [setTabBarVisible])
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTabBarVisible(false);
    }, 50);
    return () => {
      clearTimeout(timeout);
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  
  const flatListRef = useRef<FlatList>(null);
  const typingDotAnim = useRef(new Animated.Value(0)).current;

  // Animate typing indicator dots
  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingDotAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(typingDotAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      typingDotAnim.setValue(0);
    }
  }, [isTyping]);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const handleSendText = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: getFormattedTime(),
      status: 'Read',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setShowQuickReplies(false);
    scrollToBottom();

    // Trigger mock typing and response
    setIsTyping(true);
    scrollToBottom();

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I'm on it! Let me check that details for you. One moment please... 🕒";

      const lowerText = text.toLowerCase();
      if (lowerText.includes('order')) {
        replyText = "I'm sorry for the delay! Let me check the real-time status of your driver. One moment please... 🕒";
      } else if (lowerText.includes('payment') || lowerText.includes('pay') || lowerText.includes('money')) {
        replyText = "No worries! Please share your Order ID or the payment transaction reference, and I'll look into the payment status right away.";
      } else if (lowerText.includes('price') || lowerText.includes('rate') || lowerText.includes('cost')) {
        replyText = "Here is our standard pricing: \n• Wash & Fold: ₹49/kg\n• Ironing: ₹10/item\n• Dry Cleaning starts at ₹99/item.\nYou can see the full pricing card under our Services catalog!";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'aura',
        text: replyText,
        time: getFormattedTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
      scrollToBottom();
    }, 1500);
  };

  const handleQuickReplyPress = (replyText: string) => {
    handleSendText(replyText);
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:+919876543210').catch((err) => {
      console.error('Failed to open dialer', err);
    });
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.userRow : styles.auraRow]}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.auraBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userText : styles.auraText]}>
            {item.text}
          </Text>
        </View>
        <Text style={[styles.timeText, isUser ? styles.userTimeText : styles.auraTimeText]}>
          {item.time} {isUser && item.status ? `· ${item.status}` : ''}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#111111" />
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop' }}
              style={styles.avatar}
            />
            <View style={styles.statusDot} />
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.agentName}>Aura Support</Text>
            <Text style={styles.agentStatus}>Online now</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionIcon} onPress={handleCallSupport} activeOpacity={0.7}>
              <Ionicons name="call-outline" size={22} color="#111111" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon} activeOpacity={0.7}>
              <Ionicons name="ellipsis-vertical" size={20} color="#111111" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={() => (
            <View style={styles.dateTagContainer}>
              <View style={styles.dateTag}>
                <Text style={styles.dateTagText}>TODAY</Text>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View>
              {/* Quick Replies */}
              {showQuickReplies && (
                <View style={styles.quickRepliesContainer}>
                  {QUICK_REPLIES.map((reply) => (
                    <TouchableOpacity
                      key={reply.id}
                      style={styles.quickReplyButton}
                      onPress={() => handleQuickReplyPress(reply.text)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name={reply.icon as any} size={16} color="#8259D2" style={styles.quickReplyIcon} />
                      <Text style={styles.quickReplyText}>{reply.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <View style={[styles.messageRow, styles.auraRow]}>
                  <View style={[styles.bubble, styles.auraBubble, styles.typingBubble]}>
                    <Animated.View style={[styles.typingDot, { opacity: typingDotAnim }]} />
                    <Animated.View style={[styles.typingDot, { opacity: typingDotAnim, marginHorizontal: 4 }]} />
                    <Animated.View style={[styles.typingDot, { opacity: typingDotAnim }]} />
                  </View>
                  <Text style={[styles.timeText, styles.auraTimeText]}>Aura is typing...</Text>
                </View>
              )}
            </View>
          )}
        />

        {/* Input Bar */}
        <View style={[
          styles.inputBar,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 8 }
        ]}>
          <TouchableOpacity style={styles.attachButton} activeOpacity={0.7}>
            <Ionicons name="attach-outline" size={24} color="#71717A" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder="Message..."
            placeholderTextColor="#A1A1AA"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleSendText(inputText)}
            returnKeyType="send"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={() => handleSendText(inputText)}
            disabled={!inputText.trim()}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={16} color="#FFFFFF" style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAF9FB', // Soft off-white support background
  },
  flex: {
    flex: 1,
  },
  header: {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    paddingRight: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E4E4E7',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#10B981', // Emerald green
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  agentStatus: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
    marginTop: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    padding: 8,
    marginLeft: 6,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  dateTagContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateTag: {
    backgroundColor: '#F4F4F5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  dateTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A',
    letterSpacing: 0.5,
  },
  messageRow: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  auraRow: {
    alignSelf: 'flex-start',
  },
  userRow: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  auraBubble: {
    backgroundColor: '#8259D2',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  auraText: {
    color: '#FFFFFF',
  },
  userText: {
    color: '#0D0C10',
  },
  timeText: {
    fontSize: 11,
    color: '#71717A',
    marginTop: 4,
  },
  auraTimeText: {
    marginLeft: 4,
  },
  userTimeText: {
    marginRight: 4,
    textAlign: 'right',
  },
  quickRepliesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
    marginBottom: 16,
    paddingLeft: 4,
  },
  quickReplyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(130, 89, 210, 0.2)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#8259D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  quickReplyIcon: {
    marginRight: 6,
  },
  quickReplyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8259D2',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: 60,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  inputBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachButton: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F4F4F5',
    borderRadius: 22,
    paddingHorizontal: 16,
    color: '#1C1C3E',
    fontSize: 15,
    marginHorizontal: 8,
    paddingVertical: 10,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8259D2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E4E4E7',
  },
  sendIcon: {
    marginLeft: 2, // Slight adjustment to look centered
  },
});

export default ChatSupportScreen;
