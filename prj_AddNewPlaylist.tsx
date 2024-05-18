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
import {TextInput} from 'react-native-gesture-handler';
import {s} from 'react-native-size-matters';
//
function AddNewPlaylist() {
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
        <View style={styles.WrapperContainer}>
          <View style={styles.AddNewPlaylistContainer}>
            <Text style={styles.text}>Name Playlists</Text>
            <TextInput style={styles.Input}></TextInput>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.textInput}
              textAlignVertical="top"
              multiline
              numberOfLines={4} // Số lượng dòng mặc định hiển thị
              placeholder=""
            />
            <TouchableOpacity style={styles.SaveButton}>
              <Text style={styles.textSave}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    alignItems: 'flex-start',
  },
  ReturnIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  WrapperContainer: {
    width: '100%',
    height: hp('70%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddNewPlaylistContainer: {
    height: hp('60%'),
    width: '90%',
    justifyContent: 'flex-start',
    backgroundColor: '#D9B2C6',
    alignItems: 'flex-start',
    borderRadius: 30,
  },
  text: {
    fontSize: 20,
    color: '#515098',
    padding: 10,
  },
  Input: {
    width: '94%',
    backgroundColor: '#896BC5',
    borderRadius: 50,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
  },
  textInput: {
    width: '94%',
    height: 200,
    backgroundColor: '#896BC5',
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
  },
  SaveButton: {
    width: '30%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#503399',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSave: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default AddNewPlaylist;
