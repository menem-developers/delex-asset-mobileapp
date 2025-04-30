import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  changeText: {
    padding: wp(2),
    fontSize: wp(3.5),
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  locationDropdownLabel: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#3B475B',
  },
  locationDropdown: {
    borderWidth: 1,
    borderRadius: 6,
    padding: wp(3),
    paddingRight: wp(4),
    marginTop: wp(3),
    marginBottom: wp(4),
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
    backgroundColor: '#1E90FF',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: wp(4),
  },
  statsCardBg: {
    padding: wp(4),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  statsCard: {
    padding: wp(5),
    borderRadius: 8,
    backgroundColor: '#fff',
    gap: wp(3),
  },
  statsLocationDetailsConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsLocationTitle: {
    color: '#848B98',
    fontSize: wp(3),
    fontWeight: '500',
    letterSpacing: wp(0.1),
  },
  statsLocationValue: {
    color: '#3B475B',
    fontSize: wp(3.5),
    fontWeight: '500',
    letterSpacing: wp(0.2),
  },
  taggingText: {
    color: '#8D8D8D',
    letterSpacing: wp(0.1),
    fontWeight: '500',
    fontSize: wp(3),
  },
  progressInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressPercentageText: {
    color: '#1E90FF',
    letterSpacing: wp(0.2),
    fontWeight: '600',
    fontSize: wp(4.3),
  },
  taggingCountText: {
    color: '#8D8D8D',
    fontWeight: '500',
    fontSize: wp(3.2),
    letterSpacing: wp(0.1),
  },
  tabContainer: {
    flexDirection: 'row',
    gap: wp(5),
    paddingHorizontal: wp(5),
    marginVertical: wp(4),
  },
  tabButton: {
    padding: wp(2),
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    gap: wp(2),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabBadge: {
    color: '#F2F2F2',
    fontWeight: '600',
    fontSize: wp(2.5),
    backgroundColor: '#78BCFF',
    borderRadius: wp(2.5),
    padding: wp(1),
    paddingHorizontal: wp(2),
  },
  tabButtonText: {fontSize: wp(3.5), fontWeight: '600'},
  assetDataCard: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  assetDataContainer: {
    width: wp(85),
    gap: wp(2),
    marginVertical: wp(2),
  },
  assetDataTitle: {fontSize: wp(4), fontWeight: '500', color: '#3B475B'},
  assetDataDesc: {fontSize: wp(3), fontWeight: '400', color: '#848B98'},
  noRecord: {
    fontSize: wp(3.5),
    letterSpacing: wp(0.15),
    padding: 12,
    color: '#848B98',
  },
});

export default styles;
