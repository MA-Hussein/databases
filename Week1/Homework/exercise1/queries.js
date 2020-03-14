'use strict';

const queries = {
  dropDBmeetup: `DROP DATABASE IF EXISTS meetup`,
  createDBmeetup: 'CREATE DATABASE IF NOT EXISTS meetup',
  usemeetup: 'USE meetup',
  createInviteeTable:
    'CREATE TABLE IF NOT EXISTS Invitee (invitee_no int(3) ZEROFILL NOT NULL, invitee_name varchar(30), invited_by varchar(30), CONSTRAINT PK_Invitee_No PRIMARY KEY (invitee_no))',
  createRoomTable:
    'CREATE TABLE IF NOT EXISTS Room ( room_no int NOT NULL, room_name varchar(30), floor_number int, CONSTRAINT PK_Room_No PRIMARY KEY (room_no))',
  createMeetingTable:
    'CREATE TABLE IF NOT EXISTS Meeting ( meeting_no int NOT NULL AUTO_INCREMENT, meeting_title varchar(30), starting_time DATETIME NOT NULL , ending_time DATETIME, room_no int NOT NULL, CONSTRAINT PK_Meeting_No PRIMARY KEY (meeting_no))',
};

module.exports = queries;