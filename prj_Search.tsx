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
import {TextInput} from 'react-native-gesture-handler';
//

function Search() {
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

        {/* SwitchMainContainer */}

        {/* SeeAllNewSongContainer */}
        <View style={styles.SearchContainer}>
          <TextInput style={styles.textInput}></TextInput>
          <TouchableOpacity>
            <Image
              style={styles.searchIcon}
              source={require('./assets/Search.png')}
            />
          </TouchableOpacity>
        </View>

        {/* ScrollView */}
        <ScrollView
          contentContainerStyle={styles.scrollContainerNewSong}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {/* List of songs search by user */}
        </ScrollView>
        {/*<PlaySongBar />*/}
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
  scrollContainerNewSong: {
    backgroundColor: '#60539C',
    borderWidth: 1,
    borderColor: '#60539C',
  },
  SearchContainer: {
    flexDirection: 'row',
    width: '100%',
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    //borderColor: 'white',
    //borderWidth: 1,
  },
  textInput: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 50,
    marginLeft: 10,
  },
  ReturnIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
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

export default Search;
