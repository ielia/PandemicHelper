import Card from './Card';
import { CARD_TYPES } from './constants';

export default class EpidemicCard extends Card {
    constructor() {
        super(CARD_TYPES.epidemic);
    }

    get label() { return 'Epidemic'; }
}
