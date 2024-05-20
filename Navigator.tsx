import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './prj_Login';
import MainSocial from './prj_MainSocial';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainSocial" component={MainSocial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
