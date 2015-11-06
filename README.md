
Demonstrates an issue with performing large queries using version 0.2.5 of the mariasql client on Node v4.2.1. Not sure if it makes any difference, but the system used was FreeBSD 10.

Requirements
============
* [node.js](http://nodejs.org/) -- v4.2.1
* [mariasql](https://www.npmjs.com/package/mariasql) -- v0.2.5
* [commander](https://www.npmjs.com/package/commander)

Install Dependencies
============
* npm install commander
* npm install mariasql@0.2.5

Setup test table
============
Add the test table to a database using screenshots.sql

Run Test Cases
============

1. node run.js -f small.txt
2. node run.js -f medium.txt
3. node run.js -f large.txt

Only test case #1 completes successfully.
