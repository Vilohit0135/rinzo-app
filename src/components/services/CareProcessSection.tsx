import { Image, StyleSheet, Text, View } from 'react-native';
import { scale, verticalScale, responsiveFontSize } from '../../utils/responsive';
import CareProcessStep from './CareProcessStep';

const steps = [
  {
    iconName: 'layers-outline',
    title: 'Step 1: Sorting',
    description: 'We sort your clothes by color, fabric type, and care requirements for optimal cleaning.',
  },
  {
    iconName: 'color-palette-outline',
    title: 'Step 2: Specialized Cleaning',
    description: 'Each garment receives tailored treatment with premium detergents and stain removers.',
  },
  {
    iconName: 'shirt-outline',
    title: 'Step 3: Precision Ironing',
    description: 'Expert steaming and pressing to remove every wrinkle with professional care.',
  },
  {
    iconName: 'checkmark-circle-outline',
    title: 'Step 4: Quality Check',
    description: 'Final inspection ensures every item meets our quality standards before delivery.',
  },
];

const CareProcessSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle} allowFontScaling={false}>Our Care Process</Text>
      <View style={styles.card}>
        <View style={styles.stepsList}>
          {steps.map((step) => (
            <CareProcessStep
              key={step.title}
              iconName={step.iconName}
              title={step.title}
              description={step.description}
            />
          ))}
        </View>
        <Image
          source={require('../../../assets/images/service/process.png')}
          style={styles.bottomImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(24),
    marginBottom: verticalScale(40),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: '#171A2C',
    marginBottom: verticalScale(12),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(18),
    borderWidth: 1,
    borderColor: '#EFEAFB',
    padding: scale(16),
  },
  stepsList: {
    gap: verticalScale(14),
  },
  bottomImage: {
    height: verticalScale(120),
    borderRadius: scale(14),
    marginTop: verticalScale(14),
    width: '100%',
  },
});

export default CareProcessSection;
