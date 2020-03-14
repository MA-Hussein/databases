'use strict';

const mysql = require('mysql');
const util = require('util');

const { Invitee, Room, Meeting } = require('./tables');
const {
  dropDBmeetup,
  createDBmeetup,
  usemeetup,
  createInviteeTable,
  createRoomTable,
  createMeetingTable,
} = require('./queries');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

const createAndSeedDB = async () => {
  connection.connect();

  try {
    await execQuery(dropDBmeetup);
    await execQuery(createDBmeetup);
    await execQuery(usemeetup);
    await execQuery(createInviteeTable);
    await execQuery(createRoomTable);
    await execQuery(createMeetingTable);

    Invitee.forEach(async Invitee => {
      await execQuery('INSERT INTO Invitee SET ?', Invitee);
    });

    Room.forEach(async Room => {
      await execQuery('INSERT INTO Room SET ?', Room);
    });

    Meeting.forEach(async Meeting => {
      await execQuery('INSERT INTO Meeting SET ?', Meeting);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
};

createAndSeedDB();