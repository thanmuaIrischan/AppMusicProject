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
import Playlist, {PlaylistInfo} from './comp_Playlist';
//
import {useNavigation} from '@react-navigation/native';
//
function ShowLyricsSong() {
  const [hideComponents, setHideComponents] = useState(false);
  const scrollOffset = useRef(0);
  const navigation = useNavigation();
  // Danh sách các bài hát

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
        {/* SeeAllNewSongContainer */}
        <View style={styles.NameSongContainer}>
          <Text style={styles.nameSongText}>Map</Text>
        </View>

        {/* ScrollView */}
        <ScrollView
          contentContainerStyle={styles.scrollContainerLyrics}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {/* lyrics */}
          <Text style={styles.lyricsText}></Text>
        </ScrollView>
        <PlaySongBar token={token} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
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
  scrollContainerLyrics: {
    backgroundColor: '#D9B2C6',
    alignItems: 'center',
  },
  NameSongContainer: {
    flexDirection: 'row',
    width: '100%',
    height: hp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameSongText: {
    color: 'white',
    fontSize: 30,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  lyricsText: {
    color: 'white',
    fontSize: 20,
    marginRight: 15,
    marginLeft: 35,
    marginBottom: 15,
    marginTop: 15,
  },
});

export default ShowLyricsSong;
