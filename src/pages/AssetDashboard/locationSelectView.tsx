import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import useFetchApi from '../../hooks/useFetchApi';
import {ASSET_LOCATIONS, BUILDINGS, FLOORS, ROOMS} from '../../utlis/endpoints';

const LocationSelectView = ({
  keys,
  label,
  selectedLocation,
  setSelectedLocation,
}: any) => {
  const [items, setItems] = useState<any[]>([]);
  const {execute, loading} = useFetchApi({
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys]);

  return (
    <View
      style={{
        width: wp(90),
        marginHorizontal: wp(5),
      }}>
      <Text style={styles.label}>{label}</Text>
      {loading ? (
        <View
          style={{
            ...styles.dropdown,
            height: 40,
          }}
        />
      ) : (
        <Dropdown
          data={items}
          value={selectedLocation[keys as keyof typeof selectedLocation]}
          onChange={val =>
            setSelectedLocation({...selectedLocation, [keys]: val})
          }
          labelField={keys}
          valueField={keys}
          style={styles.dropdown}
        />
      )}
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
    marginTop: wp(3),
    marginBottom: wp(4),
  },
  label: {
    fontSize: wp(3.5),
    fontWeight: '600',
    letterSpacing: wp(0.15),
  },
});
