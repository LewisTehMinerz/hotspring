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
 * @property {Connection} connection The connection that this server is on.
 * @property {Database[]} databases The databases in the server.
 */
/**
 * Options for a {@link Database}.
 * @typedef {Object} DatabaseOptions
 * @property {Server} server The server that this database is on.
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
 * @property {Database} database The database that this table is on.
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
 * @property {Table} table The table that this row is on.
 * @property {RowValue} value The value of the row.
 */
/**
 * The value of a {@link KeyOptions} object. Must match up with the type of key, otherwise an error will be thrown.
 * @typedef {Any} KeyValue
 */
/** 
 * Options for a {@link Key}.
 * @typedef {Object} KeyOptions
 * @property {Database} database The database that this key is on.
 * @property {String} type The type of key, such as a boolean, int, string, etc.
 * @property {KeyValue} value The value of the key.
*/

/**
 * A connection.
 */
export class Connection {
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
 * A server, generally used for SQL-like servers with multiple databases.
 */
export class Server {
    /**
     * Creates a new {@link Server}.
     * @param {ServerOptions} options The options for this server.
     */
    constructor(options) {
        this.options = options;
    }

    /**
     * Gets the connection that this server is on. See {@link Connection}.
     */
    get connection() {
        return this.options.connection;
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
export class Database {
    /**
     * Creates a new {@link Database}.
     * @param {DatabaseOptions} options The options for this database.
     */
    constructor(options) {
        this.options = options;
    }

    /**
     * Gets the server that this database is on. See {@link Server}.
     */
    get server() {
        return this.options.server;
    }

    /**
     * Gets the tables for this database. See {@link Table}.
     */
    get tables() {
        return this.options.tables;
    }
}

/** 
 * A table, generally used for SQL-like databases.
 */
export class Table {
    /**
     * Creates a new {@link Table}.
     * @param {TableOptions} options The options for this table.
     */
    constructor(options) {
        this.options = options;
    }

    /**
     * Gets the database that this table is on. See {@link Database}.
     */
    get database() {
        return this.options.database;
    }

    /**
     * Gets the columns of the table. See {@link Column}.
     */
    get columns() {
        return this.options.columns;
    }

    /**
     * Gets the rows of the table. See {@link Row}.
     */
    get rows() {
        return this.options.rows;
    }
}

/** 
 * A row, generally used for SQL-like tables.
 */
export class Row {
    /**
     * Creates a new {@link Row}.
     * @param {RowOptions} options 
     */
    constructor(options) {
        this.options = options;
    }
}

/** 
 * A key, generally used for Redis-like databases.
 */
export class Key {
    /**
     * Creates a new {@link Key}.
     * @param {KeyOptions} options The options for this key.
     */
    constructor(options) {
        this.options = options;
    }
    /**
     * Returns the type of the key.
     */
    get type() {
        return this.options.type;
    }
    /**
     * Returns the value of the key.
     */
    get value() {
        return this.options.value;
    }
}