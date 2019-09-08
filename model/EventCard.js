import Card from './Card';
import { CARD_TYPES, EVENTS } from './constants';

export default class EventCard extends Card {
    constructor(event) {
        super(CARD_TYPES.event);
        this.event = typeof(event) === 'string' ? EVENTS[event] : event;
    }

    get label() { return this.event.label; }
}
