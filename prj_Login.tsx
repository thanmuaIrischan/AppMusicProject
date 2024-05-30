import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {authorize} from 'react-native-app-auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
      'playlist-modify-private', // playlist
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
  {
    /*<View>
      <Button title="Authenticate with Spotify" onPress={handleAuth} />
      {token ? (
        <Text>Authenticated! Token: {token}</Text>
      ) : (
        <Text>Not authenticated</Text>
      )}
    </View>*/
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.design2}>
          <Image
            style={styles.image2}
            source={require('./assets/design2.png')}
            resizeMode="contain" // Ensure the image scales correctly
          />
          <Image
            style={styles.image1}
            source={require('./assets/design1.png')}
            resizeMode="contain" // Ensure the image scales correctly
          />
          <View style={styles.buttonContainer}>
            <Button title="Authenticate with Spotify" onPress={handleAuth} />
            {token ? (
              <Text style={styles.text}>Authenticated! Token: {token}</Text>
            ) : (
              <Text style={styles.text}>Not authenticated</Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
  button: {},
  design2: {
    width: wp('100%'),
    height: hp('56%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image2: {
    width: '100%',
    height: '100%',
  },
  image1: {
    width: '90%',
    height: '90%',
    position: 'absolute',
    top: '50%', // Adjust this value to position the overlaying image
    left: '10%', // Adjust this value to position the overlaying image
  },
  buttonContainer: {
    //position: 'absolute',
    top: '50%', // Adjust this value to position the button container below image1
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
});
export default Login;
