// TODO: Finish.

export default class LinkedList {
    constructor() {
        this._ubound = {};
        this._first = this._ubound;
        this._length = 0;
    }

    get length() {
        return this._length;
    }

    erase(node) {
        let found = false;
        let current = this._first;
        if (node === current) {
            this.shift();
            found = true;
        } else {
            while (current !== this._ubound && current !== node) {
                current = current.next;
            }
            found = current === node;
            if (found) {
                current.previous.next = current.next;
                current.next.previous = current.previous;
                --this._length;
            }
        }
        return found;
    }

    pop() {
        let result;
        if (this._length) {
            this._ubound = this._ubound.previous;
            result = { node: this._ubound, value: this._ubound.value };
            delete this._ubound.next;
            delete this._ubound.value;
            --this._length;
        }
        return result;
    }

    push(value) {
        const last = this._ubound;
        last.value = value;
        last.next = { previous: last };
        this._ubound = last.next;
        ++this._length;
        return last;
    }

    remove(value) {
        let result;
        let current = this._first;
        while (current !== this._ubound && current.value !== value) {
            current = current.next;
        }
        if (current.value === value) {
            const previous = current.previous;
            const next = current.next;
            if (!previous) {
                result = this.shift();
            } else if (!next) {
                result = this.pop();
            } else {
                previous.next = next;
                next.previous = previous;
                --this._length;
                result = current;
            }
        }
        return result;
    }

    removeAt(index) {
        let result;
        if (index === 0) {
            result = this.shift();
        } else if (index === this._length - 1) {
            result = this.pop();
        } else if (0 <= index && index < this._length) {
            let current = this._first;
            for (let i = 0; i < index; ++i) {
                current = current.next;
            }
            current.previous.next = current.next;
            current.next.previous = current.previous;
            --this._length;
            result = current;
        }
        return result;
    }

    splice(index, count, key, ...values) {
        /*
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
        */
    }

    shift() {
        let result;
        if (this._length) {
            result = { node: this._first, value: this._first.value };
            this._first = this._first.next;
            delete this._first.previous;
            --this._length;
        }
        return result;
    }

    unshift(value) {
        const second = this._first;
        this._first = { value, next: second };
        second.previous = this._first;
        ++this._length;
        return this._first;
    }

    *values(getter) {
        let current = this._first;
        while (current !== this._ubound) {
            yield getter(current.value);
            current = current.next;
        }
    }
}
