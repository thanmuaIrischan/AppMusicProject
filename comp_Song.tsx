import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import MainSocial from './prj_MainSocial';
export type SongInfo = {
  nameSong: string;
  artistName: string;
  navigation: any;
};

class Song extends Component<{songInfo: SongInfo}> {
  render() {
    const {nameSong, artistName} = this.props.songInfo;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonPlaySong}>
          <Image
            style={styles.image}
            source={require('./assets/PlaySong.png')}
          />
        </TouchableOpacity>
        <View style={styles.contentSong}>
          <Text style={styles.nameSong}>{nameSong}</Text>
          <Text style={styles.artistName}>{artistName}</Text>
        </View>
        <TouchableOpacity style={styles.buttonAddSongToPlayList}>
          <Image
            style={styles.image}
            source={require('./assets/AddSongToPlaylist.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%', // Adjust to be responsive
    height: 100,
    backgroundColor: '#60539C',
    flexDirection: 'row',
    alignItems: 'center', // Center content vertically
    padding: 10, // Add some padding
    marginBottom: 10, // Add some margin between items
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonPlaySong: {
    width: 70,
    height: 70,
    backgroundColor: '#503399',
    borderRadius: 10,
    justifyContent: 'center', // Center icon inside button
    alignItems: 'center', // Center icon inside button
    marginRight: 10, // Space between button and text
  },
  contentSong: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', // Center text vertically
  },
  nameSong: {
    color: 'white',
    fontSize: 20,
  },
  artistName: {
    color: 'white',
    fontSize: 13,
  },
  buttonAddSongToPlayList: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default Song;
