import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  assetHeaderContainer: {},
  assetDeatailsCard: {},
  assetDetailSection: {},
  statsCardBg: {
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: '#E6E6E6',
    borderWidth: 1,
  },
  asset: {},
  footer: {
    borderWidth: 2,
    borderColor: '#F1F1F1',
  },
  backButton: {
    marginVertical: wp(5),
    justifyContent: 'center',
    borderColor: '#8C8C8C',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 8,
    height: 40,
    display: 'flex',
    flex: 1,
    minWidth: wp(40),
  },
  backButtonText: {
    color: '#1D232F',
    fontWeight: '600',
    fontSize: wp(3.5),
  },
  submitButtonText: {
    color: '#FAFBFF',
    fontWeight: '600',
    fontSize: wp(3.5),
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: wp(5),
  },
});

export default styles;
