import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Buffer } from '@craftzdog/react-native-buffer';

global.process = {
  cwd: () => 'sxsx',
  env: { NODE_ENV: 'production' },
};
global.location = {};
global.Buffer = Buffer;

AppRegistry.registerComponent(appName, () => App);
