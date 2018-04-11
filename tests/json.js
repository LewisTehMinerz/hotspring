/* eslint-env node, mocha */

const assert = require('assert');
const fs = require('fs');
const {JSONConnection, JSONDatabase, JSONTable, JSONKey} = require('..');

describe('JSON', () => {
    let connection;
    let database;
    it('should error if I am attempting to connect to a non-existant database', done => {
        new JSONConnection({
            filePath: './this_does_not_exist.json'
        }).connect().catch(err => {
            done();
        });
    });
    it('should return a JSONDatabase object when connecting to an existing database and the Promise resolves', done => {
        fs.writeFileSync('./sampledb.json', '[]');
        connection = new JSONConnection({
            filePath: './sampledb.json'
        });
        connection.connect().then(db => {
            database = db;
            done();
        });
    });
    it('should add a new table called "test_table"', done => {
        let table = new JSONTable({
            name: 'test_table',
            keys: []
        });
        database.add(table);
        connection.save().then(() => {
            let dataWritten = fs.readFileSync('./sampledb.json', {encoding: 'utf-8'});
            assert.equal(dataWritten, '{"test_table":{}}');
            assert.equal(database.table('test_table'), table);
            done();
        });
    });
    it('should add a new key called "test_key" with value true (boolean value)', done => {
        let key = new JSONKey({
            name: 'test_key',
            value: true
        });
        database.table('test_table').add(key);
        connection.save().then(() => {
            let dataWritten = fs.readFileSync('./sampledb.json', {encoding: 'utf-8'});
            assert.equal(dataWritten, '{"test_table":{"test_key":true}}');
            assert.equal(database.table('test_table').key('test_key'), key);
            done();
        });
    });
    it('open a new connection to the database', done => {
        connection = new JSONConnection({
            filePath: './sampledb.json'
        });
        connection.connect().then(db => {
            database = db;
            done();
        });
    });
    it('should reload all data exactly how it was when it was written', () => {
        let key = new JSONKey({
            name: 'test_key',
            value: true
        });
        let table = new JSONTable({
            name: 'test_table',
            keys: [key]
        });
        assert.deepEqual(database.table('test_table'), table);
        assert.deepEqual(database.table('test_table').key('test_key'), key);
    });
});