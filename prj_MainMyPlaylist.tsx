import React, {useEffect, useState, useRef, useCallback} from 'react';
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
import Song, {SongInfo} from './comp_Song';
import SwitchMain from './comp_SwitchMainBar';
import PlaySongBar from './comp_PlaySongBar';
import Playlist, {PlaylistInfo} from './comp_Playlist';
import HeaderBar from './comp_HeaderBar';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import {useRoute, useIsFocused, useFocusEffect} from '@react-navigation/native'; // Import useRoute and useIsFocused
import {saveTokenToGlobal} from './TokenService';
import AddNewPlaylist from './prj_AddNewPlaylist';
import {saveUserIdToGlobal} from './TokenService';

// Spotify API functions

const getUserID = async (accessToken: string) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch user ID:', response.status);
      return '';
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error fetching user ID:', error.message);
    return '';
  }
};

const getAllUserPlaylists = async (
  userId: string,
  accessToken: string,
): Promise<PlaylistInfo[]> => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      console.error('Failed to fetch playlists:', response.status);
      return [];
    }

    const data = await response.json();
    return data.items.map((playlist: any) => ({
      id: playlist.id,
      name: playlist.name,
      //description: playlist.description,
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error.message);
    return [];
  }
};

function MainMyPlaylist() {
  const [hideComponents, setHideComponents] = useState(false);
  const scrollOffset = useRef(0);
  const [playlists, setPlaylists] = useState<PlaylistInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute();
  const currentTrackId = useSelector((state: RootState) => state.global.currentTrackId);
  const {token} = route.params; /// Retrieve the access token from route params
  const isFocused = useIsFocused();

  useEffect(() => {
    saveTokenToGlobal(token);
  }, [token]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const isScrollingUp = offsetY > scrollOffset.current;
    scrollOffset.current = offsetY;

    if (isScrollingUp) {
      setHideComponents(true);
    } else {
      setHideComponents(false);
    }
  };

  const fetchData = async () => {
    if (!token) return;
    const userId = await getUserID(token);
    if (userId) {
      saveUserIdToGlobal(userId);
      const fetchedPlaylists = await getAllUserPlaylists(userId, token);
      setPlaylists(fetchedPlaylists);
    }
    setLoading(false);
  };

  // hàm gọi lại api spotify lấy list playlist
  useEffect(() => {
    fetchData();
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  //
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderBar routeToken={token} />

        {!hideComponents && (
          <>
            <SwitchMain token={token} />

            <View style={styles.SeeAllNewSongContainer}>
              {/*
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
              */}
            </View>
          </>
        )}

        <View style={styles.SeeAllNewSongContainer}>
          <Text style={styles.seeAllText}>My Playlists</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainerNewSong}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {playlists.map((playlist, index) => (
            <Playlist key={index} playlistInfo={playlist} token={token} />
          ))}
        </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: '#0A0022',
  },
  header: {
    width: '100%',
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  searchIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  scrollContainerNewSong: {},
  SeeAllNewSongContainer: {
    flexDirection: 'row',
    width: '100%',
    height: hp('5%'),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  seeAllText: {
    color: 'white',
    fontSize: 20,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  PlaySongBarContainer: {
    width: '100%',
    height: hp('17%'),
    backgroundColor: '#60539C',
  },
  SongNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LikeButton: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 10,
  },
  SongNameText: {
    color: 'black',
    fontSize: 25,
    marginTop: 10,
    marginLeft: 15,
  },
});

export default MainMyPlaylist;
