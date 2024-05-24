import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  MainSocial: {token: string} | undefined;
  MainMyPlaylist: {token: string} | undefined;
  ShowLyricsSong: undefined;
  Search: undefined;
  AddNewPlaylist: undefined;
  ShowPlaylist: {playlistId: string; token: string} | undefined;
};

export type MainSocialNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainSocial'
>;
export type MainMyPlaylistNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainMyPlaylist'
>;
export type ShowLyricsSongNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ShowLyricsSong'
>;
export type SearchNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;
export type AddNewPlaylistNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddNewPlaylist'
>;
export type ShowPlaylistNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ShowPlaylist'
>;
export type ShowPlaylistRouteProp = RouteProp<
  RootStackParamList,
  'ShowPlaylist'
>;
/// them

// Define the types for the navigation parameters
type MainSocialScreenRouteProp = RouteProp<
  {MainSocial: {token: string}},
  'MainSocial'
>;

// Define the types for the navigation prop
type MainSocialScreenNavigationProp = StackNavigationProp<
  {MainSocial: {token: string}},
  'MainSocial'
>;

// Combine both route and navigation props
type MainSocialProps = {
  route: MainSocialScreenRouteProp;
  navigation: MainSocialScreenNavigationProp;
};

//

export type MainSocialRouteProp = RouteProp<RootStackParamList, 'MainSocial'>;
export type MainMyPlaylistRouteProp = RouteProp<
  RootStackParamList,
  'MainMyPlaylist'
>;
export type ShowLyricsSongRouteProp = RouteProp<
  RootStackParamList,
  'ShowLyricsSong'
>;
