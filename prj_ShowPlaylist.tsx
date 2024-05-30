import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Song from './comp_Song';
import PlaySongBar from './comp_PlaySongBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getTokenFromGlobal} from './TokenService';

// Function to get playlist details
const getPlaylistDetails = async (playlistId, accessToken) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      console.error('Failed to fetch playlist details:', response.status);
      return null;
    }

    const data = await response.json();
    const images = data.images ? data.images.map(image => image.url) : [];
    const tracks = data.tracks
      ? data.tracks.items.map(item => ({
          name: item.track.name,
          artistName: item.track.artists.map(artist => artist.name).join(', '),
        }))
      : [];

    return {
      name: data.name,
      description: data.description,
      images: images,
      tracks: tracks,
    };
  } catch (error) {
    console.error('Error fetching playlist details:', error.message);
    return null;
  }
};

function ShowPlaylist() {
  const [hideComponents, setHideComponents] = useState(false);
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollOffset = useRef(0);
  const navigation = useNavigation();
  const route = useRoute();

  const {playlistId} = route.params; // Retrieve the playlist ID from route params
  const token = getTokenFromGlobal();
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const isScrollingUp = offsetY > scrollOffset.current;
    scrollOffset.current = offsetY;

    if (isScrollingUp) {
      setHideComponents(true);
    } else {
      setHideComponents(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !playlistId) return;
      const details = await getPlaylistDetails(playlistId, token);
      setPlaylistDetails(details);
      setLoading(false);
    };

    fetchData();
  }, [token, playlistId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!playlistDetails) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>Failed to load playlist details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.ReturnIcon}
              source={require('./assets/Return.png')}
            />
          </TouchableOpacity>
        </View>
        {/* Image near Playlist Title */}
        <View style={styles.imageContainer}>
          {playlistDetails.images[0] ? (
            <Image
              style={styles.playlistImage}
              source={{uri: playlistDetails.images[0]}}
            />
          ) : null}
        </View>
        {/* Playlist Title */}
        <View style={styles.ContentPlaylist}>
          <Text style={styles.Title}>{playlistDetails.name}</Text>
        </View>
        {/* ScrollView */}
        <ScrollView
          contentContainerStyle={styles.scrollContainerNewSong}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {/* List of songs */}
          {playlistDetails.tracks.map((song, index) => (
            <Song key={index} songInfo={song} />
          ))}
        </ScrollView>
        {/* PlaySongBar */}
        <PlaySongBar routeToken={token} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  playlistImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
  header: {
    width: '100%',
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ReturnIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  scrollContainerNewSong: {},
  SeeAllNewSongContainer: {
    flexDirection: 'row',
    width: '100%',
    height: hp('5%'),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  ContentPlaylist: {
    width: '100%',
    height: hp('20%'),
    justifyContent: 'center',
  },
  Title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  containerDescription: {
    width: '90%',
    height: hp('10%'),
    backgroundColor: '#60539C',
    marginLeft: 10,
    borderRadius: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: hp('20%'),
  },
});

export default ShowPlaylist;
