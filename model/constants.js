export const EVENT_CARDS = [
    { id: 'airlift', label: 'Airlift' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'grant', label: 'Government Grant' },
    { id: 'quiet', label: 'One Quiet Night' },
    { id: 'resilient', label: 'Resilient Population' },
].reduce((cards, card) => { cards[card.id] = card; return cards; }, {});

export const MAX_PLAYERS = 4;

export const PLAYER_ROLES = [
    /*
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
].reduce((roles, role) => { roles[role.id] = role; return roles; }, {});
