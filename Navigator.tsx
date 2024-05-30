import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './prj_Login';
import MainSocial from './prj_MainSocial';
import Test from './TestPlayMusic';
import UserPlaylists from './TestLoadPlaylist';
import MainMyPlaylist from './prj_MainMyPlaylist';
import ShowPlaylist from './prj_ShowPlaylist';
import AddNewPlaylist from './prj_AddNewPlaylist';
import Search from './prj_Search';
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainSocial" component={MainSocial} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Playlist" component={UserPlaylists} />
        <Stack.Screen name="MainMyPlaylist" component={MainMyPlaylist} />
        <Stack.Screen name="ShowPlaylist" component={ShowPlaylist} />
        <Stack.Screen name="AddNewPlaylist" component={AddNewPlaylist} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
