import React, {ComponentProps, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ScreenContainer} from 'components';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from './styles';
import Icon from '@react-native-vector-icons/fontawesome6-pro';
import {navigate} from 'routes/utils';
import {useBackHandler} from '@react-native-community/hooks';

interface IAssetInfoData {
  title: string;
  color: string;
  value: string;
}
interface IMenuItem {
  icon: ({iconStyle?: never} & ComponentProps<typeof Icon>)['name'];
  title: string;
  route?: keyof RootParamList;
}

export const AssetDashboardScreen = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | undefined>('');
  const [locationDropdownData, setlocationDropdownData] = useState({
    buildingName: {
      data: [{label: 'label', value: 'label'}],
      labelField: 'label',
      valueField: 'value',
    },
    room: {
      data: [{label: 'label', value: 'label'}],
      labelField: 'label',
      valueField: 'value',
    },
    category: {
      data: [{label: 'label', value: 'label'}],
      labelField: 'label',
      valueField: 'value',
    },
  });
  const [selectedLocation, setSelectedLocation] = useState({
    buildingName: '',
    room: '',
    category: '',
  });

  const assetInfoData: Array<IAssetInfoData> = [
    {value: '3500', title: 'Active Assets', color: '#1E90FF'},
    {value: '145', title: 'Registered', color: '#28A745'},
  ];

  const menuItemList: Array<IMenuItem> = [
    {icon: 'circle-plus', title: 'Asset Registration', route: 'AssetList'},
    {icon: 'grid-2-plus', title: 'Asset Re-Registration'},
    {
      icon: 'pen-to-square',
      title: 'Asset Activation/Deactivation',
    },
  ];

  useBackHandler(() => {
    if (selectedRoute) {
      setSelectedRoute('');
      return true;
    }

    return false;
  });

  const handleMenuClick = (item: IMenuItem) => {
    setSelectedRoute(item.route);
  };

  const renderLocationSelectView = () => {
    return [
      {key: 'buildingName', label: 'Building Name'},
      {key: 'room', label: 'Room'},
      {key: 'category', label: 'Category'},
    ].map(el => {
      return (
        <View
          key={el.key}
          style={{
            width: wp(90),
            marginHorizontal: wp(5),
          }}>
          <Text
            style={{
              fontSize: wp(3.5),
              fontWeight: '600',
              letterSpacing: wp(0.15),
            }}>
            {el.label}
          </Text>

          <Dropdown
            data={[{label: 'label', value: 'label'}]}
            value={selectedLocation[el.key as keyof typeof selectedLocation]}
            onChange={val =>
              setSelectedLocation({...selectedLocation, [el.key]: val})
            }
            labelField={'label'}
            valueField={'value'}
            style={{
              borderWidth: 1,
              borderColor: '#E6E6E6',
              borderRadius: 6,
              padding: wp(3),
              paddingRight: wp(4),
              marginTop: wp(3),
              marginBottom: wp(4),
            }}
          />
        </View>
      );
    });
  };

  return (
    <ScreenContainer
      title={selectedRoute ? 'Asset Registration' : 'Registration'}
      onBack={selectedRoute ? () => setSelectedRoute('') : undefined}
      showBack>
      <ScrollView>
        <View style={styles.assetDataCard}>
          <Text
            style={{
              fontSize: wp(5),
              fontWeight: '600',
              letterSpacing: wp(0.2),
              paddingHorizontal: wp(4),
              marginTop: wp(4),
            }}>
            Overview
          </Text>
          {/* <Dropdown
            labelField={'label'}
            valueField={'value'}
            data={[{label: 'Main Office', value: 'main_office'}]}
            value={selectedLocation}
            onChange={setSelectedLocation}
            style={styles.selectLocation}
            placeholder="Select Location"
            placeholderStyle={styles.selectLocationPlaceholder}
            selectedTextStyle={styles.selectLocationText}
            renderLeftIcon={() => (
              <Icon
                name="location-dot"
                size={wp(5)}
                color="#1E90FF"
                style={{marginRight: wp(2)}}
              />
            )}
          /> */}
          <View style={styles.assetInfoContainer}>
            {assetInfoData.map((el, i) => (
              <View style={styles.assetInfoCard} key={i}>
                <View
                  style={[styles.radioDotContainer, {borderColor: el.color}]}>
                  <View
                    style={[styles.radioDot, {backgroundColor: el.color}]}
                  />
                </View>
                <View style={{gap: wp(1)}}>
                  <Text style={styles.assetInfoValue}>{el.value}</Text>
                  <Text style={styles.assetInfoTitle}>{el.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {selectedRoute
          ? renderLocationSelectView()
          : menuItemList.map((el, i) => {
              return (
                <TouchableOpacity
                  style={styles.menuButton}
                  key={i}
                  onPress={() => handleMenuClick(el)}>
                  <View style={styles.menuTitleContainer}>
                    <Icon name={el.icon} color="#002B5C" size={wp(5)} />
                    <Text style={styles.menuTitle}>{el.title}</Text>
                  </View>
                  <Icon name="chevron-right" color="#AAAFB4" size={wp(5)} />
                </TouchableOpacity>
              );
            })}
      </ScrollView>

      <View style={styles.footer}>
        {selectedRoute ? (
          <TouchableOpacity
            style={StyleSheet.compose(styles.backButton, styles.submitButton)}
            onPress={() => {
              selectedLocation.buildingName &&
                selectedLocation.category &&
                selectedLocation.room &&
                navigate('AssetList');
            }}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigate('Home')}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenContainer>
  );
};
