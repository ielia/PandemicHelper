// TODO: Finish.

function add(listItemAdder, key, ...values) {
    return values.map((value) => {
        const position = this.list.length;
        const listItem = {key, value};
        listItemAdder(this.list, listItem);
        let group = this.groups[key];
        if (!group) {
            this.groups[key] = group = [];
        }
        listItem.position = group.push({key, value, position}) - 1;
        return position + 1;
    }).pop() || this.list.length;
}

function remove(listItemRemover) {
    let result;
    if (this.list.length) {
        const listItem = listItemRemover(this.list);
        this.groups[listItem.key].splice(listItem.position, 1);
        result = listItem.value;
    }
    return result;
}

function removeAll(finder, ...values) {
    values.forEach((value) => {
        const listItem = finder(this.list, value);
        if (listItem) {
            remove.call(this, list => list.splice(listItem.position, 1));
        }
    });
    return this;
}

export default class LinkedMultiMap {
    constructor() {
        this._ubound = {};
        this._first = this._ubound;
        this._groups = {};
        this._length = 0;
    }

    get length() { return this._length; }

    erase(...values) {
        return removeAll.call(
            this,
            (list, value) => list.find((item) => item.value === value),
            ...values
        );
    }

    keys() { return Object.keys(this._groups); }

    push(key, ...values) {
        values.forEach((value) => {
            this._ubound = { key, value, previous: this._ubound.previous, next: { previous: this._ubound } };
            this._groups[key].push({ key, value, node: this._ubound });
            this._ubound = this._ubound.next;
        });
        return this._length;
    }

    pop() {
        let result;
        if (this._first !== this._ubound) {
            this._ubound = this._ubound.previous;
            result = this._ubound.value;
            delete this._ubound.next;
            delete this._ubound.key;
            delete this._ubound.value;
        }
        return result;
    }

    remove(key, ...values) {
        return removeAll.call(
            this,
            (list, value) => list.find((item) => item.key === key && item.value === value),
            ...values
        );
    }

    splice(index, count, key, ...values) {
        const insertItems = values.map((value) => ({ key, value }));
        const displaced = arguments.length > 2
            ? this._list.splice(index, count, ...insertItems)
            : arguments.length > 1
                ? this._list.splice(index, count)
                : arguments.length === 1
                    ? this._list.splice(index)
                    : this._list.splice();
        return displaced.map((displacedItem, index) => {
            this.groups[displacedItem.key].splice(displacedItem.position, 1);
            insertItems[index].position =
            return displacedItem.value;
        });
    }

    shift() {
        let result;
        if (this._first !== this._ubound) {
            result = { key: this._first.key, value: this._first.value };
            this._first = this._first.next;
            delete this._first.previous;
        }
        return result;
    }

    unshift(key, ...values) {
        values.forEach((value) => {
            this._first = { key, value, next: this._first };
            this._first.next.previous = this._first;
            this._groups[key].push({ key, value, node: this._first });
        });
        return this._length;
    }

    values() {
        const values = [];
        let current = this._first;
        while (current !== this._ubound) {
            values.push(current.value);
            current = current.next;
        }
        return values;
    }
}
