import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './store';
import {setCurrentTrackId, setTimer, setCurrentPosition} from './globalSlice';

interface SongProps {
  songInfo: {
    name: string;
    artists: {name: string}[];
    album: {images: {url: string}[]};
  };
}

const Song: React.FC<SongProps> = ({songInfo}) => {
  const currentPosition = useSelector(
    (state: RootState) => state.global.currentPosition,
  );
  const dispatch = useDispatch();
  if (!songInfo) {
    return null; // Trả về null hoặc một phần tử trống nếu không có songInfo
  }

  const {name, artists, album} = songInfo;
  const [modalVisible, setModalVisible] = useState(false);

  const clickHandle = async () => {
    dispatch(setCurrentTrackId(songInfo.id));
    dispatch(setTimer(0));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonPlaySong}
        onPress={() => clickHandle()}>
        <Image style={styles.image} source={require('./assets/PlaySong.png')} />
      </TouchableOpacity>
      <View style={styles.contentSong}>
        <Text style={styles.nameSong}>{name}</Text>
        <Text style={styles.artistName}>
          {artists && artists.length > 0 ? artists[0].name : ''}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.buttonAddSongToPlayList}
        onPress={() => setModalVisible(true)}>
        <Image
          style={styles.image}
          source={require('./assets/AddSongToPlaylist.png')}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Song to Playlist</Text>
            {/* Here you can render your playlist items and add functionality */}
            <TouchableOpacity
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Adjust to be responsive
    height: 80,
    //backgroundColor: '#60539C',
    flexDirection: 'row',
    alignItems: 'center', // Center content vertically
    padding: 10, // Add some padding
    marginBottom: 10, // Add some margin between items
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonPlaySong: {
    width: 50,
    height: 50,
    backgroundColor: '#503399',
    borderRadius: 10,
    justifyContent: 'center', // Center icon inside button
    alignItems: 'center', // Center icon inside button
    marginRight: 10, // Space between button and text
  },
  contentSong: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', // Center text vertically
  },
  nameSong: {
    color: 'white',
    fontSize: 20,
  },
  artistName: {
    color: 'white',
    fontSize: 13,
  },
  buttonAddSongToPlayList: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Song;
export type SongInfo = {
  name: string;
  artists: {name: string}[];
  album: {images: {url: string}[]};
};
