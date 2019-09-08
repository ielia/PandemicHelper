import EpidemicCard from './EpidemicCard';
import EventCard from './EventCard';
import InfectionCard from './InfectionCard';
import LocationCard from './LocationCard';

function byId(list) {
    return list.reduce((acc, element) => { acc[element.id] = element; return acc; }, {});
}

export const CARD_TYPES = byId([
    { id: 'event', deck: 'player', constructor: EpidemicCard, color: '#808000', fontColor: '#FFFFFF' },
    { id: 'epidemic', deck: 'player', constructor: EventCard, color: '#00FF00', fontColor: '#000000' },
    { id: 'infection', deck: 'infection', constructor: InfectionCard },
    { id: 'location', deck: 'player', constructor: LocationCard },
]);

export const DECKS = byId([
    { id: 'player', name: 'Player' },
    { id: 'infection', name: 'Infection' },
]);

export const DISEASES = byId([
    { id: 'yellow', name: 'Yellow', color: '#FFFF00', fontColor: '#000000' },
    { id: 'red', name: 'Red', color: '#FF0000', fontColor: '#FFFFFF' },
    { id: 'blue', name: 'Blue', color: '#0000FF', fontColor: '#FFFFFF' },
    { id: 'black', name: 'Black', color: '#000000', fontColor: '#FFFFFF' },
]);

export const EVENTS = byId([
    { id: 'airlift', label: 'Airlift' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'grant', label: 'Government Grant' },
    { id: 'quiet', label: 'One Quiet Night' },
    { id: 'resilient', label: 'Resilient Population' },
]);

export const MAX_PLAYERS = 4;

export const PLAYER_ROLES = byId([
    /* Legacy Season 1?:
    { id: 'archivist', name: 'Archivist' },
    { id: 'epidemiologist', name: 'Epidemiologist' },
    { id: 'field-operative', name: 'Field Operative' },
    { id: 'generalist', name: 'Generalist' },
    */
    { id: 'contingency-planner', name: 'Contingency Planner' },
    { id: 'dispatcher', name: 'Dispatcher' },
    { id: 'medic', name: 'Medic' },
    { id: 'operations-expert', name: 'Operations Expert' },
    { id: 'quarantine-specialist', name: 'Quarantine Specialist' },
    { id: 'researcher', name: 'Researcher' },
    { id: 'scientist', name: 'Scientist' },
]);

const RAW_LOCATIONS = [
    { id: 'bogota', name: 'Bogotá', disease: 'yellow' },
    { id: 'buenos-aires', name: 'Buenos Aires', disease: 'yellow' },
    { id: 'johannesburg', name: 'Johannesburg', disease: 'yellow' },
    { id: 'khartoum', name: 'Khartoum', disease: 'yellow' },
    { id: 'kinshasa', name: 'Kinshasa', disease: 'yellow' },
    { id: 'lagos', name: 'Lagos', disease: 'yellow' },
    { id: 'lima', name: 'Lima', disease: 'yellow' },
    { id: 'los-angeles', name: 'Los Angeles', disease: 'yellow' },
    { id: 'mexico-city', name: 'Mexico City', disease: 'yellow' },
    { id: 'miami', name: 'Miami', disease: 'yellow' },
    { id: 'santiago', name: 'Santiago', disease: 'yellow' },
    { id: 'sao-paulo', name: 'São Paulo', disease: 'yellow' },
    { id: 'bangkok', name: 'Bangkok', disease: 'red' },
    { id: 'beijing', name: 'Beijing', disease: 'red' },
    { id: 'ho-chi-minh-city', name: 'Ho Chi Minh City', disease: 'red' },
    { id: 'hong-kong', name: 'Hong Kong', disease: 'red' },
    { id: 'jakarta', name: 'Jakarta', disease: 'red' },
    { id: 'manila', name: 'Manila', disease: 'red' },
    { id: 'osaka', name: 'Osaka', disease: 'red' },
    { id: 'seoul', name: 'Seoul', disease: 'red' },
    { id: 'shanghai', name: 'Shanghai', disease: 'red' },
    { id: 'sydney', name: 'Sydney', disease: 'red' },
    { id: 'taipei', name: 'Taipei', disease: 'red' },
    { id: 'tokyo', name: 'Tokyo', disease: 'red' },
    { id: 'atlanta', name: 'Atlanta', disease: 'blue' },
    { id: 'chicago', name: 'Chicago', disease: 'blue' },
    { id: 'essen', name: 'Essen', disease: 'blue' },
    { id: 'london', name: 'London', disease: 'blue' },
    { id: 'madrid', name: 'Madrid', disease: 'blue' },
    { id: 'milan', name: 'Milan', disease: 'blue' },
    { id: 'montreal', name: 'Montréal', disease: 'blue' },
    { id: 'new-york', name: 'New York', disease: 'blue' },
    { id: 'paris', name: 'Paris', disease: 'blue' },
    { id: 'san-francisco', name: 'San Francisco', disease: 'blue' },
    { id: 'st-petesburg', name: 'St. Petersburg', disease: 'blue' },
    { id: 'washington', name: 'Washington', disease: 'blue' },
    { id: 'algiers', name: 'Algiers', disease: 'black' },
    { id: 'baghdad', name: 'Baghdad', disease: 'black' },
    { id: 'cairo', name: 'Cairo', disease: 'black' },
    { id: 'chennai', name: 'Chennai', disease: 'black' },
    { id: 'delhi', name: 'Delhi', disease: 'black' },
    { id: 'istanbul', name: 'Istanbul', disease: 'black' },
    { id: 'karachi', name: 'Karachi', disease: 'black' },
    { id: 'kolkata', name: 'Kolkata', disease: 'black' },
    { id: 'moscow', name: 'Moscow', disease: 'black' },
    { id: 'mumbai', name: 'Mumbai', disease: 'black' },
    { id: 'riyadh', name: 'Riyadh', disease: 'black' },
    { id: 'tehran', name: 'Tehran', disease: 'black' },
].map((location) => { location.disease = DISEASES[location.disease]; return location; });
export const LOCATIONS = byId(RAW_LOCATIONS);
export const LOCATIONS_BY_DISEASE = RAW_LOCATIONS.reduce(
    (locations, location) => {
        locations[location.disease.id].push(location); return locations;
    },
    Object.keys(DISEASES).reduce((acc, diseaseId) => ({ ...acc, [diseaseId]: [] }), {})
);
