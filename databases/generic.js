/**
 * Credentials for {@link ConnectionOptions#credentials}.
 * @typedef {Object} Credentials
 * @property {String} username The username.
 * @property {String} password The password.
 */
/**
 * Options for a {@link Connection}.
 * @typedef {Object} ConnectionOptions
 * @property {String} server The IP or domain to connect to.
 * @property {Number} port The port to connect to.
 * @property {Credentials} credentials The credentials to connect to this server.
 */
/**
 * Options for a {@link Server}.
 * @typedef {Object} ServerOptions
 * @property {Database[]} databases The databases in the server.
 */
/**
 * Options for a {@link Database}.
 * @typedef {Object} DatabaseOptions
 * @property {Table[]} tables The tables in the database.
 */
/**
 * A column in a {@link Table}.
 * @typedef {Object} Column
 * @property {Number} id The ID of the column. Usually the number of the column starting from zero.
 * @property {String} type The type of column.
 */
/**
 * Options for a {@link Table}.
 * @typedef {Object} TableOptions
 * @property {Column[]} columns The columns of the table.
 * @property {Row[]} rows The rows of a table.
 */
/**
 * The values of {@link RowOptions#value}.
 * @typedef {Object} RowValue
 * @property {Any[]} values The values of the row. Must match up to the amount of columns specified in {@link RowOptions#columns}.
 */
/**
 * Options for a {@link Row}.
 * @typedef {Object} RowOptions
 * @property {RowValue} value The value of the row.
 */
/**
 * The value of a {@link KeyOptions} object. Must match up with the type of key, otherwise an error will be thrown.
 * @typedef {Any} KeyValue
 */
/** 
 * Options for a {@link Key}.
 * @typedef {Object} KeyOptions
 * @property {String} type The type of key, such as a boolean, int, string, etc.
 * @property {KeyValue} value The value of the key.
*/

/**
 * A connection.
 */
module.exports.Connection = class Connection {
    /**
     * Creates a new {@link Connection}.
     * @param {ConnectionOptions} options 
     */
    constructor(options) {
        this.options = options;
    }

    /** 
     * Attempts to connect to the server/database with the specified options given in the constructor.
     * @returns {Promise} A promise that resolves and returns a {@link Server} if connected, or rejected if it failed to connect.
     */
    connect() {
        throw new Error('Attempting to use Connection to connect to a server or database.');
    }
}

/** 
 * A server.
 */
module.exports.Server = class Server {
    /**
     * Creates a new {@link Server}.
     * @param {ServerOptions} options The options for this server.
     */
    constructor(options) {
        this.options = options;
    }

    /**
     * Gets the databases for this server. See {@link Database}.
     */
    get databases() {
        return this.options.databases;
    }
}

/** 
 * A database.
  */
module.exports.Database = class Database {
    /**
     * Creates a new {@link Database}.
     * @param {DatabaseOptions} options The options for this database.
     */
    constructor(options) {
        this.options = options;
    }

    /**
     * Gets the tables for this database. See {@link Table}.
     */
    get tables() {
        return this.options.tables;
    }
}

/** 
 * A table.
 */
module.exports.Table = class Table {
    /**
     * Creates a new {@link Table}.
     * @param {TableOptions} options The options for this table.
     */
    constructor(options) {
        this.options = options;
    }
}

/** 
 * A row.
 */
module.exports.Row = class Row {
    /**
     * Creates a new {@link Row}.
     * @param {RowOptions} options 
     */
    constructor(options) {
        this.options = options;
    }

    /**
     * Gets the value of this row.
     */
    get value() {
        return this.options.value;
    }
}

/** 
 * A key.
 */
module.exports.Key = class Key {
    /**
     * Creates a new {@link Key}.
     * @param {KeyOptions} options The options for this key.
     */
    constructor(options) {
        this.options = options;
    }

    /**
     * Gets the type of the key.
     */
    get type() {
        return this.options.type;
    }

    /**
     * Gets the value of the key.
     */
    get value() {
        return this.options.value;
    }
}