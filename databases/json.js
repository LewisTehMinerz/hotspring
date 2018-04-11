const {Connection, Database, Table, Key} = require('./generic');

const fs = require('fs');
const Promise = require('bluebird');

const debug = require('debug')('database:json');

/**
 * Options for a {@link JSONConnection}.
 * @typedef {Object} JSONConnectionOptions
 * @property {String} filePath The file path to a JSON file. Encoding must be UTF-8.
 */
/**
 * Options for a {@link JSONDatabase}.
 * @typedef {Object} JSONDatabaseOptions
 * @property {JSONTable[]} tables The tables in this database.
 */
/**
 * Options for a {@link JSONTable}.
 * @typedef {Object} JSONTableOptions
 * @property {String} name The name of the table.
 * @property {JSONKey[]} keys The keys in this table.
 */
/**
 * Options for a {@link JSONKey}.
 * @typedef {Object} JSONKeyOptions
 * @property {String} name The name of the key.
 * @property {Any} value The value of the key.
 */

/** 
 * A connection to a JSON file.
 */
module.exports.JSONConnection = class JSONConnection extends Connection {
    /**
     * Creates a new {@link JSONConnection}.
     * @param {JSONConnectionOptions} options The options for this connection.
     */
    constructor(options) {
        super(options);
        debug('debugging is enabled');
    }

    /**
     * Loads the JSON file.
     * @returns {Promise<JSONDatabase>} A promise that, when resolves, returns the JSONDatabase object. Rejects on error with an error object.
     */
    connect() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.options.filePath, {encoding: 'utf-8'}, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                // load json
                debug('loading JSON');
                let json = JSON.parse(data);
                // create temp arrays
                let tempTables = [];
                let tempKeys = [];
                // read the JSON and get tables
                // this does a similar thing to JSONDatabase#toJSON, but goes from JSON to the classes.
                Object.keys(json).forEach(table => {
                    debug('loading table ' + table);
                    // get all keys in this table
                    Object.keys(table).forEach(key => {
                        // push to a temp array for later
                        debug('loading key ' + key);
                        tempKeys.push(new exports.JSONKey({
                            name: key,
                            value: json[table][key]
                        }))
                    });
                    // use tempKeys to build a JSONTable object and push that to the tempTables array
                    debug('adding table to the final table array with keys');
                    tempTables.push(new exports.JSONTable({
                        name: table,
                        keys: tempKeys
                    }));
                    // rinse and repeat
                });
                // create database
                debug('create database');
                this.options.database = new exports.JSONDatabase({
                    tables: tempTables
                });
                // resolve!
                debug('finished');
                resolve(this.options.database);
            });
        });
    }

    /** 
     * Saves the data.
     * @returns {Promise} A promise that resolves if the data saved successfully. Rejects if there was an error.
     */
    save() {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.options.filePath, this.options.database.toJSON(), err => {
                if (err) reject(err);
                debug('saved data');
                resolve();
            });
        });
    }
}

/** 
 * A database stored in a JSON file.
 */
module.exports.JSONDatabase = class JSONDatabase extends Database {
    /**
     * Creates a new {@link JSONDatabase}.
     * @param {JSONDatabaseOptions} options The options for this database.
     */
    constructor(options) {
        super(options);
    }

    /**
     * Gets the tables in this database. See {@link JSONTable}
     */
    get tables() {
        return this.options.tables;
    }

    /**
     * Add a table to the database.
     * @param {JSONTable} table The table to add to this database.
     */
    add(table) {
        this.options.tables.push(table);
    }

    /** 
     * Gets the JSON string for this database.
     * @returns {String} The JSON string.
     */
    toJSON() {
        // create a blank array to store the table data in
        let base = [];
        debug('converting database to JSON');
        this.tables.forEach(table => {
            debug('loading table ' + table);
            // create a blank object to store each key in
            let tableData = {};
            table.keys.forEach(key => {
                debug('loading key ' + key);
                // add a key to the data
                tableData[key.name] = key.value;
            });
            // push the table data to the array
            debug('writing table');
            base[table] = tableData;
            // rinse and repeat
        });
        return JSON.stringify(base);
    }
}

/**
 * A table.
 */
module.exports.JSONTable = class JSONTable extends Table {
    /**
     * Creates a new {@link JSONTable}.
     * @param {JSONTableOptions} options The options for this table.
     */
    constructor(options) {
        super(options);
    }

    /**
     * Gets the name of the table.
     */
    get name() {
        return this.options.name;
    }

    /**
     * Gets the keys in this table. See {@link JSONKey}.
     */
    get keys() {
        return this.options.keys;
    }

    /**
     * Add a key to the table.
     * @param {JSONKey} key The key to add to this table.
     */
    add(key) {
        this.options.keys.push(key);
    }
}

/** 
 * A key.
 */
module.exports.JSONKey = class JSONKey extends Key {
    /**
     * Creates a new {@link JSONKey}.
     * @param {JSONKeyOptions} options The options for this key.
     */
    constructor(options) {
        super(options);
    }

    /**
     * Gets the name of the key.
     */
    get name() {
        return this.options.name;
    }
}