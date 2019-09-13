import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';

export default class ClearableTextInput extends Component {
    static propTypes = {
        keyPrefix: PropTypes.string,
        onChangeText: PropTypes.func,
        onClearText: PropTypes.func,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    };
    static defaultProps = {
        keyPrefix: 'clearable-text-input',
        onChangeText: () => {},
        onClearText: () => {},
        placeholder: '',
        value: '',
    };

    render() {
        const { keyPrefix, onChangeText, onClearText, placeholder, value } = this.props;
        return (
            <View key={`${keyPrefix}-container`} style={{ flex: 1, flexDirection: 'row', height: 40, width: '100%' }}>
                <TextInput
                    key={`${keyPrefix}-input`}
                    style={{ alignSelf: 'stretch', borderColor: 'gray', borderWidth: 1, flex: 1, height: '100%', marginRight: 5 }}
                    onChangeText={(text) => onChangeText(text)}
                    value={value}
                    placeholder={placeholder}
                />
                <Button
                    key={`${keyPrefix}-clear-button`}
                    style={{ height: '100%', width: 20 }}
                    onPress={async () => { await onClearText(); await onChangeText(''); }}
                    title='X'
                    color='#FF0000'
                />
            </View>
        );
    }
}
