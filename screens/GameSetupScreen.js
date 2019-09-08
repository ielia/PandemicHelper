import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DECKS } from '../model/constants';
import { cardButtonStyle, pageGradientColors, selectCardButtonBgColor, selectCardButtonFgColor, styles } from '../styles';

export default class GameSetupScreen extends Component {
    static navigationOptions = {
        header: null,
        title: 'Game Setup',
    };

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = navigation.state.params;
    }

    get name() {
        return 'GameSetup';
    }

    cardSelectionCallback(player, cardIndex) {
        return (card, next) => {
            player.replaceInHand(cardIndex, card);
            // TODO: return old card to deck.
            this.forceUpdate(next);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const { game } = this.state;
        return (
            <LinearGradient colors={pageGradientColors} style={styles.page}>
                <ScrollView key='game-setup-screen' style={styles.mainContainer}>
                    <Text key='initial-cards-label' style={styles.heading}>Initial Cards</Text>
                    {game.players.map((player, pIdx) =>
                        <View key={`player-${pIdx}`}>
                            <Text key={`player-${pIdx}-name`} style={{ marginBottom: 10 }}>{player.name} ({player.role.name})</Text>
                            <View key={`player-${pIdx}-initial-cards`} style={{ marginBottom: 10 }}>
                            {Array(game.numberOfInitialCardsPerPlayer).fill().map((_, cIdx) => (
                                <TouchableOpacity
                                    key={`player-${pIdx}-initial-card-${cIdx}-select-button`}
                                    onPress={() => navigate('SelectCardType', {
                                        callback: this.cardSelectionCallback(player, cIdx),
                                        deck: DECKS.player,
                                        eventCards: this.state.game.playerCardsDeck.events,
                                        origin: this,
                                    })}
                                    style={cardButtonStyle(player.hand[cIdx] ? player.hand[cIdx].bgColor : selectCardButtonBgColor, 50, 20)}
                                >
                                    <Text
                                        key={`player-${pIdx}-initial-card-${cIdx}-select-button-text`}
                                        style={{ color: player.hand[cIdx] ? player.hand[cIdx].fgColor : selectCardButtonFgColor }}
                                    >
                                        {player.hand[cIdx] ? player.hand[cIdx].label: 'Select Initial Card'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            </View>
                        </View>
                    )}
                </ScrollView>
            </LinearGradient>
        );
    }
}