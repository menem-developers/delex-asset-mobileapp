import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import {Divider, Progressbar, ScreenContainer} from 'components';
import styles from './styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '@react-native-vector-icons/fontawesome6-pro';
import {navigate} from 'routes/utils';

type ISelectedTab = 'open_assets' | 'completed';

export const AssetListScreen = () => {
  const [selectedTab, setSelectedTab] = useState<ISelectedTab>('open_assets');

  return (
    <ScreenContainer title="Asset List" showBack>
      <LinearGradient
        start={{x: 0, y: 0.1}}
        end={{x: 0, y: 0.9}}
        colors={['rgba(73, 114, 156, 0.50)', '#E1EBF5', '#E8EFF6', '#94AEC8']}
        style={styles.statsCardBg}>
        <View style={styles.statsCard}>
          <View style={styles.statsLocationDetailsConatiner}>
            <View>
              <Text style={styles.statsLocationTitle}>Building Name</Text>
              <Text style={styles.statsLocationValue}>Annex Hall</Text>
            </View>

            <Divider orientation="vertical" size={2} />

            <View>
              <Text
                style={StyleSheet.compose(styles.statsLocationTitle, {
                  textAlign: 'center',
                })}>
                Room
              </Text>
              <Text style={styles.statsLocationValue}>Electronics</Text>
            </View>

            <Divider orientation="vertical" size={2} />

            <View>
              <Text
                style={StyleSheet.compose(styles.statsLocationTitle, {
                  textAlign: 'right',
                })}>
                Category
              </Text>
              <Text style={styles.statsLocationValue}>Electronics</Text>
            </View>
          </View>

          <Divider orientation="horizontal" size={2} />

          <Text style={styles.taggingText}>Tagging progress</Text>

          <View style={{gap: wp(2)}}>
            <View style={styles.progressInfoContainer}>
              <Text style={styles.progressPercentageText}>0% Completed</Text>
              <Text style={styles.taggingCountText}>
                <Text style={{color: '#1E90FF'}}>0</Text> / 120
              </Text>
            </View>

            <Progressbar color={'blue'} size={6} progress={0} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab('open_assets')}
          style={StyleSheet.compose(styles.tabButton, {
            backgroundColor:
              selectedTab === 'open_assets' ? '#1E90FF' : '#F4F4F4',
          })}>
          <Text
            style={StyleSheet.compose(styles.tabButtonText, {
              color: selectedTab === 'open_assets' ? '#FAFBFF' : '#6A6A6A',
            })}>
            Open Assets
          </Text>
          {selectedTab === 'open_assets' && (
            <Text style={styles.tabBadge}>120</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('completed')}
          style={StyleSheet.compose(styles.tabButton, {
            backgroundColor:
              selectedTab === 'completed' ? '#1E90FF' : '#F4F4F4',
          })}>
          <Text
            style={StyleSheet.compose(styles.tabButtonText, {
              color: selectedTab === 'completed' ? '#FAFBFF' : '#6A6A6A',
            })}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 12,
          borderColor: '#E6E6E6',
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: wp(5),
          marginBottom: wp(3),
          paddingHorizontal: wp(3),
          gap: wp(3),
        }}>
        <Icon name="magnifying-glass" size={wp(5)} color="#858C93" />
        <TextInput
          style={{
            flex: 1,
            fontSize: wp(3.5),
            fontWeight: '400',
            letterSpacing: wp(0.2),
          }}
          placeholder="Search"
          placeholderTextColor="#B4B9C2"
        />
      </View>

      <Fragment>
        <TouchableOpacity
          style={styles.assetDataCard}
          onPress={() => navigate('AssetDetails')}>
          <View style={styles.assetDataContainer}>
            <Text style={styles.assetDataTitle}>
              Dell Inspiron 14” Laptop 123L
            </Text>
            <Text style={styles.assetDataDesc}>DEL250300001</Text>
          </View>
          <Icon name="chevron-right" size={wp(5)} color="#AAAFB4" />
        </TouchableOpacity>

        <Divider orientation="horizontal" />
      </Fragment>

      <Fragment>
        <TouchableOpacity
          style={styles.assetDataCard}
          onPress={() => navigate('AssetDetails')}>
          <View style={styles.assetDataContainer}>
            <Text style={styles.assetDataTitle}>
              Dell Inspiron 14” Laptop 123L
            </Text>
            <Text style={styles.assetDataDesc}>DEL250300001</Text>
          </View>
          <Icon name="chevron-right" size={wp(5)} color="#AAAFB4" />
        </TouchableOpacity>

        <Divider orientation="horizontal" />
      </Fragment>
    </ScreenContainer>
  );
};
