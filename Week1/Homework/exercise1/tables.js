'use strict';

const tables = {
  Invitee: [
    { invitee_no: 1, invitee_name: 'one', invited_by: 'John' },
    { invitee_no: 2, invitee_name: 'two', invited_by: 'Jacob' },
    { invitee_no: 3, invitee_name: 'three', invited_by: 'Sara' },
    { invitee_no: 4, invitee_name: 'four', invited_by: 'Lion' },
    { invitee_no: 5, invitee_name: 'five', invited_by: 'Nina' },
  ],
  Room: [
    { room_no: 101, room_name: 'A', floor_number: 1 },
    { room_no: 102, room_name: 'B', floor_number: 2 },
    { room_no: 103, room_name: 'C', floor_number: 3 },
    { room_no: 104, room_name: 'D', floor_number: 4 },
    { room_no: 105, room_name: 'E', floor_number: 5 },
  ],
  Meeting: [
    {
      meeting_title: 'Planning',
      starting_time: '2020-03-01 12:00:00',
      ending_time: '2020-03-01 13:30:00',
      room_no: 101,
    },
    {
      meeting_title: 'Analysis',
      starting_time: '2020-03-05 10:00:00',
      ending_time: '2020-03-05 11:30:00',
      room_no: 102,
    },
    {
      meeting_title: 'Design',
      starting_time: '2020-03-10 13:00:00',
      ending_time: '2020-03-10 14:00:00',
      room_no: 105,
    },
    {
      meeting_title: 'Implementation',
      starting_time: '2020-03-10 09:00:00',
      ending_time: '2020-03-10 11:00:00',
      room_no: 104,
    },
    {
      meeting_title: 'Testing',
      starting_time: '2020-03-15 10:00:00',
      ending_time: '2020-03-15 12:00:00',
      room_no: 103,
    },
  ],
};

module.exports = tables;