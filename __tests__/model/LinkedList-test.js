/**
 * @format
 */

import LinkedList from '../../model/LinkedList';

function assertNodeConnected(node, expectedValue, checkPrevious) {
    expect(node.value).toEqual(expectedValue);
    expect(node.next.previous).toEqual(node);
    if (checkPrevious) {
        expect(node.previous.next).toEqual(node);
    } else if (checkPrevious === false) {
        expect(node.previous).toBeFalsy();
    }
}

it('can create an empty list', () => {
    new LinkedList();
});

it('empty list values is a generator that returns nothing', () => {
    const iterator = new LinkedList().values((v) => v);
    const next = iterator.next();
    expect(next.value).toBeUndefined();
    expect(next.done).toBeTruthy();
});

it('list can be appended values', () => {
    const items = [{ val: 1 }, { val: 2 }, { val: 3 }];
    const linkedList = new LinkedList();
    for (let i = 0; i < items.length; ++i) {
        const node = linkedList.push(items[i]);
        assertNodeConnected(node, items[i], i > 0);
        const values = Array.from(linkedList.values((v) => v));
        expect(values).toHaveLength(i + 1);
        expect(linkedList.length).toEqual(values.length);
        values.forEach((value, index) => expect(value).toEqual(items[index]));
    }
});

it('list can be prepended values', () => {
    const items = [{ val: 1 }, { val: 2 }, { val: 3 }];
    const linkedList = new LinkedList();
    for (let i = 0; i < items.length; ++i) {
        const node = linkedList.unshift(items[i]);
        assertNodeConnected(node, items[i], false);
        const values = Array.from(linkedList.values((v) => v));
        expect(values).toHaveLength(i + 1);
        expect(linkedList.length).toEqual(values.length);
        values.forEach((value, index) => expect(value).toEqual(items[i - index]));
    }
});

it('list can be appended and prepended values interleaved', () => {
    const append = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const prepend = [{ p: 1 }, { p: 2 }, { p: 3 }];
    const linkedList = new LinkedList();
    for (let i = 0; i < append.length; ++i) {
        let node = linkedList.push(append[i]);
        assertNodeConnected(node, append[i], i > 0);
        node = linkedList.unshift(prepend[i]);
        assertNodeConnected(node, prepend[i], false);
        const values = Array.from(linkedList.values((v) => v));
        expect(values).toHaveLength((i + 1) * 2);
        expect(linkedList.length).toEqual(values.length);
        values.forEach((value, index) =>  expect(value).toEqual(index <= i ? prepend[i - index] : append[index - i - 1]));
    }
});

it('popping an empty list will return undefined', () => {
    const linkedList = new LinkedList();
    expect(linkedList.pop()).toBeFalsy();
    expect(linkedList.length).toEqual(0);
});

it('shifting an empty list will return undefined', () => {
    const linkedList = new LinkedList();
    expect(linkedList.shift()).toBeFalsy();
    expect(linkedList.length).toEqual(0);
});

it('list can be popped', () => {
    const linkedList = new LinkedList();
    const items = [{ val: 1 }, { val: 2 }, { val: 3 }];
    items.forEach((item) => linkedList.push(item));
    items.forEach((item, i) => {
        expect(linkedList.length).toEqual(items.length - i);
        const lastIndex = items.length - i - 1;
        const result = linkedList.pop();
        expect(result.value).toEqual(items[lastIndex]);
        expect(result.node.value).toBeFalsy();
        expect(result.node.next).toBeFalsy();
        expect(linkedList.length).toEqual(lastIndex);
        const values = Array.from(linkedList.values((v) => v));
        expect(values).toHaveLength(lastIndex);
        expect(values).toEqual(items.slice(0, lastIndex));
    });
});

it('list can be shifted', () => {
    const linkedList = new LinkedList();
    const items = [{ val: 1 }, { val: 2 }, { val: 3 }];
    items.forEach((item) => linkedList.push(item));
    items.forEach((item, i) => {
        expect(linkedList.length).toEqual(items.length - i);
        const result = linkedList.shift();
        expect(result.value).toEqual(items[i]);
        expect(result.node.value).toEqual(items[i]);
        if (i < items.length - 1) {
            expect(result.node.next.previous).toBeFalsy();
        }
        expect(linkedList.length).toEqual(items.length - i - 1);
        const values = Array.from(linkedList.values((v) => v));
        expect(values).toHaveLength(items.length - i - 1);
        expect(values).toEqual(items.slice(i + 1));
    });
});
