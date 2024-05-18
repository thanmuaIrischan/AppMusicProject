import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainSocial from './prj_MainSocial';
import {RootStackParamList} from './types';
import MainMyPlaylist from './prj_MainMyPlaylist';
import ShowLyricsSong from './prj_ShowLyricsSong';
import Search from './prj_Search';
import AddNewPlaylist from './prj_AddNewPlaylist';
import ShowPlaylist from './prj_ShowPlaylist';
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainSocial"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainSocial" component={MainSocial} />
        <Stack.Screen name="MainMyPlaylist" component={MainMyPlaylist} />
        <Stack.Screen name="ShowLyricsSong" component={ShowLyricsSong} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="AddNewPlaylist" component={AddNewPlaylist} />
        <Stack.Screen name="ShowPlaylist" component={ShowPlaylist} />
        {/* Thêm các màn hình khác nếu cần */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
