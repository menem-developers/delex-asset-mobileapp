import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    height: wp(15),
    width: wp(100),
    paddingHorizontal: 16,
    backgroundColor: '#002B5C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginLeft: wp(2),
    fontSize: wp(5),
    fontWeight: '400',
    color: '#ffffff',
  },
  logo: {},
  backIconButton: {
    padding: 0,
  },
  iconButton: {
    padding: wp(2),
  },
  backIcon: {
    height: wp(5),
    width: wp(2.5),
  },
  menuIcon: {
    height: wp(5),
    width: wp(5),
  },
});
