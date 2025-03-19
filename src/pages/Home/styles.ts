import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: '#fff'},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Math.max(20, heightPercentageToDP(5)),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPercentageToDP(90),
    gap: widthPercentageToDP(10),
    padding: widthPercentageToDP(4),
    borderRadius: widthPercentageToDP(3),
  },
  iconContainer: {
    padding: widthPercentageToDP(2),
    backgroundColor: '#4682B4',
    borderRadius: 8,
  },
  menuTitle: {
    fontSize: widthPercentageToDP(4.5),
    fontWeight: '500',
    color: '#000',
  },
});

export default styles;
