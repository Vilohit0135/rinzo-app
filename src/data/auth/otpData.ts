export interface OtpData {
  phoneNumber: string;
  otpDigits: string[];
  timerSeconds: number;
}

export const otpData: OtpData = {
  phoneNumber: '+91 87238344743',
  otpDigits: ['2', '3', '4', '8'],
  timerSeconds: 30,
};
