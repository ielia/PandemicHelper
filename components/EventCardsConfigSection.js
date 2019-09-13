import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';
import { EVENTS } from '../model/constants';
import { styles } from '../styles';

export default class EventCardsSection extends Component {
    static propTypes = {
        events: PropTypes.objectOf(PropTypes.bool).isRequired,
        onValueChange: PropTypes.func,
    };

    render() {
        const { events, onValueChange } = this.props;
        return (
            <View key='event-cards-section'>
                <Text key='event-cards-label' style={styles.heading}>Event Cards</Text>
                {Object.values(EVENTS).map(({ id, label }) =>
                    <View key={`event-card-${id}`} style={{ flex: 1, flexDirection: 'row', height: 40, width: '100%' }}>
                        <Text
                            key={`event-card-${id}-label`}
                            onPress={() => onValueChange && onValueChange({ ...events, [id]: !events[id] })}
                            style={{ alignSelf: 'center', flex: 1, marginRight: 5 }}
                        >
                            {label}
                        </Text>
                        <Switch
                            key={`event-card-${id}-switch`}
                            value={events[id]}
                            activeText='In'
                            inActiveText='Out'
                            onValueChange={(value) => onValueChange && onValueChange({ ...events, [id]: value })}
                            style={{ alignSelf: 'center', flex: 1 }} />
                    </View>
                )}
            </View>
        );
    }
}
