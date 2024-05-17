import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainSocial from './prj_MainSocial';
import {RootStackParamList} from './types';
import MainMyPlaylist from './prj_MainMyPlaylist';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainSocial"
        screenOptions={{headerShown: false}} // Ẩn header cho tất cả các màn hình
      >
        <Stack.Screen name="MainSocial" component={MainSocial} />
        <Stack.Screen name="MainMyPlaylist" component={MainMyPlaylist} />
        {/* Thêm các màn hình khác nếu cần */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
