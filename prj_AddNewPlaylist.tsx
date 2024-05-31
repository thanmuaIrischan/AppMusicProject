import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {getUserIdFromGlobal} from './TokenService';
import {getTokenFromGlobal} from './TokenService';
import {AddNewPlaylistNavigationProp, RootStackParamList} from './types';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

type AddNewPlaylistProps = {
  route: RouteProp<RootStackParamList, 'AddNewPlaylist'>;
};

const AddNewPlaylist: React.FC<AddNewPlaylistProps> = ({route}) => {
  const [playlistName, setPlaylistName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string | null>(null); // State for image URI
  const navigation = useNavigation<AddNewPlaylistNavigationProp>();

  // Lấy giá trị userId từ TokenService
  const userId = getUserIdFromGlobal();
  const accessToken = getTokenFromGlobal();

  const handleCreatePlaylist = async () => {
    if (!playlistName) {
      Alert.alert('Playlist name is required');
      return;
    }

    if (!accessToken) {
      Alert.alert('Access token is missing. Please authenticate again.');
      return;
    }

    try {
      // Create the playlist
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playlistName,
            description: description,
            public: false,
          }),
        },
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error creating playlist:', errorResponse.error.message);
        throw new Error('Failed to create playlist');
      }

      const playlist = await response.json();

      if (image) {
        await uploadImageToPlaylist(playlist.id);
      }

      Alert.alert('Playlist created successfully');

      navigation.goBack(); // Điều hướng quay lại màn hình trước đó
    } catch (error) {
      console.error('Error creating playlist:', error);
      Alert.alert('Error creating playlist');
    }
  };

  const uploadImageToPlaylist = async (playlistId: string) => {
    try {
      if (!image) {
        console.error('No image URI provided');
        return;
      }
      //console.log('Access Token:', accessToken);

      // Fetch the image data
      console.log('Fetching image data...');
      const imageResponse = await fetch(image!);

      if (!imageResponse.ok) {
        console.error('Failed to fetch image data:', imageResponse.status);
        return;
      }

      // Convert image data to blob
      console.log('Converting image data to blob...');
      const imageBlob = await imageResponse.blob();

      // Upload the image to the playlist
      console.log('Uploading image to playlist...');
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/images`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'image/jpeg', // Ensure the image type is correct (JPEG)
          },
          body: imageBlob,
        },
      );

      if (!response.ok) {
        console.error('Failed to upload playlist image:', response.status);
        if (response.status === 401) {
          Alert.alert('Unauthorized. Please check your access token.');
        }
        return;
      }
      console.log('Playlist image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImage(selectedImage.uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.returnIcon}
              source={require('./assets/Return.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.content}>Add New Playlist</Text>
          <Text style={styles.label}>Playlist Name</Text>
          <TextInput
            style={styles.input}
            value={playlistName}
            onChangeText={setPlaylistName}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Pick an image</Text>
          </TouchableOpacity>
          {image && <Image source={{uri: image}} style={styles.previewImage} />}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreatePlaylist}>
            <Text style={styles.createButtonText}>Create Playlist</Text>
          </TouchableOpacity>
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
  content: {
    color: 'white',
    fontSize: 20,
    padding: 40,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
  header: {
    width: '100%',
    height: 50,
    alignItems: 'flex-start',
  },
  returnIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 15,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
  },
  createButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  createButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  imagePicker: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 16,
    color: 'blue',
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});

export default AddNewPlaylist;
