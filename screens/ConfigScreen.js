import React, { Component } from 'react';
import { Alert, Button, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EpidemicsConfigSection from '../components/EpidemicsConfigSection';
import EventCardsConfigSection from '../components/EventCardsConfigSection';
import PlayersConfigSection from '../components/PlayersConfigSection';
import Game from '../model/Game';
import Player from '../model/Player';
import { EVENTS, PLAYER_ROLES } from '../model/constants';
import { continueButtonBgColor, pageGradientColors, resetButtonBgColor, styles } from '../styles';

export default class ConfigScreen extends Component {
    static navigationOptions = {
        header: null,
        title: 'Config',
    };

    constructor(props) {
        super(props);
        this.state = this.bootstrapData();
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
        return (
            <LinearGradient colors={pageGradientColors} style={styles.page}>
                <ScrollView key='config-screen' style={styles.mainContainer}>
                    <PlayersConfigSection
                        names={this.state.playerNames}
                        roles={this.state.playerRoles}
                        onChangeNames={(playerNames) => this.setState({ playerNames })}
                        onChangeRoles={(playerRoles) => this.setState({ playerRoles })}
                    />
                    <EpidemicsConfigSection
                        numberOfEpidemics={this.state.numberOfEpidemics}
                        onValueChange={(numberOfEpidemics) => this.setState({ numberOfEpidemics })}
                    />
                    <EventCardsConfigSection
                        events={this.state.events}
                        onValueChange={(events) => this.setState({ events })}
                    />
                    <View key='continue-button-container' style={{ flex: 1, marginTop: 20, marginBottom: 20, width: '100%' }}>
                        <Button key='continue-button' title='Continue' color={continueButtonBgColor} onPress={this.validateAndContinue.bind(this)} />
                    </View>
                    <View key='reset-button-container' style={{ flex: 1, marginBottom: 30, width: '100%' }}>
                        <Button key='reset-button' title='Reset' color={resetButtonBgColor} onPress={this.resetData.bind(this)} />
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
}
