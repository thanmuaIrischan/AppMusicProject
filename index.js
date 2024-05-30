/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';

import {name as appName} from './app.json';

import App from './prj_Login';

AppRegistry.registerComponent(appName, () => App);

import Navigator from './Navigator'
AppRegistry.registerComponent(appName, () => Navigator);

