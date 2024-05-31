import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ShowPlaylistNavigationProp} from './types';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export type PlaylistInfo = {
  id: string;
  name: string;
  description: string;
  images: string[];
  //owner: string;
};

type PlaylistProps = {
  playlistInfo: PlaylistInfo;
  token: string;
};

const addSongToPlaylist = async (trackId, accessToken, playlistId) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST', // Use the POST method
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json' // Ensure the content type is set to JSON
    },
    body: JSON.stringify({
      uris: [`spotify:track:${trackId}`], // The uris field should be an array
    }),
  });

  if (!response.ok) {
    console.error('Failed to add track', response.statusText);
    return '';
  } else {
    console.log('Track added successfully');
    return 'Track added successfully';
  }
};


const Playlist: React.FC<PlaylistProps> = ({playlistInfo, token, mode}) => {
  const addedTrackId = useSelector((state: RootState) => state.global.addedTrackId);
  const navigation = useNavigation<ShowPlaylistNavigationProp>();
  const {id, name, description, images} = playlistInfo || {}; // Kiểm tra playlistInfo trước khi truy cập

  const handlePress = () => {
    if (id && token) {
      if(mode === 'view'){
        // Kiểm tra id và token trước khi navigate
        navigation.navigate('ShowPlaylist', {playlistId: id, token});
      }
      else if (mode === 'add'){
        addSongToPlaylist(addedTrackId, token, id);
        //navigation.navigate('MainMyPlaylist', token);
        navigation.goBack();
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonShowPlaylist} onPress={handlePress}>
        {images && images[0] ? (
          <Image style={styles.image} source={{uri: images[0]}} />
        ) : (
          <Image
            style={styles.image}
            source={require('./assets/ShowPlaylist.png')}
          />
        )}
      </TouchableOpacity>

      <View style={styles.contentPlaylist}>
        <Text style={styles.name}>{name}</Text>
      </View>
      {/*
      <TouchableOpacity style={styles.buttonDeletePlaylist}>
        <Image style={styles.image} source={require('./assets/Delete.png')} />
      </TouchableOpacity>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Adjust to be responsive
    height: 70,
    //backgroundColor: '#60539C',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonShowPlaylist: {
    width: 50,
    height: 50,
    backgroundColor: '#503399',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  contentPlaylist: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 17,
  },
  /*
  id: {
    color: 'white',
    fontSize: 13,
  },

  */

  description: {
    color: 'white',
    fontSize: 10,
  },
  buttonDeletePlaylist: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default Playlist;
