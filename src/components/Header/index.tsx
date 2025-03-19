import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {back, toggleDrawer} from 'routes/utils';
import {AssetImage} from 'components/AssetImage';
import Icon from '@react-native-vector-icons/fontawesome6-pro';

interface IHeaderProps {
  title?: string;
  showLogo?: boolean;
  renderRight?: React.ReactNode;
  showDrawer?: boolean;
  showBack?: boolean;
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
    onBack,
  } = props;

  return (
    <View style={styles.container}>
      {showDrawer && (
        <Icon
          name="bars"
          size={wp(7)}
          color="#ffffff"
          style={{marginLeft: wp(1)}}
        />
      )}

      {showBack && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            onBack ? onBack() : back();
          }}>
          <Icon name="chevron-left" size={wp(6)} color="#ffffff" />
        </TouchableOpacity>
      )}

      {showLogo ? (
        <AssetImage image="logo" size={wp(6)} />
      ) : (
        title && <Text style={styles.title}>{title}</Text>
      )}

      {renderRight}

      {showNotify && (
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bell" iconStyle="solid" size={wp(6)} color="#ffffff" />
        </TouchableOpacity>
      )}
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
    </View>
  );
};
