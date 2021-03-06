import Card from './Card';
import { CARD_TYPES, LOCATIONS } from './constants';

export default class LocationCard extends Card {
    constructor(location) {
        super(CARD_TYPES.location);
        this.location = typeof(location) === 'string' ? LOCATIONS[location] : location;
    }

    get bgColor() { return this.location.disease.color; }

    get disease() { return this.location.disease; }

    get fgColor() { return this.location.disease.fontColor; }

    get label() { return this.location.name; }
}
