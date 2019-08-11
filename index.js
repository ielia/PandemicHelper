import { createStackNavigator, createAppContainer } from 'react-navigation';
import { AppRegistry } from 'react-native';
import ConfigScreen from './screens/ConfigScreen';
import GameSetupScreen from './screens/GameSetupScreen';
import { name as appName } from './app';

const MainNavigator = createStackNavigator({
  Config: { screen: ConfigScreen },
  GameSetup: { screen: GameSetupScreen },
});

const App = createAppContainer(MainNavigator);

// export default App;

AppRegistry.registerComponent(appName, () => App);
