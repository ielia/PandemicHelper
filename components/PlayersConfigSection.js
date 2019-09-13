import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import ClearableTextInput from '../components/ClearableTextInput';
import { MAX_PLAYERS, PLAYER_ROLES } from '../model/constants';
import { styles } from '../styles';

export default class PlayersConfigSection extends Component {
    static propTypes = {
        names: PropTypes.arrayOf(PropTypes.string),
        onChangeName: PropTypes.func,
        onChangeNames: PropTypes.func,
        onChangePlayer: PropTypes.func,
        onChangePlayers: PropTypes.func,
        onChangeRole: PropTypes.func,
        onChangeRoles: PropTypes.func,
        roles: PropTypes.arrayOf(PropTypes.string),
    };
    static defaultProps = {
        names: Array(4).fill(''),
        onChangeName: () => {},
        onChangeNames: () => {},
        onChangePlayer: () => {},
        onChangePlayers: () => {},
        onChangeRole: () => {},
        onChangeRoles: () => {},
        roles: Array(4).fill(''),
    };

    render() {
        const {
            names,
            onChangeName,
            onChangeNames,
            onChangePlayer,
            onChangePlayers,
            onChangeRole,
            onChangeRoles,
            roles
        } = this.props;
        return (
            <View key='players-section'>
                <Text key='players-label' style={styles.heading}>Players</Text>
                <View key='player-names-and-roles' style={{ height: 360 }}>
                    {[...Array(MAX_PLAYERS).keys()].map(i => i + 1).map((value, index) =>
                        <View key={`player${value}-data-container`} style={{ flex: 1, flexDirection: 'column', height: 80, marginBottom: 10, width: '100%' }}>
                            <ClearableTextInput
                                keyPrefix={`player${value}-name`}
                                onChangeText={async (name) => {
                                    await onChangeName(index, name);
                                    const newNames = [...names];
                                    newNames[index] = name;
                                    await onChangeNames(newNames);
                                    await onChangePlayer({ name, role: roles[index] });
                                    await onChangePlayers({ names: newNames, roles });
                                }}
                                value={names[index]}
                                placeholder={`player ${value}'s name`}
                            />
                            <Picker
                                key={`player${value}-role-picker`}
                                selectedValue={roles[index]}
                                style={{ alignSelf: 'flex-end', borderColor: 'gray', borderWidth: 1, flex: 1, height: 40, width: '80%' }}
                                onValueChange={async (role) => {
                                    await onChangeRole(index, role);
                                    const newRoles = [...roles];
                                    newRoles[index] = role;
                                    await onChangeRoles(newRoles);
                                    await onChangePlayer({ name: names[index], role });
                                    await onChangePlayers({ names, roles: newRoles });
                                }}
                            >
                                {Object.values(PLAYER_ROLES).map(({ id, name }) => <Picker.Item key={`player${value}-role-${id}`} label={name} value={id} />)}
                            </Picker>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}
