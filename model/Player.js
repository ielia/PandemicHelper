import { PLAYER_ROLES } from './constants';

export default class Player {
    constructor(name, role) {
        this.name = name;
        this.role = typeof(role) === 'string' ? PLAYER_ROLES[role] : role;
        this._hand = [];
    }

    get hand() {
        return this._hand;
    }

    addToHand(card) {
        const index = this._hand.indexOf(card);
        if (index < 0) {
            this._hand.push(card);
        }
    }

    removeFromHand(card) {
        const index = this._hand.indexOf(card);
        if (index > -1) {
            this._hand.splice(index, 1);
        }
    }

    replaceInHand(index, newCard) {
        const oldCard = this._hand[index];
        if (oldCard) {
            this._hand[index] = newCard;
        } else {
            this._hand.push(newCard);
        }
        return oldCard;
    }
}
