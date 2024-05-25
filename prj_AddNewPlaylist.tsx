import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {RootStackParamList, AddNewPlaylistNavigationProp} from './types'; // Import types

type AddNewPlaylistProps = {
  route: RouteProp<RootStackParamList, 'AddNewPlaylist'>; // RouteProp for AddNewPlaylist
};

const AddNewPlaylist: React.FC<AddNewPlaylistProps> = ({route}) => {
  const {accessToken, userId} = route.params; // Retrieve accessToken and userId from route params
  const [playlistName, setPlaylistName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const navigation = useNavigation<AddNewPlaylistNavigationProp>();

  const handleCreatePlaylist = async () => {
    // Your createNewPlaylist function implementation here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.returnIcon}
              source={require('./assets/Return.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Playlist Form */}
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
    backgroundColor: '#0A0022', //
  },
  content: {
    color: 'white', //
    fontSize: 20,
    padding: 40,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0022', //
  },
  header: {
    width: '100%',
    height: 50, //
    alignItems: 'flex-start',
  },
  returnIcon: {
    width: 50, //
    height: 50, //
    marginLeft: 10,
    marginTop: 15,
  },
  formContainer: {
    flex: 1,

    padding: 20,
  },
  label: {
    fontSize: 18, //
    marginBottom: 10,
    color: 'white', //
  },
  input: {
    width: '100%',
    height: 40, //
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20, //
    paddingHorizontal: 10, //
  },
  createButton: {
    width: '100%',
    height: 40, //
    backgroundColor: 'blue', //
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  createButtonText: {
    fontSize: 18, //
    color: '#fff', //
  },
});

export default AddNewPlaylist;
