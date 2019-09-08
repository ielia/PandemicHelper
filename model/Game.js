import { LOCATIONS, LOCATIONS_BY_DISEASE } from './constants';
import EpidemicCard from './EpidemicCard';
import EventCard from './EventCard';
import InfectionCard from './InfectionCard';
import LocationCard from './LocationCard';

export default class Game {
    constructor({ events, numberOfEpidemics, players }) {
        this.infectionCardsDeck = {
            sortedTop: [],
            top: [],
            bottom: Object.values(LOCATIONS).map((location) => new InfectionCard(location)),
        };
        this.infectionCardsDiscarded = [];
        this.playerCardsDeck = {
            events: events.map((event) => new EventCard(event)),
            epidemics: Array(numberOfEpidemics).map(() => new EpidemicCard('epidemic')),
            ...Object.entries(LOCATIONS_BY_DISEASE).reduce((acc, [disease, locations]) => (
                { ...acc, [disease]: locations.map((location) => new LocationCard(location)) }
            ), {}),
        };
        this.playerCardsDiscarded = [];
        this.players = players;
    }

    get numberOfInitialCardsPerPlayer() {
        return 6 - this.players.length;
    }

    returnToPlayerCardsDeck(card) {
        if (card.type.id in this.playerCardsDeck) {
            this.playerCardsDeck[card.type.id].push(card);
        } else {
            this.playerCardsDeck[card.location.disease.id].push(card);
        }
    }
}
