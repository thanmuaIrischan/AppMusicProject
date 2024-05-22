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

function MainSocial() {
  const [hideComponents, setHideComponents] = useState(false);
  const scrollOffset = useRef(0);
  const navigation = useNavigation();

  // Danh sách các bài hát
  const songs: SongInfo[] = [
      {nameSong: 'Map', artistName: 'Maroon 5', navigation: null},
      {nameSong: 'Tek it', artistName: 'Selena Gomez', navigation: null},
      {nameSong: 'Ghost', artistName: 'Justin Bieber', navigation: null},
      {nameSong: 'Love game', artistName: 'Lady gaga', navigation: null},
      {nameSong: 'Is there someone else ?', artistName: 'The weeknd', navigation: null},
      {nameSong: 'Take you dancing', artistName: 'jason', navigation: null},
      {nameSong: 'Enough', artistName: 'Zara Larson', navigation: null},
      {nameSong: 'Water', artistName: 'Tyla', navigation: null},
      {nameSong: 'Die for you', artistName: 'The weeknd', navigation: null},
      {nameSong: 'Map into light', artistName: 'The weeknd', navigation: null},
      {nameSong: 'Experience', artistName: 'Ludovico', navigation: null},

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
        <HeaderBar />

        {/* SwitchMainContainer */}
        <SwitchMain />
        {/* SeeAllNewSongContainer */}
        <View style={styles.SeeAllNewSongContainer}>
          <Text style={styles.seeAllText}>New Songs</Text>
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

export default MainSocial;
