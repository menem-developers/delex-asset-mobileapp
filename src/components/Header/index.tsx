import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {back} from 'routes/utils';
import {AssetImage} from 'components/AssetImage';
import Menu from 'assets/img/menu.svg';
import Bell from 'assets/img/bell.svg';
import Back from 'assets/img/back.svg';
import Scanner from 'assets/img/scanner.svg';
import Logout from 'assets/img/logout.svg';

interface IHeaderProps {
  title?: string;
  showLogo?: boolean;
  renderRight?: React.ReactNode;
  showDrawer?: boolean;
  showBack?: boolean;
  showLogout?: boolean;
  onPressScanner?(): void;
  onBack?(): void;
  showNotify?: boolean;
}

export const Header: React.FC<IHeaderProps> = props => {
  const {
    title,
    showLogo,
    showBack,
    renderRight,
    showNotify,
    showDrawer,
    onPressScanner,
    onBack,
    showLogout,
  } = props;

  return (
    <View style={styles.container}>
      {showDrawer && (
        // <Icon
        //   name="bars"
        //   size={wp(7)}
        //   color="#ffffff"
        //   style={{marginLeft: wp(1)}}
        // />
        <Menu width={16} height={16} />
      )}

      {showBack && (
        <TouchableOpacity
          style={styles.backIconButton}
          onPress={() => {
            onBack ? onBack() : back();
          }}>
          <Back width={16} height={16} />
        </TouchableOpacity>
      )}

      {showLogo ? (
        <AssetImage image="logo" size={wp(5)} />
      ) : (
        title && <Text style={styles.title}>{title}</Text>
      )}

      {renderRight}

      <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
        {showNotify && (
          <TouchableOpacity style={styles.iconButton}>
            <Bell width={20} height={20} />
          </TouchableOpacity>
        )}
        {showLogout && (
          <TouchableOpacity style={styles.iconButton}>
            <Logout width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>
      {/* // {showLogo ? (
      //   <AssetImage image="logo" size={wp(6)} style={{marginLeft: wp(2.5)}} />
      // ) : (
      //   <View style={styles.titleContainer}>
      //     <TouchableOpacity
      //       style={styles.backIconButton}
      //       onPress={() => back()}>
      //       <Icon name="chevron-left" size={wp(6)} color="#ffffff" />
      //     </TouchableOpacity>

      //     {title && <Text style={styles.title}>{title}</Text>}
      //   </View>
      // )}

      // {renderRight ||
      //   (showDrawer && (
      //     <TouchableOpacity
      //       style={styles.backIconButton}
      //       onPress={toggleDrawer}>
      //       <Icon name="bars" size={wp(8)} color="#ffffff" />
      //     </TouchableOpacity>
      //   ))} */}

      {!!onPressScanner && (
        <TouchableOpacity onPress={onPressScanner}>
          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <Scanner height={16} width={16} />
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                textDecorationLine: 'underline',
              }}>
              Start Scan
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
