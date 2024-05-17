import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  MainSocial: undefined;
  MainMyPlaylist: undefined;
};

export type MainSocialNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainSocial'
>;
export type MainMyPlaylistNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainMyPlaylist'
>;

export type MainSocialRouteProp = RouteProp<RootStackParamList, 'MainSocial'>;
export type MainMyPlaylistRouteProp = RouteProp<
  RootStackParamList,
  'MainMyPlaylist'
>;
