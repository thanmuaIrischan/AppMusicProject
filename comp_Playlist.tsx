import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import MainSocial from './prj_MainSocial';
export type PlaylistInfo = {
  namePlaylist: string;
  Description: string;
  DateReleased: string;
  navigation: any;
  listSongs: any;
};

class Playlist extends Component<{playlistInfo: PlaylistInfo}> {
  render() {
    const {namePlaylist, DateReleased} = this.props.playlistInfo;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonShowPlaylist}>
          <Image
            style={styles.image}
            source={require('./assets/ShowPlaylist.png')}
          />
        </TouchableOpacity>
        <View style={styles.contentPlaylist}>
          <Text style={styles.namePlaylist}>{namePlaylist}</Text>
          <Text style={styles.DateReleased}>{DateReleased}</Text>
        </View>
        <TouchableOpacity style={styles.buttonDeletePlaylist}>
          <Image style={styles.image} source={require('./assets/Delete.png')} />
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
  buttonShowPlaylist: {
    width: 70,
    height: 70,
    backgroundColor: '#503399',
    borderRadius: 10,
    justifyContent: 'center', // Center icon inside button
    alignItems: 'center', // Center icon inside button
    marginRight: 10, // Space between button and text
  },
  contentPlaylist: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', // Center text vertically
  },
  namePlaylist: {
    color: 'white',
    fontSize: 20,
  },
  DateReleased: {
    color: 'white',
    fontSize: 13,
  },
  buttonDeletePlaylist: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default Playlist;
