import React, { PureComponent } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LocationCard from '../model/LocationCard';
import { LOCATIONS_BY_DISEASE } from '../model/constants';
import { cardButtonStyle, pageGradientColors, styles } from '../styles';

export default class SelectCardLocationScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: `Select ${navigation.state.params.deck.name} Card City`,
    });

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            callback: params.callback,
            deck: params.deck,
            disease: params.disease,
            origin: params.origin,
        };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <LinearGradient colors={pageGradientColors} style={styles.page}>
                <ScrollView key='select-card-location-screen' style={styles.mainContainer}>
                    <View key='select-card-location-container' style={{ paddingTop: 10, paddingBottom: 10 }}>
                        {Object.values(LOCATIONS_BY_DISEASE[this.state.disease.id]).map((location) =>
                            <TouchableOpacity
                                key={`${location.id}-button`}
                                onPress={() => {
                                    this.state.callback(new LocationCard(location), () => navigate(this.state.origin.name));
                                }}
                                style={cardButtonStyle(location.disease.color, 50, 20)}
                            >
                                <Text
                                    key={`${location.id}-button-text`}
                                    style={{ color: location.disease.fontColor }}
                                >
                                    {location.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }
}
