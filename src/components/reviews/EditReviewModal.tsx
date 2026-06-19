import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../constants/colors';
import {
  scale,
  verticalScale,
  moderateScale,
  responsiveFontSize,
} from '../../utils/responsive';
import RatingStars from './RatingStars';

interface EditReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
  initialRating: number;
  initialFeedback: string;
  laundryName: string;
}

const MAX_CHARS = 200;
const MIN_CHARS = 10;

const EditReviewModal = ({
  visible,
  onClose,
  onSubmit,
  initialRating,
  initialFeedback,
  laundryName,
}: EditReviewModalProps) => {
  const [rating, setRating] = useState(initialRating);
  const [feedback, setFeedback] = useState(initialFeedback);

  const canSubmit = rating > 0 && feedback.trim().length >= MIN_CHARS;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(rating, feedback.trim());
    onClose();
  };

  const handleClose = () => {
    setRating(initialRating);
    setFeedback(initialFeedback);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View style={styles.container}>
          <View style={styles.handleRow}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <Text style={styles.title} allowFontScaling={false} numberOfLines={1}>
              Edit Review
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-outline" size={scale(24)} color="#1C1C38" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text style={styles.laundryName} allowFontScaling={false} numberOfLines={1}>
              {laundryName}
            </Text>

            <Text style={styles.prompt} allowFontScaling={false}>
              Rate your experience
            </Text>

            <View style={styles.starsWrap}>
              <RatingStars rating={rating} size={32} onRate={setRating} />
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Share your experience..."
              placeholderTextColor="#B2B2B2"
              value={feedback}
              onChangeText={setFeedback}
              multiline
              maxLength={MAX_CHARS}
              textAlignVertical="top"
              allowFontScaling={false}
            />

            <Text style={styles.charCount} allowFontScaling={false}>
              {feedback.length}/{MAX_CHARS}
            </Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
              activeOpacity={0.85}
              onPress={handleSubmit}
              disabled={!canSubmit}
            >
              <Text style={styles.submitText} allowFontScaling={false} numberOfLines={1}>
                Update Review
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    maxHeight: '85%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingBottom: verticalScale(24),
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(4),
  },
  handle: {
    width: scale(36),
    height: verticalScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: '#D1D1D6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: '700',
    color: '#1C1C38',
  },
  body: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
  },
  laundryName: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#1C1C38',
  },
  prompt: {
    fontSize: responsiveFontSize(14),
    color: '#8D8DAD',
    marginTop: verticalScale(12),
  },
  starsWrap: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
  },
  textInput: {
    minHeight: verticalScale(100),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(14),
    paddingTop: verticalScale(10),
    fontSize: responsiveFontSize(14),
    color: '#1C1C38',
    lineHeight: 20,
  },
  charCount: {
    textAlign: 'right',
    fontSize: responsiveFontSize(12),
    color: '#B2B2B2',
    marginTop: verticalScale(4),
  },
  footer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
  },
  submitButton: {
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default EditReviewModal;
