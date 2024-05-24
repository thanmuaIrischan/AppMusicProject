import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {authorize} from 'react-native-app-auth';

const Login = () => {
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  const config = {
    issuer: 'https://accounts.spotify.com',
    clientId: '4f77b5784e0542d7ba269907f8d0f82f',
    redirectUrl: 'appifity-musicapp://callback',
    scopes: [
      'user-read-email',
      'user-library-read',
      'user-read-recently-played',
      'user-top-read',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-read-playback-state',
      'user-modify-playback-state',
      'streaming',
    ],
  };

  const handleAuth = async () => {
    try {
      const result = await authorize(config);
      setToken(result.accessToken);
      console.log('Authenticated successfully');
      navigation.navigate('MainMyPlaylist', {token: result.accessToken});
    } catch (error) {
      console.error('Authentication error:', error);
      console.error('Error details:', error.message);
    }
  };

  return (
    <View>
      <Button title="Authenticate with Spotify" onPress={handleAuth} />
      {token ? (
        <Text>Authenticated! Token: {token}</Text>
      ) : (
        <Text>Not authenticated</Text>
      )}
    </View>
  );
};

export default Login;
