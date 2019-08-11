import React, { Component } from 'react';
import { Button, Picker, ScrollView, Switch, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { EVENT_CARDS, MAX_PLAYERS, PLAYER_ROLES } from '../model/constants';
import Player from '../model/Player';

/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'stretch',
    },
});
*/

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
                <Text key='epidemics-label' style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, width: '100%' }}>Epidemics</Text>
                <Slider
                    key='nepidemics-slider'
                    minimumValue={0}
                    maximumValue={6}
                    step={1}
                    value={this.state.nEpidemics}
                    style={{height: 50, width: '100%'}}
                    onValueChange={(nEpidemics) => this.setSectionState({nEpidemics})}>
                </Slider>
                <Text key='nepidemics-label' style={{ alignSelf: 'center', flex: 1, marginTop: -15 }}>( number of cards: {this.state.nEpidemics} )</Text>
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
                <Text key='players-label' style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, width: '100%' }}>Players</Text>
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
                <Text key='event-cards-label' style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, width: '100%' }}>Event Cards</Text>
                {Object.values(EVENT_CARDS).map(({ id, label }) =>
                    <View key={`event-card-${id}`} style={{ flex: 1, flexDirection: 'row', height: 40, width: '100%' }}>
                        <Text
                            key={`event-card-${id}-label`}
                            onPress={() => this.setState({ eventCards: { ...this.state.eventCards, [id]: !this.state.eventCards[id] } })}
                            style={{ alignSelf: 'center', flex: 1, marginRight: 5 }}>
                                {label}
                        </Text>
                        <Switch
                            key={`event-card-${id}-switch`}
                            value={this.state.eventCards[id]}
                            activeText='In'
                            inActiveText='Out'
                            onValueChange={(value) => this.setState({ eventCards: { ...this.state.eventCards, [id]: value } })}
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

    get transformedState() {
        // const usedRoles;
        const players = Object.entries(this.state.playerNames).filter(([, name]) => name && name.trim()).map(([index, name]) => new Player(name, this.state.playerRoles[index]));
        return {
            cardsPerPlayer: 6 - players.length,
            eventCards: this.state.eventCards,
            numberOfEpidemics: this.state.nEpidemics,
            players,
        };
    }

    bootstrapData() {
        return {
            eventCards: Object.values(EVENT_CARDS).reduce((cards, card) => { cards[card.id] = true; return cards; }, {}),
            nEpidemics: 4,
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
            <ScrollView key='config-screen' style={{ flex: 1, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10, width: '100%' }}>
                <PlayersSection parentScreen={this} ref={this.sections.players} />
                <EpidemicsSection parentScreen={this} ref={this.sections.epidemics} />
                <EventCardsSection parentScreen={this} ref={this.sections.eventCards} />
                <View key='continue-button-container' style={{ flex: 1, marginTop: 20, marginBottom: 20, width: '100%' }}>
                    <Button key='continue-button' title='Continue' onPress={() => navigate('GameSetup', this.transformedState)} />
                </View>
                <View key='reset-button-container' style={{ flex: 1, marginBottom: 30, width: '100%' }}>
                    <Button key='reset-button' title='Reset' color='#FF8000' onPress={() => this.resetData()} />
                </View>
            </ScrollView>
        );
    }
}
