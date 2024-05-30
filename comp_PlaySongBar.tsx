import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AddNewPlaylistNavigationProp} from './types';

const PlaySongBar = ({routeToken}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(200);
  const navigation = useNavigation<AddNewPlaylistNavigationProp>();
  const [storedToken, setStoredToken] = useState('');

  useEffect(() => {
    setStoredToken(routeToken);
  }, [routeToken]);

  useEffect(() => {
    // Lấy token từ AsyncStorage khi component được render
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setStoredToken(storedToken);
      }
    };

    getToken();
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value: number) => {
    setCurrentTime(value);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAddPlaylist = () => {
    if (storedToken || routeToken) {
      navigation.navigate('AddNewPlaylist', {token: storedToken || routeToken});
    } else {
      console.warn('Token is missing. Please make sure it is available.');
    }
  };

  return (
    <View style={styles.PlaySongBarContainer}>
      <View style={styles.SongNameContainer}>
        <Text style={styles.SongNameText}>Song Name</Text>
      </View>

      <View style={styles.MusicControlsContainer}>
        <View style={styles.layoutSliderSong}>
          <Text style={styles.CurrentTimeText}>{formatTime(currentTime)}</Text>
          <Slider
            style={styles.Slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#8E8E93"
            thumbTintColor="#1EB1FC"
          />
          <Text style={styles.DurationText}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.layoutPlaySongButton}>
          <View style={styles.centerContainer}>
            <TouchableOpacity>
              <Image
                style={styles.Button}
                source={require('./assets/PreviousButton.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayPause}>
              <Image
                style={styles.Button}
                source={
                  isPlaying
                    ? require('./assets/PauseButton.png')
                    : require('./assets/PlayButton.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.Button}
                source={require('./assets/NextButton.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.rightButton}
            onPress={handleAddPlaylist}>
            <Image
              style={styles.Button}
              source={require('./assets/AddPlaylist.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PlaySongBarContainer: {
    flexDirection: 'column',
    padding: 10,
    borderTopWidth: 1,
    backgroundColor: '#60539C',
  },
  SongNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SongNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  LikeButton: {
    width: 30,
    height: 30,
  },
  MusicControlsContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  Button: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  Slider: {
    flex: 1,
  },
  TimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  CurrentTimeText: {
    fontSize: 12,
  },
  DurationText: {
    fontSize: 12,
  },
  layoutSliderSong: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    width: '100%',
  },
  layoutPlaySongButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    position: 'relative',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
  },
  rightButton: {
    position: 'absolute',
    right: 0,
  },
  centerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlaySongBar;
