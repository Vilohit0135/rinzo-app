import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';

interface CareProcessStepProps {
  iconName: string;
  title: string;
  description: string;
}

const CareProcessStep = ({ iconName, title, description }: CareProcessStepProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons name={iconName as any} size={20} color="#7D57D8" />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title} allowFontScaling={false}>{title}</Text>
        <Text style={styles.description} allowFontScaling={false}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(12),
  },
  iconCircle: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: '#F3EDFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: verticalScale(4),
  },
  title: {
    fontSize: responsiveFontSize(15),
    fontWeight: '700',
    color: '#171A2C',
  },
  description: {
    fontSize: responsiveFontSize(13),
    fontWeight: '500',
    color: '#6F7787',
    lineHeight: verticalScale(18),
    marginTop: verticalScale(2),
  },
});

export default CareProcessStep;
