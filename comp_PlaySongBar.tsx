import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { Capability, State, usePlaybackState, useProgress } from 'react-native-track-player';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { setCurrentTrackId, setTrackQueue, setCurrentPosition, setTimer } from './globalSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {AddNewPlaylistNavigationProp} from './types';

const PlaySongBar = ({routeToken}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(200);
  const [title, setTitle] = useState<string>('');
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const navigation = useNavigation<AddNewPlaylistNavigationProp>();
  const currentTrackId = useSelector((state: RootState) => state.global.currentTrackId);
  const trackQueue = useSelector((state: RootState) => state.global.trackQueue);
  const currentPosition = useSelector((state: RootState) => state.global.currentPosition);
  const timer = useSelector((state: RootState) => state.global.timer);
  const dispatch = useDispatch();
  const [storedToken, setStoredToken] = useState('');
  const [isPlayable, setIsPlayable] = useState<boolean>(false);

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

  const handlePlayPause = useCallback(async () => {
    const currentState = await TrackPlayer.getState();
    console.log('Current playback state:', currentState);
    if (currentState === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
      console.log('Track paused');
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
      console.log('Track playing');
    }
  }, []);

  const addTrackQueue = useCallback((newId) => {
    const newQueue = [...trackQueue.slice(0, currentPosition + 1), newId];
    dispatch(setTrackQueue(newQueue));
    dispatch(setCurrentPosition(currentPosition + 1));
  }, [dispatch, trackQueue, currentPosition]);

  const handlePlayNew = useCallback(async () => {
    try {
      await TrackPlayer.reset();
      await addSpotifyTrack(currentTrackId, routeToken);
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing track:', error);
    }
  }, [currentTrackId, routeToken]);

  const handlePrevTrack = useCallback(async () => {
    if (currentPosition > 0) {
      dispatch(setCurrentTrackId(trackQueue[currentPosition - 1]));
      dispatch(setCurrentPosition(currentPosition - 1));
      dispatch(setCurrentTrackId(trackQueue[currentPosition - 1]));
      addSpotifyTrack(currentTrackId, routeToken);
    }
  }, [dispatch, trackQueue, currentPosition, routeToken, currentTrackId]);

  const handleNextTrack = useCallback(async () => {
    if (currentPosition < trackQueue.length - 1) {
      dispatch(setCurrentTrackId(trackQueue[currentPosition + 1]));
      dispatch(setCurrentPosition(currentPosition + 1));
      dispatch(setCurrentTrackId(trackQueue[currentPosition + 1]));
      addSpotifyTrack(currentTrackId, routeToken);
    }
  }, [dispatch, trackQueue, currentPosition, routeToken, currentTrackId]);

  const addSpotifyTrack = async (trackId, accessToken) => {
    const trackInfo = await fetchTrackUrl(trackId, accessToken);

    const trackUrl = trackInfo.preview_url;
    setTitle(trackInfo.name);

    if (trackUrl != '' || trackUrl != null) {
      setIsPlayable(true);
      await TrackPlayer.add({
        id: trackId,
        url: trackUrl,
        title: trackInfo.name,
      });
    } else {
      setIsPlayable(false);
    }
  };

  const fetchTrackUrl = async (trackId, accessToken) => {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (data.preview_url === '' || data.preview_url === null) {
          console.error('Failed to fetch track URL');
          return '';
        }

    return {
      preview_url: data.preview_url || '',
      name: data.name,
    };
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

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    };

    setupPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  useEffect(() => {
    if (currentTrackId) {
      (async () => {
        await TrackPlayer.reset();
        await addSpotifyTrack(currentTrackId, routeToken);
        await TrackPlayer.play();
        if(isPlayable){
          if(!trackQueue.includes(currentTrackId)){
            addTrackQueue(currentTrackId);
          }
        }
      })();
    }
  }, [currentTrackId, routeToken]);

  return (
    <View style={styles.PlaySongBarContainer}>
      <View style={styles.SongNameContainer}>
        <Text style={styles.SongNameText}>{title}</Text>
      </View>

      <View style={styles.MusicControlsContainer}>
        <View style={styles.layoutSliderSong}>
          <Text style={styles.CurrentTimeText}></Text>
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
          <Text style={styles.DurationText}></Text>
        </View>
        <View style={styles.layoutPlaySongButton}>
          <View style={styles.centerContainer}>
            <TouchableOpacity onPress={handlePrevTrack}>
              <Image
                style={styles.Button}
                source={require('./assets/PreviousButton.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause}>
              <Image
                style={styles.Button}
                source={
                  isPlaying
                    ? require('./assets/PauseButton.png')
                    : require('./assets/PlayButton.png')
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextTrack}>
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

TrackPlayer.registerPlaybackService(() => require('./service'));

export default PlaySongBar;
