// index.js
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work! IP not retreived." , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("96.52.112.33",(error, coords) => {
//   if (error) {
//     console.log("It didn't work! Coordinates not found.", error);
//     return;
//   }
//   console.log('It worked! Returned Coordinates:', coords);
// });

// fetchISSFlyOverTimes({ latitude: 53.6304753, longitude: -113.625642 }, (error, coords) => {
//   if (error) {
//     console.log("It didn't work! ISS Flyover times not found.", error);
//     return;
//   }
//   console.log('It worked! Returned ISS Flyover times:', coords);
// });

