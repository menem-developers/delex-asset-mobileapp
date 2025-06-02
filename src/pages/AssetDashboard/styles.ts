import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  assetDataCard: {
    width: wp(90),
    backgroundColor: '#FBFDFF',
    margin: wp(5),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    elevation: 12,
  },
  assetInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: wp(4),
    paddingVertical: wp(6),
    paddingTop: wp(5),
    gap: wp(4),
    justifyContent: 'space-between',
  },
  assetInfoCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D4E2F0',
    borderRadius: 8,
    paddingHorizontal: wp(3),
    gap: wp(3),
    flexDirection: 'row',
    paddingVertical: wp(2.5),
    alignItems: 'center',
  },
  selectLocation: {
    borderColor: '#D4E2F0',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#EAF1F7',
    marginHorizontal: wp(4),
    marginVertical: wp(6),
    marginBottom: wp(5),
    padding: wp(3),
    paddingRight: wp(4),
  },
  selectLocationPlaceholder: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#768997',
  },
  selectLocationText: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#3B475B',
  },
  radioDot: {
    flex: 1,
    borderRadius: wp(100),
  },
  radioDotContainer: {
    borderWidth: wp(0.7),
    height: wp(6),
    width: wp(6),
    padding: wp(0.7),
    borderRadius: wp(100),
  },
  assetInfoValue: {
    fontSize: wp(3.5),
    fontWeight: '500',
    color: '#3B475B',
  },
  assetInfoTitle: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#3B475B',
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    gap: wp(4),
    padding: wp(4),
    paddingHorizontal: wp(6),
    paddingTop: wp(1),
  },
  menuButton: {
    backgroundColor: '#FBFDFF',
    padding: wp(5),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    elevation: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuTitleContainer: {
    flexDirection: 'row',
    gap: wp(5),
  },
  menuTitle: {
    fontWeight: '500',
    fontSize: wp(4),
    color: '#3B475B',
  },
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
  backButtonText: {
    color: '#1D232F',
    fontWeight: '600',
    fontSize: wp(4),
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
  submitButtonText: {
    color: '#FAFBFF',
    fontWeight: '600',
    fontSize: wp(4),
  },
  disabled: {
    backgroundColor: '#EEF1F4',
    borderColor: '#EEF1F4',
  },
});

export default styles;
