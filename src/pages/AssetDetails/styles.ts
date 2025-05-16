import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  assetHeaderContainer: {},
  assetDeatailsCard: {},
  assetDetailSection: {},
  asset: {},
  footer: {
    borderWidth: 2,
    borderColor: '#F1F1F1',
  },
  backButton: {
    margin: wp(5),
    width: wp(90),
    padding: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#8C8C8C',
    borderWidth: 1.5,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#FAFBFF',
    fontWeight: '600',
    fontSize: wp(4),
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
});

export default styles;
