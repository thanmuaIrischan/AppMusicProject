import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Playlist, {PlaylistInfo} from './comp_Playlist'; // Import Playlist component and PlaylistInfo type

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
}

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
): Promise<SpotifyPlaylist[]> => {
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
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error.message);
    return [];
  }
};

const UserPlaylists = () => {
  const route = useRoute();
  const {token} = route.params;
  const [playlists, setPlaylists] = useState<PlaylistInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      const fetchedUserId = await getUserID(token);
      setUserId(fetchedUserId);
      if (fetchedUserId) {
        const fetchedPlaylists = await getAllUserPlaylists(
          fetchedUserId,
          token,
        );
        setPlaylists(fetchedPlaylists);
      }
      setLoading(false);
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User ID: {userId}</Text>
      <FlatList
        data={playlists}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Playlist
            playlistInfo={{
              id: item.id,
              name: item.name,
              description: item.description,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default UserPlaylists;
