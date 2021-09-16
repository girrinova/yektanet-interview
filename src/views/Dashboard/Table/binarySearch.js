import data from './data';

class Node {
    constructor(val) {
        this.val = val;
        this.right = null;
        this.left = null;
        this.items = [];
    };
}

class BST {
    constructor() {
        this.root = null;
    }
    add(val, obj) {
        const newNode = new Node(val);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let current = this.root;

        const addSide = side => {
            if (!current[side]) {
                current[side] = newNode;
                return this;
            }
            current = current[side];
        };

        while (true) {
            if (val === current.val) {
                current.items.push(obj);
                return this;
            }
            if (val < current.val) addSide('left');
            else addSide('right');
        }
    };
    find(val) {
        if (!this.root) return undefined;
        let current = this.root,
            found = false;

        while (current && !found) {
            if (val < current.val) current = current.left;
            else if (val > current.val) current = current.right;
            else found = true;
        }

        if (!found) return 'Nothing Found!';
        return current;
    };
}

let dataBST = null;

export const createDataBST = () => {
    if (dataBST) return dataBST;
    let tree = new BST();
    [...data].forEach(item => tree.add(item.date, item));
    dataBST = tree;
    return dataBST;
};


