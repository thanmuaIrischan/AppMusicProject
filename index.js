/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';

import MainSocial from './prj_MainSocial';
import PlaySongBar from './comp_PlaySongBar';
import SwitchMain from './comp_SwitchMainBar';
import {name as appName} from './app.json';
import Login from './prj_Login'
import Navigator from './Navigator'

AppRegistry.registerComponent(appName, () => Navigator);

