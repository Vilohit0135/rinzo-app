import { StyleSheet, View } from 'react-native';
import { SupportMenu } from '../../data/support/helpSupportData';
import SupportMenuItem from './SupportMenuItem';

interface SupportMenuCardProps {
  data: SupportMenu[];
  onItemPress: (route: string) => void;
}

const SupportMenuCard = ({ data, onItemPress }: SupportMenuCardProps) => {
  return (
    <View style={styles.card}>
      {data.map((item, index) => (
        <SupportMenuItem
          key={item.id}
          item={item}
          isLast={index === data.length - 1}
          onPress={() => onItemPress(item.route)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
});

export default SupportMenuCard;
