import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  auditHeader: {
    backgroundColor: '#EAF1F7',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    boxShadow: '0px 2px 12px 0px rgba(10, 10, 10, 0.10)',
  },
  auditSmallSecondary: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: 'normal',
    lineHeight: 13,
    letterSpacing: 0.5,
    color: '#848B98',
  },
  HeaderMainContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerStatsList: {display: 'flex', flexDirection: 'column', gap: 2},
  headerStats: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#D4E2F0',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stateCountDisplay: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerCount: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    letterSpacing: 0.7,
    color: '#3B475B',
  },
  headerText: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: 400,
    letterSpacing: 0.5,
    color: '#3B475B',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: wp(2),
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
  tabButtonText: {fontSize: wp(3.5), fontWeight: '600'},
  auditListContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: '#F1F1F1',
  },
  noRecord: {
    fontSize: wp(3.5),
    letterSpacing: wp(0.15),
    padding: 12,
    color: '#848B98',
  },
});

export default styles;
