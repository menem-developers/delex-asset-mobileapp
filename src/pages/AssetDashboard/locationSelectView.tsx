import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import useFetchApi from 'hooks/useFetchApi';
import {
  ASSET_LOCATIONS,
  BUILDINGS,
  CUSTODIANS,
  FLOORS,
  GROUPINGS,
  ROOMS,
} from 'utlis/endpoints';

const LocationSelectView = ({
  keys,
  label,
  selectedLocation,
  setSelectedLocation,
}: {
  keys: any;
  label: any;
  selectedLocation: {
    location_name: any;
    building_name: any;
    floor_name: any;
    room_name: any;
    category_name: any;
    full_name: any;
  };
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{
      location_name: any;
      building_name: any;
      floor_name: any;
      room_name: any;
      category_name: any;
      full_name: any;
    }>
  >;
}) => {
  const [items, setItems] = useState<any[]>([]);
  const {execute} = useFetchApi({
    onSuccess: res => {
      if (res?.status === 200) {
        setItems(res?.data?.items);
      }
    },
    onError: err => console.log(err, 'err', keys),
  });

  useEffect(() => {
    if (keys === 'location_name') {
      execute(ASSET_LOCATIONS);
    } else if (keys === 'building_name') {
      execute(BUILDINGS);
    } else if (keys === 'floor_name') {
      execute(FLOORS);
    } else if (keys === 'room_name') {
      execute(ROOMS);
    } else if (keys === 'category_name') {
      execute(GROUPINGS + '?page=1&per_page=100');
    } else if (keys === 'full_name') {
      execute(CUSTODIANS + '/?page=1&per_page=100');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys]);

  const options = () => {
    switch (keys) {
      case 'building_name':
        return items.filter(
          itm => itm?.asset_location_id === selectedLocation?.location_name?.id,
        );
      case 'floor_name':
        return items.filter(
          itm => itm?.building_id === selectedLocation?.building_name?.id,
        );
      case 'room_name':
        return items.filter(
          itm =>
            itm?.building_id === selectedLocation?.building_name?.id &&
            itm?.floor_id === selectedLocation?.floor_name?.id,
        );
      case 'subroom_name':
        return items.filter(
          itm =>
            itm?.building_id === selectedLocation?.building_name?.id &&
            itm?.floor_id === selectedLocation?.floor_name?.id &&
            itm?.room_id === selectedLocation?.room_name?.id,
        );
      default:
        return items;
    }
  };

  const isDisabled =
    (keys === 'building_name' && selectedLocation.location_name === '') ||
    (keys === 'floor_name' && selectedLocation.building_name === '') ||
    (keys === 'room_name' && selectedLocation.floor_name === '');

  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: '4'}}>
      <Text style={isDisabled ? styles.labelDisabled : styles.label}>
        {label}
        {label === 'Main' && '*'}
      </Text>
      <Dropdown
        data={options()}
        disable={isDisabled}
        value={selectedLocation[keys as keyof typeof selectedLocation]}
        onChange={val => {
          if (keys === 'location_name') {
            setSelectedLocation(prev => {
              return {
                ...prev,
                location_name: val,
                building_name: '',
                floor_name: '',
                room_name: '',
              };
            });
          }
          if (keys === 'building_name') {
            setSelectedLocation(prev => {
              return {
                ...prev,
                building_name: val,
                floor_name: '',
                room_name: '',
              };
            });
          }
          if (keys === 'floor_name') {
            setSelectedLocation(prev => {
              return {
                ...prev,
                floor_name: val,
                room_name: '',
              };
            });
          }
          if (keys === 'room_name') {
            setSelectedLocation(prev => {
              return {
                ...prev,
                room_name: val,
              };
            });
          } else {
            setSelectedLocation(prev => {
              return {
                ...prev,
                [keys]: val,
              };
            });
          }
        }}
        labelField={keys}
        valueField={keys}
        style={isDisabled ? styles.dropdownDisabled : styles.dropdown}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        inputSearchStyle={styles.inputSearchStyle}
        search
        iconColor={isDisabled ? '#B5BABE' : '#858C93'}
        searchPlaceholder="Enter Here"
        placeholderStyle={isDisabled ? styles.disabledPlaceholder : ''}
        activeColor={'#D4E2F0'}
        flatListProps={{
          ListEmptyComponent: () => (
            <Text style={styles.noRecord}>No records found!</Text>
          ),
        }}
      />
    </View>
  );
};

export default LocationSelectView;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 6,
    padding: wp(3),
    paddingRight: wp(4),
  },
  containerStyle: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemContainerStyle: {
    borderRadius: 8,
    margin: 4,
  },
  inputSearchStyle: {
    borderRadius: 8,
  },
  dropdownDisabled: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 6,
    padding: wp(3),
    paddingRight: wp(4),
    color: '#B5BABE',
  },
  disabledPlaceholder: {
    color: '#B5BABE',
  },
  label: {
    fontSize: wp(3.5),
    fontWeight: '600',
    letterSpacing: wp(0.15),
    color: '#3b475b',
  },
  labelDisabled: {
    fontSize: wp(3.5),
    fontWeight: '600',
    letterSpacing: wp(0.15),
    color: '#848b98',
  },
  noRecord: {
    fontSize: wp(3.5),
    letterSpacing: wp(0.15),
    padding: 12,
  },
});
