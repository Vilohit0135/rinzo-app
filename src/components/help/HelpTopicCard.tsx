import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import type { HelpTopic } from '../../data/help/helpCenterData';

interface HelpTopicCardProps {
  topic: HelpTopic;
  isLast?: boolean;
  onPress?: () => void;
}

const HelpTopicCard = ({ topic, isLast, onPress }: HelpTopicCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name={topic.icon as any} size={20} color="#8259D2" />
        </View>
        <Text style={styles.title} numberOfLines={1}>{topic.title}</Text>
        <Ionicons name="chevron-forward" size={18} color="#8259D2" />
      </View>
      {!isLast && <View style={styles.divider} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
});

export default HelpTopicCard;
