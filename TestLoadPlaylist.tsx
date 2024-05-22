// UserPlaylists.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Import useRoute

interface Playlist {
  id: string;
  name: string;
}

interface Track{
    id: string;
    name: string;
}

const getUserID = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
     Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
      console.error('Failed to fetch track URL');
      return '';
  }
  const data = await response.json();
  return data.id;
};

const getAllUserPLaylist = async (user_id, accessToken) => {
  const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch track URL');
    return '';
  }

  const data = await response.json();
  const playlists = data.items.map((playlist: any) => ({
    id: playlist.id,
    name: playlist.name,
  }));
  return playlists;
};

const getPlaylistTracks = async (playlist_id, accessToken) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch track URL');
    return '';
  }

  const data = await response.json();
  const tracks = data.tracks.items.map((track: any) => ({
    id: track.TrackObject.id,
    name: track.TrackObject.name,
  }));
  return playlistIds;
};

const UserPlaylists = () => {
  const route = useRoute(); // Access the route object
  const {token} = route.params; // Retrieve the access token from route params
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return; // If access token is not available, return
      const userId = await getUserID(token);
      setId(userId);
      if (userId) {
        const playlistData = await getAllUserPLaylist(userId, token);
        setPlaylists(playlistData);
      }
      setLoading(false);
    };

    fetchData();
  }, [token]); // useEffect dependency

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id}</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playlistItem}>
            <Text>{item.name}</Text>
          </View>
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
  playlistItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default UserPlaylists;
