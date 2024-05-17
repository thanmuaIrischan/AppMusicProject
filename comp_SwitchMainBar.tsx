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
const SwitchMain = () => {
  return (
    <View style={styles.SwitchMainContainer}>
      <TouchableOpacity style={styles.SocialButton}>
        <Image
          source={require('./assets/SocialIcon.png')}
          style={styles.buttonImage}></Image>
        <Text style={styles.buttonTextSocial}>Social</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.MyPlaylistButton}>
        <Image
          source={require('./assets/MyPlaylistIcon.png')}
          style={styles.buttonImage}></Image>
        <Text style={styles.buttonTextMyPlayList}>My Playlist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // comp_switchMainBar.tsx

  SwitchMainContainer: {
    width: '100%',
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  SocialButton: {
    width: '30%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MyPlaylistButton: {
    width: '30%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  buttonTextMyPlayList: {
    position: 'absolute',
    color: 'white',
    fontSize: 16,
  },
  buttonTextSocial: {
    position: 'absolute',
    color: 'black',
    fontSize: 16,
  },
});

export default SwitchMain;
