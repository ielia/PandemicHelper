import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, TextInput, View } from 'react-native';

export default class ClearableTextInput extends PureComponent {
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

    constructor(props) {
        super(props);
        this.onChangeText = (text) => this.props.onChangeText(text);
        this.onClearText = async () => { await this.props.onClearText(); await this.props.onChangeText(''); };
    }

    render() {
        const { keyPrefix, placeholder, value } = this.props;
        // console.log('ClearableTextInput.render()');
        return (
            <View key={`${keyPrefix}-container`} style={{ flex: 1, flexDirection: 'row', height: 40, width: '100%' }}>
                <TextInput
                    key={`${keyPrefix}-input`}
                    style={{ alignSelf: 'stretch', borderColor: 'gray', borderWidth: 1, flex: 1, height: '100%', marginRight: 5 }}
                    onChangeText={this.onChangeText}
                    value={value}
                    placeholder={placeholder}
                />
                <Button
                    key={`${keyPrefix}-clear-button`}
                    style={{ height: '100%', width: 20 }}
                    onPress={this.onClearText}
                    title='X'
                    color='#FF0000'
                />
            </View>
        );
    }
}
