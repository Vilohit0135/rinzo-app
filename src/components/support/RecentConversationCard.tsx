import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { Conversation } from '../../data/support/contactSupportData';

interface RecentConversationCardProps {
  conversation: Conversation;
}

const RecentConversationCard = ({ conversation }: RecentConversationCardProps) => {
  return (
    <View style={styles.card}>
      <Ionicons name="chatbubble" size={24} color="#8259D2" />
      <View style={styles.content}>
        <Text style={styles.orderId} numberOfLines={1}>{conversation.orderId}</Text>
        <Text style={styles.issue} numberOfLines={1}>{conversation.issue}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#8259D2" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 82,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },
  issue: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#8D8D8D',
  },
});

export default RecentConversationCard;
