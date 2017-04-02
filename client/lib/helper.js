/*
 var id = "4f94c2a11a6bbec3872cb315"​;
 // first 4 bytes are the timestamp portion (8 hex chars)
 var timehex = id.sub​string(0,8);
 console.log(timehex); // gives: 4f94c2a1

 // convert to a number... base 16
 var secondsSinceEpoch = parseInt(timehex, 16);
 console.log(secondsSinceEpoch); // gives: 1335149217

 // convert to milliseconds, and create a new date
 var dt = new Date(secondsSinceEpoch*1000);
 console.log(dt);​ // gives: Sun Apr 22 2012 22:46:57 GMT-0400 (EDT)
 */

import humanize from 'humanize';

export const convertMongoIdToReadableDate = mongoId => prettifyDate(convertMongoIdToDate(mongoId));

export const clip = (content, maxLength) => {
  if (content.length > maxLength) {
    return content.slice(0, maxLength - 3) + "...";
  } else {
    return content;
  }
};

const prettifyDate = date => {
  return humanize.date('d-M-Y', date);
};

const convertMongoIdToDate = mongoId => {
  let timehex = mongoId.substring(0, 8);
  let secondsSinceEpoch = parseInt(timehex, 16);
  let dt = new Date(secondsSinceEpoch * 1000);
  return dt;
};