import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const start_path = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.local/share');

"use strict";

export class Datastore {
    public data: object;
    private path: string;
    private watchers: Array<Function>;

    /**
     * Creates/gets a datastore with specified name and scope. (If applicable.)
     * @param {string} name 
     * @param {string?} scope 
     */
    constructor(name: string, scope: string) {
        this.path = path.join(start_path, name);
        this.watchers = [];
        this.data = {};

        if (!fs.existsSync(this.path))
            fs.mkdirSync(this.path);

        if (scope)
            this.path = path.join(this.path, scope + '.json');
        else
            this.path = path.join(this.path, '_default.json');
    }

    private callWatchers(key: string, value: string) {
        this.watchers.forEach(watcher => {
            setTimeout(function() {
                watcher.apply({}, [key, value]);
            }, 0)
        })
    }

    /**
     * Gets the data in the store.
     * @returns {object}
     */
    getStoreData() {
        if (!fs.existsSync(this.path))
            fs.writeFileSync(this.path, 'e30=');

        let dat = Buffer.from(fs.readFileSync(this.path).toString(), 'base64').toString('ascii');
        return JSON.parse(dat);
    }

    /**
     * Saves the store to memory.
     * @returns {object}
     */
    load() {
        this.data = this.getStoreData();
        return this.data;
    }

    /**
     * Saves data to the store's file.
     */
    save() {
        let data = Buffer.from(JSON.stringify(this.data)).toString('base64');
        fs.writeFileSync(this.path, data);
    }

    /**
     * Gets a value from the store.
     * @param {string} key 
     * @returns {any}
     */
    get(key: string) {
        this.load();

        return this.data[key] || null;
    }

    /**
     * Sets a value in the store.
     * @param {string} key 
     * @param {any} value 
     */
    set(key: string, value: any) {
        this.data[key] = value;
        this.callWatchers(key, value);
        this.save();
    }

    /**
     * Watches the store for any changes.
     * @param {Function} callback 
     */
    watch(callback: Function) {
        this.watchers.push(callback);
    }
}

export default Datastore;