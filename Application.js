import { createAppContainer, createStackNavigator } from 'react-navigation';
import ConfigScreen from './screens/ConfigScreen';
import GameSetupScreen from './screens/GameSetupScreen';
import SelectCardLocationScreen from './screens/SelectCardLocationScreen';
import SelectCardEventScreen from './screens/SelectCardEventScreen';
import SelectCardTypeScreen from './screens/SelectCardTypeScreen';

const MainNavigator = createStackNavigator({
    Config: { screen: ConfigScreen },
    GameSetup: { screen: GameSetupScreen },
    SelectCardEvent: { screen: SelectCardEventScreen },
    SelectCardLocation: { screen: SelectCardLocationScreen },
    SelectCardType: { screen: SelectCardTypeScreen },
});

const Application = createAppContainer(MainNavigator);

export default Application;
