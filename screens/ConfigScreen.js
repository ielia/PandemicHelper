import React, { PureComponent } from 'react';
import { Alert, Button, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EpidemicsConfigSection from '../components/EpidemicsConfigSection';
import EventCardsConfigSection from '../components/EventCardsConfigSection';
import PlayersConfigSection from '../components/PlayersConfigSection';
import Game from '../model/Game';
import Player from '../model/Player';
import { EVENTS, PLAYER_ROLES } from '../model/constants';
import { continueButtonBgColor, pageGradientColors, resetButtonBgColor, styles } from '../styles';

export default class ConfigScreen extends PureComponent {
    static navigationOptions = {
        header: null,
        title: 'Config',
    };

    constructor(props) {
        super(props);
        this.state = this.bootstrapData();
        this.doResetData = this.resetData.bind(this);
        this.doValidateAndContinue = this.validateAndContinue.bind(this);
        this.updateEvents = (events) => this.setState({ events });
        this.updateNumberOfEpidemics = (numberOfEpidemics) => this.setState({ numberOfEpidemics });
        this.updatePlayerNames = (playerNames) => this.setState({ playerNames });
        this.updatePlayerRoles = (playerRoles) => this.setState({ playerRoles });
    }

    get configuredGame() {
        const players = Object.entries(this.state.playerNames).filter(([, name]) => name && name.trim()).map(([index, name]) => new Player(name, this.state.playerRoles[index]));
        return new Game({
            events: Object.keys(this.state.events).filter((event) => this.state.events[event]),
            numberOfEpidemics: this.state.numberOfEpidemics,
            players,
        });
    }

    bootstrapData() {
        return {
            events: Object.keys(EVENTS).reduce((events, event) => { events[event] = true; return events; }, {}),
            numberOfEpidemics: 4,
            playerNames: ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
            playerRoles: Array(4).fill(Object.values(PLAYER_ROLES)[0].id),
        };
    }

    resetData() {
        this.setState(this.bootstrapData());
    }

    validateAndContinue() {
        const repeatedNames = this.state.playerNames.reduce((acc, name, index) => acc || (name && this.state.playerNames.indexOf(name) !== index), false) && 'names';
        const repeatedRoles = this.state.playerRoles.reduce((acc, role, index) => acc || (this.state.playerNames[index] && this.state.playerRoles.indexOf(role) !== index), false) && 'roles';
        if (repeatedNames || repeatedRoles) {
            Alert.alert('Repeated Player Information', `There are repeated ${[repeatedNames, repeatedRoles].filter(Boolean).join(' and ')}.\nPlease fix before continuing.`);
        } else {
            const { navigate } = this.props.navigation;
            navigate('GameSetup', { game: this.configuredGame });
        }
    }

    render() {
        // console.log(`ConfigScreen.render()`);
        return (
            <LinearGradient colors={pageGradientColors} style={styles.page}>
                <ScrollView key='config-screen' style={styles.mainContainer}>
                    <PlayersConfigSection
                        names={this.state.playerNames}
                        roles={this.state.playerRoles}
                        onChangeNames={this.updatePlayerNames}
                        onChangeRoles={this.updatePlayerRoles}
                    />
                    <EpidemicsConfigSection
                        numberOfEpidemics={this.state.numberOfEpidemics}
                        onValueChange={this.updateNumberOfEpidemics}
                    />
                    <EventCardsConfigSection
                        events={this.state.events}
                        onValueChange={this.updateEvents}
                    />
                    <View key='continue-button-container' style={{ flex: 1, marginTop: 20, marginBottom: 20, width: '100%' }}>
                        <Button key='continue-button' title='Continue' color={continueButtonBgColor} onPress={this.doValidateAndContinue} />
                    </View>
                    <View key='reset-button-container' style={{ flex: 1, marginBottom: 30, width: '100%' }}>
                        <Button key='reset-button' title='Reset' color={resetButtonBgColor} onPress={this.doResetData} />
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
}
