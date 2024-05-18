/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';

import MainSocial from './prj_MainSocial';
import PlaySongBar from './comp_PlaySongBar';
import SwitchMain from './comp_SwitchMainBar';
import {name as appName} from './app.json';
<<<<<<< HEAD
import App from './prj_Login'

AppRegistry.registerComponent(appName, () => App);
=======
import AppNavigator from './prj_AppNavigator';
import ShowLyricsSong from './prj_ShowLyricsSong';

AppRegistry.registerComponent(appName, () => AppNavigator);
>>>>>>> d4c9951efed22ea5e3eb8a3c47d25c56400a511d
