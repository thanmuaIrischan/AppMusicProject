import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import TrackPlayer, { Capability, State, usePlaybackState, useProgress } from 'react-native-track-player';
import { useRoute } from '@react-navigation/native';
import service from './service';

const fetchTrackUrl = async (trackId, accessToken) => {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch track URL');
    return '';
  }

  const data = await response.json();
  return data.preview_url || '';
};

const addSpotifyTrack = async (trackId, accessToken) => {
  const trackUrl = await fetchTrackUrl(trackId, accessToken);

  if (trackUrl) {
    await TrackPlayer.add({
      id: trackId,
      url: trackUrl,
      title: 'Track Title', // Placeholder, ideally fetch from API
      artist: 'Track Artist', // Placeholder, ideally fetch from API
      artwork: 'Track Artwork URL', // Placeholder, ideally fetch from API
    });
  } else {
    console.error('Track preview URL not available');
  }
};

const PLayStop = ({ token, trackId }) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const handlePlayPause = async () => {
    const currentState = await TrackPlayer.getState();
    console.log('Current playback state:', currentState);
    if (currentState === State.Playing) {
      await TrackPlayer.pause();
      console.log('Track paused');
    } else {
      await TrackPlayer.play();
      console.log('Track playing');
    }
  };

  const handlePlay = async () => {
    try {
      await TrackPlayer.reset();
      await addSpotifyTrack(trackId, token);
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View>
      <Button title="Play/Pause" onPress={handlePlayPause} />
      <Button title="Play New Track" onPress={handlePlay} />
      <Text style={styles.time}>
        {formatTime(progress.position)} / {formatTime(progress.duration)}
      </Text>
    </View>
  );
};

const Test = () => {
  const route = useRoute();
  const { token } = route.params;
  const [trackId, setTrackId] = useState('');

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
      TrackPlayer.reset(); // Use reset to clean up resources
    };
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Track ID"
        value={trackId}
        onChangeText={setTrackId}
      />
      <PLayStop token={token} trackId={trackId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  time: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

TrackPlayer.registerPlaybackService(() => service);

export default Test;
