import React, { useEffect, useContext, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { PlayerProvider, PlayerContext } from './PlayerContext';
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Test: { token: string };
};

type TestRouteProp = RouteProp<RootStackParamList, 'Test'>;

const Test: React.FC = () => {
  const route = useRoute<TestRouteProp>();
  const { token } = route.params;
  const { currentTrack, setCurrentTrack } = useContext(PlayerContext);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb: (token: string) => void) => { cb(token); },
        volume: 0.5,
      });

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        setPlayer({ instance: player, device_id });
      });

      player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
    };
  }, []);

  const playTrack = (trackUri: string) => {
    if (player && player.instance && player.device_id) {
      setCurrentTrack(trackUri);
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${player.device_id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [trackUri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    }
  };

  return (
    <PlayerProvider>
      <View style={styles.container}>
        <Button title="Play Track" onPress={() => playTrack('spotify:track:spotify:track:7haQE5nOcxwk0HXahP0aV3')} />
        {currentTrack && <Text>Now playing: {currentTrack}</Text>}
        <WebView source={{ uri: 'https://sdk.scdn.co/spotify-player.js' }} style={styles.webview} />
      </View>
    </PlayerProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: 0,
    height: 0,
  },
});

export default Test;
