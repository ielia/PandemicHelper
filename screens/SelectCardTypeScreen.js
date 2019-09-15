import React, { PureComponent } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EpidemicCard from '../model/EpidemicCard';
import { CARD_TYPES, DISEASES } from '../model/constants';
import LinearGradient from 'react-native-linear-gradient';
import { cardButtonStyle, pageGradientColors, styles } from '../styles';

const buttonContainerStyle = (index) => ({
    alignItems: 'center',
    height: 150,
    justifyContent: 'center',
    paddingBottom: 20,
    [`padding${index % 2 ? 'Left' : 'Right'}`]: 10,
    width: '50%',
});

export default class SelectCardTypeScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: `Select ${navigation.state.params.deck.name} Card Type`,
    });

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            callback: params.callback,
            deck: params.deck,
            disease: null,
            epidemicCards: params.epidemicCards,
            eventCards: params.eventCards,
            origin: params.origin,
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        const { epidemicCards, eventCards } = this.state;
        let typeIndex = 0;
        return (
            <LinearGradient colors={pageGradientColors} style={styles.page}>
                <ScrollView key='select-card-disease-screen' style={{ ...styles.mainContainer, paddingBottom: 20, paddingTop: 20 }}>
                    <View key='select-card-disease-container' style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {Object.values(DISEASES).map((disease) => (
                            <View key={`${disease.id}-button-container`} style={buttonContainerStyle(typeIndex++)}>
                                <TouchableOpacity
                                    key={`${disease.id}-button`}
                                    onPress={() => navigate(
                                        'SelectCardLocation',
                                        { callback: this.state.callback, deck: this.state.deck, disease, origin: this.state.origin }
                                    )}
                                    style={cardButtonStyle(disease.color)}
                                >
                                    <Text key={`${disease.id}-button-text`} style={{ color: disease.fontColor }}>
                                        {disease.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {epidemicCards && epidemicCards.length ? (
                            <View key='epidemic-button-container' style={buttonContainerStyle(typeIndex++)}>
                                <TouchableOpacity
                                    key='epidemic-button'
                                    onPress={() => {
                                        // TODO: Fix
                                        this.state.callback(new EpidemicCard(), () => navigate(this.state.origin.name));
                                    }}
                                    style={cardButtonStyle(CARD_TYPES.epidemic.color)}
                                >
                                    <Text key='epidemic-button-text' style={{ color: CARD_TYPES.epidemic.fontColor }}>
                                        Epidemic
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : []}
                        {eventCards && eventCards.length ? (
                            <View key='event-button-container' style={buttonContainerStyle(typeIndex++)}>
                                <TouchableOpacity
                                    key='event-button'
                                    color='#808000'
                                    onPress={() => navigate(
                                        'SelectCardEvent',
                                        { callback: this.state.callback, eventCards, origin: this.state.origin }
                                    )}
                                    style={cardButtonStyle(CARD_TYPES.event.color)}
                                >
                                    <Text key='event-button-text' style={{ color: CARD_TYPES.event.fontColor }}>
                                        Event
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : []}
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
}
