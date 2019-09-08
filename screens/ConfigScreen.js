import React, { Component } from 'react';
import { Button, Picker, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import Game from '../model/Game';
import Player from '../model/Player';
import { EVENTS, MAX_PLAYERS, PLAYER_ROLES } from '../model/constants';
import { continueButtonBgColor, pageGradientColors, resetButtonBgColor, styles } from '../styles';

class Section extends Component {
    constructor(props) {
        super(props);
        this.parentScreen = this.props.parentScreen;
        this.state = this.props.parentScreen.state;
    }

    setSectionState(sectionState) {
        this.setState(sectionState);
        this.parentScreen.setState(sectionState);
    }
}

class EpidemicsSection extends Section {
    render() {
        return (
            <View key='epidemics-section'>
                <Text key='epidemics-label' style={styles.heading}>Epidemics</Text>
                <Slider
                    key='epidemics-slider'
                    minimumValue={0}
                    maximumValue={6}
                    step={1}
                    value={this.state.numberOfEpidemics}
                    style={styles.slider}
                    onValueChange={(numberOfEpidemics) => this.setSectionState({ numberOfEpidemics })}>
                </Slider>
                <Text key='number-of-epidemics-label' style={{ alignSelf: 'center', flex: 1, marginTop: -15 }}>( number of cards: {this.state.numberOfEpidemics} )</Text>
            </View>
        );
    }
}

class PlayersSection extends Section {
    setPlayerData(index, listName) {
        return (datum) => {
            const list = [...this.state[listName]];
            list[index] = datum;
            this.setSectionState({ [listName]: list });
        }
    }

    setPlayerName(index) {
        return this.setPlayerData(index, 'playerNames');
    }

    setPlayerRole(index) {
        return this.setPlayerData(index, 'playerRoles');
    }

    render() {
        return (
            <View key='players-section'>
                <Text key='players-label' style={styles.heading}>Players</Text>
                <View key='player-names' style={{ height: 360 }}>
                    {[...Array(MAX_PLAYERS).keys()].map(i => i + 1).map((value, index) =>
                        <View key={`player${value}-data-container`} style={{ flex: 1, flexDirection: 'column', height: 80, marginBottom: 10, width: '100%' }}>
                            <View key={`player${value}-name-container`} style={{ flex: 1, flexDirection: 'row', height: 40, width: '100%' }}>
                                <TextInput
                                    key={`player${value}-name-input`}
                                    style={{ alignSelf: 'stretch', borderColor: 'gray', borderWidth: 1, flex: 1, height: '100%', marginRight: 5 }}
                                    onChangeText={this.setPlayerName(index)}
                                    value={this.state.playerNames[index]}
                                    placeholder={`player ${value}'s name`}
                                />
                                <Button
                                    key={`player${value}-name-clear-button`}
                                    style={{ height: '100%', width: 20 }}
                                    onPress={() => this.setPlayerName(index)('')}
                                    title='X'
                                    color='#FF0000' />
                            </View>
                            <Picker
                                key={`player${value}-role-picker`}
                                selectedValue={this.state.playerRoles[index]}
                                style={{ alignSelf: 'flex-end', borderColor: 'gray', borderWidth: 1, flex: 1, height: 40, width: '80%' }}
                                onValueChange={this.setPlayerRole(index)}>
                                    {Object.values(PLAYER_ROLES).map(({ id, name }) => <Picker.Item key={`player${value}-role-${id}`} label={name} value={id} />)}
                            </Picker>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

class EventCardsSection extends Section {
    render() {
        return (
            <View key='event-cards-section'>
                <Text key='event-cards-label' style={styles.heading}>Event Cards</Text>
                {Object.values(EVENTS).map(({ id, label }) =>
                    <View key={`event-card-${id}`} style={{ flex: 1, flexDirection: 'row', height: 40, width: '100%' }}>
                        <Text
                            key={`event-card-${id}-label`}
                            onPress={() => this.setSectionState({ events: { ...this.state.events, [id]: !this.state.events[id] } })}
                            style={{ alignSelf: 'center', flex: 1, marginRight: 5 }}>
                                {label}
                        </Text>
                        <Switch
                            key={`event-card-${id}-switch`}
                            value={this.state.events[id]}
                            activeText='In'
                            inActiveText='Out'
                            onValueChange={(value) => this.setSectionState({ events: { ...this.state.events, [id]: value } })}
                            style={{ alignSelf: 'center', flex: 1 }} />
                    </View>
                )}
            </View>
        );
    }
}

export default class ConfigScreen extends Component {
    static navigationOptions = {
        header: null,
        title: 'Config',
    };

    constructor(props) {
        super(props);
        this.state = this.bootstrapData();
        this.sections = {
            epidemics: React.createRef(),
            eventCards: React.createRef(),
            players: React.createRef(),
        };
    }

    get configuredGame() {
        // const usedRoles;
        const players = Object.entries(this.state.playerNames).filter(([, name]) => name && name.trim()).map(([index, name]) => new Player(name, this.state.playerRoles[index]));
        return new Game({
            events: Object.keys(this.state.events).filter((event) => this.state.events[event]),
            numberOfEpidemics: this.state.numberOfEpidemics,
            players,
        });
    }

    bootstrapData() {
        return {
            events: Object.values(EVENTS).reduce((events, event) => { events[event.id] = true; return events; }, {}),
            numberOfEpidemics: 4,
            playerNames: ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
            playerRoles: Array(4).fill(Object.values(PLAYER_ROLES)[0].id),
        };
    }

    resetData() {
        const data = this.bootstrapData();
        this.setState(data);
        Object.values(this.sections).forEach((section) => section.current.setState(data));
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <LinearGradient colors={pageGradientColors} style={styles.page}>
                <ScrollView key='config-screen' style={styles.mainContainer}>
                    <PlayersSection parentScreen={this} ref={this.sections.players} />
                    <EpidemicsSection parentScreen={this} ref={this.sections.epidemics} />
                    <EventCardsSection parentScreen={this} ref={this.sections.eventCards} />
                    <View key='continue-button-container' style={{ flex: 1, marginTop: 20, marginBottom: 20, width: '100%' }}>
                        <Button key='continue-button' title='Continue' color={continueButtonBgColor} onPress={() => navigate('GameSetup', { game: this.configuredGame })} />
                    </View>
                    <View key='reset-button-container' style={{ flex: 1, marginBottom: 30, width: '100%' }}>
                        <Button key='reset-button' title='Reset' color={resetButtonBgColor} onPress={() => this.resetData()} />
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
}
