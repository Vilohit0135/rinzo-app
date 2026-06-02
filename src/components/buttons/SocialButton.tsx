import { Pressable, StyleSheet } from 'react-native';
import { GoogleIcon } from './GoogleIcon';
import { FacebookIcon } from './FacebookIcon';
import { AppleIcon } from './AppleIcon';

export type SocialProvider = 'google' | 'facebook' | 'apple';

type SocialConfig = Record<SocialProvider, { renderIcon: (size?: number) => React.ReactNode }>;

const socialConfig: SocialConfig = {
  google: {
    renderIcon: (size = 22) => <GoogleIcon size={size} />,
  },
  facebook: {
    renderIcon: (size = 22) => <FacebookIcon size={size} />,
  },
  apple: {
    renderIcon: (size = 22) => <AppleIcon size={size} />,
  },
};

export interface SocialButtonProps {
  provider: SocialProvider;
  onPress: () => void;
}

export function SocialButton({ provider, onPress }: SocialButtonProps) {
  const { renderIcon } = socialConfig[provider];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      {renderIcon(22)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 38,
    height: 38,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
