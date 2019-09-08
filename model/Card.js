export default class Card {
    constructor(type) {
        this.type = type;
    }

    get bgColor() { return this.type.color; }

    get fgColor() { return this.type.fontColor; }

    get label() { return ''; }
}
