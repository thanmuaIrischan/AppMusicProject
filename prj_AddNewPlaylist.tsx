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
    backgroundColor: '#fff', // Adjust as needed
  },
  container: {
    flex: 1,
    backgroundColor: '#fff', // Adjust as needed
  },
  header: {
    width: '100%',
    height: 50, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  returnIcon: {
    width: 50, // Adjust as needed
    height: 50, // Adjust as needed
    marginLeft: 10, // Adjust as needed
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Adjust as needed
  },
  label: {
    fontSize: 18, // Adjust as needed
    marginBottom: 10, // Adjust as needed
  },
  input: {
    width: '100%',
    height: 40, // Adjust as needed
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20, // Adjust as needed
    paddingHorizontal: 10, // Adjust as needed
  },
  createButton: {
    width: '100%',
    height: 40, // Adjust as needed
    backgroundColor: 'blue', // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  createButtonText: {
    fontSize: 18, // Adjust as needed
    color: '#fff', // Adjust as needed
  },
});

export default AddNewPlaylist;
