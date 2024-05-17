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
function MainMyPlaylist() {
  const [hideComponents, setHideComponents] = useState(false);
  const scrollOffset = useRef(0);

  // Danh sách các bài hát
  const playlists: PlaylistInfo[] = [
    {
      namePlaylist: 'Playlist 1',
      Description: 'Description 1',
      DateReleased: 'DateReleased 1',
      navigation: null,
      listSongs: null,
    },
    {
      namePlaylist: 'Playlist 1',
      Description: 'Description 1',
      DateReleased: 'DateReleased 1',
      navigation: null,
      listSongs: null,
    },
    {
      namePlaylist: 'Playlist 1',
      Description: 'Description 1',
      DateReleased: 'DateReleased 1',
      navigation: null,
      listSongs: null,
    },
    {
      namePlaylist: 'Playlist 1',
      Description: 'Description 1',
      DateReleased: 'DateReleased 1',
      navigation: null,
      listSongs: null,
    },
    {
      namePlaylist: 'Playlist 1',
      Description: 'Description 1',
      DateReleased: 'DateReleased 1',
      navigation: null,
      listSongs: null,
    },
    {
      namePlaylist: 'Playlist 1',
      Description: 'Description 1',
      DateReleased: 'DateReleased 1',
      navigation: null,
      listSongs: null,
    },
    {
      namePlaylist: 'Playlist 1',
      Description: 'Description 1',
      DateReleased: 'DateReleased 1',
      navigation: null,
      listSongs: null,
    },
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
  {
    !hideComponents && (
      <>
        <SwitchMain />
        <View style={styles.SeeAllNewSongContainer}>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Image
              style={styles.searchIcon}
              source={require('./assets/Search.png')}
            />
          </TouchableOpacity>
        </View>

        {/* SwitchMainContainer */}
        <SwitchMain />
        {/* SeeAllNewSongContainer */}
        <View style={styles.SeeAllNewSongContainer}>
          <Text style={styles.seeAllText}>My Playlists</Text>
        </View>

        {/* ScrollView */}
        <ScrollView
          contentContainerStyle={styles.scrollContainerNewSong}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {/* List of songs */}
          {playlists.map((playlist, index) => (
            <Playlist key={index} playlistInfo={playlist} />
          ))}
        </ScrollView>
        <PlaySongBar />
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
    alignItems: 'flex-end',
  },
  searchIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  scrollContainerNewSong: {},
  SeeAllNewSongContainer: {
    flexDirection: 'row',
    width: '100%',
    height: hp('5%'),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  seeAllText: {
    color: 'white',
    fontSize: 20,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
  },

  // comp_playsongbar.tsx
  PlaySongBarContainer: {
    width: '100%',
    height: hp('17%'),
    backgroundColor: '#60539C',
  },
  SongNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LikeButton: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 10,
  },
  SongNameText: {
    color: 'black',
    fontSize: 25,
    marginTop: 10,
    marginLeft: 15,
  },
});

export default MainMyPlaylist;
