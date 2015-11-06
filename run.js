'use strict';

var fs = require('fs')
  , Client = require('mariasql')
  , dbClient = new Client();

// Pull the name of the screenshot from the command line
var program = require('commander');
program
    .version('0.0.1')
    .option('-f --filename [string]', 'Name of the file to insert')
    .parse(process.argv);

if (!program.filename) {
    throw new Error('Screenshot filename is required. Example: node run.js -f small.txt');
}


// Set up the connection and trigger screenshot insertion
var connect = function () {
    // Replace db config with valid settings
    return dbClient.connect({
        host: 'localhost',
        user: 'nobody',
        password: 'password123',
        db: 'test_db'
    });
};

dbClient.on('error', function (err) {
    console.log('Database client error: ', err);
});

dbClient.on('close', function (err) {
    console.log('----------------------');
    console.log('Closing database connection...');
});

dbClient.on('ready', function () {
    console.log('Database client ready...');

    // Trigger insertion of the specified screenshot
    insertScreenshot(program.filename);
});

connect();



var insertSql = "INSERT INTO screenshots (screenshot, screenshot_length) VALUES (:screenshot, :screenshot_length)"
  , insertPq = dbClient.prepare(insertSql);


/**
 * Tries to insert both a small and large screenshot
 */
var insertScreenshot = function (filename) {

    var basePath = './screenshots/'
      , fullPath = basePath + filename;

    fs.stat(fullPath, function (err, stat) {

        if (err) {
            throw new Error('File stat error: ' + err);
        }

        // Read the file and attempt to insert its contents into the database
        fs.readFile(fullPath, function (err, data) {

            if (err) {
                throw new Error('File read error: ' + err);
            }

            var screenshotLength = data.length;
            console.log('Screenshot length: ', data.length);

            var finalQuery = insertPq({
                screenshot: data,
                screenshot_length: screenshotLength
              });

            dbClient.query(finalQuery, function (err, res) {

                if (err) {
                    throw new Error('Query error: ' + err);
                }

                console.log('Successful insert');
                console.log('Last insert id: ', dbClient.lastInsertId());
                
                dbClient.end();
                process.exit(0);
            });
        });
    });
};
