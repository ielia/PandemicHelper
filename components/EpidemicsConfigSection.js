import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from '../styles';

export default class EpidemicsConfigSection extends Component {
    static propTypes = {
        numberOfEpidemics: PropTypes.number.isRequired,
        onValueChange: PropTypes.func,
    };
    static defaultProps = {
        onValueChange: () => {},
    };

    render() {
        const { numberOfEpidemics, onValueChange } = this.props;
        return (
            <View key='epidemics-section'>
                <Text key='epidemics-label' style={styles.heading}>Epidemics</Text>
                <Slider
                    key='epidemics-slider'
                    minimumValue={0}
                    maximumValue={6}
                    step={1}
                    value={numberOfEpidemics}
                    style={styles.slider}
                    onValueChange={(nOE) => onValueChange(nOE)}>
                </Slider>
                <Text key='number-of-epidemics-label' style={{ alignSelf: 'center', flex: 1, marginTop: -15 }}>( number of cards: {numberOfEpidemics} )</Text>
            </View>
        );
    }
}
