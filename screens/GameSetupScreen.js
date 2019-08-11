import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { PLAYER_ROLES } from '../model/constants';

export default class GameSetupScreen extends Component {
    static navigationOptions = {
        header: null,
        title: 'Game Setup',
    };

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = this.props.navigation.state.params;
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView key='game-setup-screen'>
                <Text key='players-label' style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, width: '100%' }}>Players</Text>
                {this.state.players.map((player, index) =>
                    <Text key={`player-${index}-name`}>{player.name} ({PLAYER_ROLES[player.role].name}): {this.state.cardsPerPlayer}</Text>
                )}
            </ScrollView>
        );
    }
}