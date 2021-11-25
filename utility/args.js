class args extends Array {
    #collection;

    constructor(args) {
        super();

        this.#collection = new Map();
        args.forEach((v, i) => {
            this.push(v.value ? v.value : v);

            if (v.name) {
                this.#collection.set(v.name, v.value);
                this[v.name] = v.value;
            }
        });
    }

    /**
     * An method to get any argument.
     * @param {String | Number} key The argument name or the index.
     * @returns {String | Number | Boolean | undefined} The argument value, undefined if not found.
     */
    get(key) {
        return this.#collection.get(key) || this[key];
    }
}

module.exports = args;