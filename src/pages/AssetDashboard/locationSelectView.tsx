import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import useFetchApi from 'hooks/useFetchApi';
import {
  ASSET_LOCATIONS,
  BUILDINGS,
  FLOORS,
  ROOMS,
  SUBROOMS,
} from 'utlis/endpoints';

const LocationSelectView = ({
  keys,
  label,
  selectedLocation,
  setSelectedLocation,
}: any) => {
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
    } else if (keys === 'subroom_name') {
      execute(SUBROOMS);
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

  return (
    <View style={{display: 'flex', flexDirection: 'column', gap: '4'}}>
      <Text style={styles.label}>
        {label}
        {label === 'Main' && '*'}
      </Text>
      <Dropdown
        data={options()}
        value={selectedLocation[keys as keyof typeof selectedLocation]}
        onChange={val => {
          setSelectedLocation({...selectedLocation, [keys]: val});
        }}
        labelField={keys}
        valueField={keys}
        style={styles.dropdown}
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
  label: {
    fontSize: wp(3.5),
    fontWeight: '600',
    letterSpacing: wp(0.15),
  },
  noRecord: {
    fontSize: wp(3.5),
    letterSpacing: wp(0.15),
    padding: 12,
  },
});
