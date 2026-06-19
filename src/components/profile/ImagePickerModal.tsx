import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { scale, verticalScale, moderateScale, responsiveFontSize } from '../../utils/responsive';

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
}

const ImagePickerModal = ({
  visible,
  onClose,
  onTakePhoto,
  onChooseFromGallery,
}: ImagePickerModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {/* Header Indicator */}
              <View style={styles.indicator} />
              
              <Text style={styles.title} allowFontScaling={false}>
                Change Profile Photo
              </Text>
              
              <View style={styles.optionsContainer}>
                {/* Take Photo */}
                <TouchableOpacity
                  style={styles.optionRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    onTakePhoto();
                    onClose();
                  }}
                >
                  <View style={styles.iconWrap}>
                    <Ionicons name="camera-outline" size={20} color="#8259D2" />
                  </View>
                  <Text style={styles.optionText} allowFontScaling={false}>
                    Take Photo
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#BCC1CD" />
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Choose from Gallery */}
                <TouchableOpacity
                  style={styles.optionRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    onChooseFromGallery();
                    onClose();
                  }}
                >
                  <View style={styles.iconWrap}>
                    <Ionicons name="image-outline" size={20} color="#8259D2" />
                  </View>
                  <Text style={styles.optionText} allowFontScaling={false}>
                    Choose from Gallery
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#BCC1CD" />
                </TouchableOpacity>
              </View>

              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.8}
                onPress={onClose}
              >
                <Text style={styles.cancelText} allowFontScaling={false}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 28, 48, 0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(34),
    alignItems: 'center',
  },
  indicator: {
    width: scale(40),
    height: verticalScale(4),
    backgroundColor: '#E2E5EC',
    borderRadius: moderateScale(2),
    alignSelf: 'center',
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: '#1C1C30',
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    backgroundColor: '#FAFAFD',
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    overflow: 'hidden',
    marginBottom: verticalScale(16),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
  },
  iconWrap: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: '#F3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(14),
  },
  optionText: {
    flex: 1,
    fontSize: responsiveFontSize(14.5),
    fontWeight: '600',
    color: '#1C1C30',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFF4',
    marginHorizontal: scale(16),
  },
  cancelButton: {
    width: '100%',
    height: verticalScale(48),
    backgroundColor: '#FAFAFD',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#EFEFF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: responsiveFontSize(14.5),
    fontWeight: '700',
    color: '#8259D2',
  },
});

export default ImagePickerModal;
