import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Song, {SongInfo} from './comp_Song'; // Import Song component and SongInfo type
import React, {useState, useRef} from 'react';
// import component SwitchMain
import SwitchMain from './comp_SwitchMainBar';

import PlaySongBar from './comp_PlaySongBar';
//
import {useNavigation} from '@react-navigation/native';
//
import HeaderBar from './comp_HeaderBar';

function ShowPlaylist() {
  const [hideComponents, setHideComponents] = useState(false);
  const scrollOffset = useRef(0);
  const navigation = useNavigation();

  // Danh sách các bài hát
  const songs: SongInfo[] = [
    {nameSong: 'Song 1', artistName: 'Artist 1', navigation: null},
    {nameSong: 'Song 2', artistName: 'Artist 2', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
    {nameSong: 'Song 3', artistName: 'Artist 3', navigation: null},
  ];

  const handleScroll = (event: any) => {
    // Specify the type of 'event' parameter
    const offsetY = event.nativeEvent.contentOffset.y;
    const isScrollingUp = offsetY > scrollOffset.current; // Check if scrolling up
    scrollOffset.current = offsetY; // Update scroll offset

    if (isScrollingUp) {
      setHideComponents(true); // Hide components when scrolling up
    } else {
      setHideComponents(false); // Show components when scrolling down
    }
  };

  // Render hidden components only if hideComponents is false

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.ReturnIcon}
              source={require('./assets/Return.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.ContentPlaylist}>
          <Text style={styles.Title}>Playlist Name</Text>
          <Text style={styles.Description}>Description</Text>
          <View style={styles.containerDescription}></View>
        </View>
        {/* ScrollView */}
        <ScrollView
          contentContainerStyle={styles.scrollContainerNewSong}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {/* List of songs */}
          {songs.map((song, index) => (
            <Song key={index} songInfo={song} />
          ))}
        </ScrollView>
        <PlaySongBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ReturnIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
  scrollContainerNewSong: {},
  SeeAllNewSongContainer: {
    flexDirection: 'row',
    width: '100%',
    height: hp('5%'),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  ContentPlaylist: {
    width: '100%',
    height: hp('20%'),
    justifyContent: 'center',
  },
  Title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  Description: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },
  containerDescription: {
    width: '90%',
    height: hp('10%'),
    backgroundColor: '#60539C',
    marginLeft: 10,
    borderRadius: 10,
  },
});

export default ShowPlaylist;
