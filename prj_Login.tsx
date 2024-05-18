import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
import { authorize } from 'react-native-app-auth';

const App = () => {
  const [token, setToken] = useState('');
  //const navigation = useNavigation();

  const config = {
    issuer: 'https://accounts.spotify.com',
    clientId: '4f77b5784e0542d7ba269907f8d0f82f',
    redirectUrl: 'http://192.168.1.12:8082/callback',
    scopes: ['user-read-private', 'user-read-email'],
  };

  const handleAuth = async () => {
    try {
      const result = await authorize(config);
      setToken(result.accessToken);
      console.log("1");
      //navigation.navigate('AnotherForm');
    } catch (error) {
      console.error(error);
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

export default App;