import { AppRegistry } from 'react-native';
import Application from './Application';

const { name } = require('./app');

AppRegistry.registerComponent(name, () => Application);
