import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Picker, Text, View } from 'react-native';
import ClearableTextInput from '../components/ClearableTextInput';
import { MAX_PLAYERS, PLAYER_ROLES } from '../model/constants';
import { styles } from '../styles';

const PLAYER_INDEXES = [...Array(MAX_PLAYERS).keys()];
const PLAYER_NUMBERS = PLAYER_INDEXES.map(i => i + 1);
const PLAYER_ROLE_OBJECTS = Object.values(PLAYER_ROLES);

export default class PlayersConfigSection extends PureComponent {
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

    constructor(props) {
        super(props);
        this.onChangeNameTextInputs = PLAYER_INDEXES.map(index => async function (name) {
            await this.props.onChangeName(index, name);
            const newNames = [...this.props.names];
            newNames[index] = name;
            await this.props.onChangeNames(newNames);
            await this.props.onChangePlayer({ name, role: this.props.roles[index] });
            await this.props.onChangePlayers({ names: newNames, roles: this.props.roles });
        }.bind(this));
        this.onChangeRolePickerValues = PLAYER_INDEXES.map(index => async function (role) {
            await this.props.onChangeRole(index, role);
            const newRoles = [...this.props.roles];
            newRoles[index] = role;
            await this.props.onChangeRoles(newRoles);
            await this.props.onChangePlayer({ name: this.props.names[index], role });
            await this.props.onChangePlayers({ names: this.props.names, roles: newRoles });
        }.bind(this));
    }

    render() {
        const { names, roles } = this.props;
        // console.log(`PlayersConfigSection.render()`);
        return (
            <View key='players-section'>
                <Text key='players-label' style={styles.heading}>Players</Text>
                <View key='player-names-and-roles' style={{ height: 360 }}>
                    {PLAYER_NUMBERS.map((value, index) =>
                        <View key={`player${value}-data-container`} style={{ flex: 1, flexDirection: 'column', height: 80, marginBottom: 10, width: '100%' }}>
                            <ClearableTextInput
                                keyPrefix={`player${value}-name`}
                                onChangeText={this.onChangeNameTextInputs[index]}
                                value={names[index]}
                                placeholder={`player ${value}'s name`}
                            />
                            <Picker
                                key={`player${value}-role-picker`}
                                selectedValue={roles[index]}
                                style={{ alignSelf: 'flex-end', borderColor: 'gray', borderWidth: 1, flex: 1, height: 40, width: '80%' }}
                                onValueChange={this.onChangeRolePickerValues[index]}
                            >
                                {PLAYER_ROLE_OBJECTS.map(({ id, name }) => <Picker.Item key={`player${value}-role-${id}`} label={name} value={id} />)}
                            </Picker>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}
