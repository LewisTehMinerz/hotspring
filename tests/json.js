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
        database.add(new JSONTable({
            name: 'test_table',
            keys: []
        }));
        connection.save().then(() => {
            let dataWritten = fs.readFileSync('./sampledb.json', {encoding: 'utf-8'});
            if (dataWritten !== '["test_table":{}') {
                throw new Error(dataWritten);
            }
            done();
        });
    });
});
describe('Cleanup', () => {
    it('delete sampledb', () => {
        fs.unlinkSync('./sampledb.json');
    });
});