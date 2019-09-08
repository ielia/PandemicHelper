import React, { Component } from 'react';
import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {cardButtonStyle, pageGradientColors, styles} from '../styles';
import LocationCard from "../model/LocationCard";

export default class SelectCardEventScreen extends Component {
    static navigationOptions = {
        title: 'Select Player Card Event',
    };

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            callback: params.callback,
            eventCards: params.eventCards,
            origin: params.origin,
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <LinearGradient colors={pageGradientColors} style={styles.page}>
                <ScrollView key='select-card-event-screen' style={styles.mainContainer}>
                    <View key='select-card-event-container' style={{ paddingTop: 10, paddingBottom: 10 }}>
                        {Object.values(this.state.eventCards).map((eventCard) =>
                            <TouchableOpacity
                                key={`${eventCard.event.id}-button`}
                                onPress={() => {
                                    this.state.callback(eventCard, () => navigate(this.state.origin.name));
                                }}
                                style={cardButtonStyle(eventCard.bgColor, 50, 20)}
                            >
                                <Text
                                    key={`${eventCard.event.id}-button-text`}
                                    style={{ color: eventCard.fgColor }}
                                >
                                    {eventCard.label}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
}
