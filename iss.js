const request = require("request");

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) return callback(error, null);

      fetchISSFlyOverTimes({ latitude: 53.6304753, longitude: -113.625642 }, (error, coords) => {
        if (error) return callback(error, null);

        callback(null, passTimes);
      });
    });
  });
};


const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};


const fetchCoordsByIP = (ip, callback) => {
  const url = 'http://ipwho.is/' + ip;
  request(url, (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates ${body}`), null);
      return;
    }

    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const data = {
      latitude: parsedBody.latitude,
      longitude: parsedBody.longitude
    };
    callback(null, data);

  });
};


const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.latitude}`;
  request(url, (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching flyover times ${body}`), null);
      return;
    }

    const data = JSON.parse(body);

    if (coords.latitude < -80 || coords.latitude > 80) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for ISS flyover times ${data.latitude}`;
      callback(Error(message), null);
      return;
    }

    if (coords.longitude < -180 || coords.longitude > 180) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for ISS flyover times ${data.longitude}`;
      callback(Error(message), null);
      return;
    }

    console.log('body:', data.response); // Print the HTML for the Google homepage.
  });
};




module.exports = { nextISSTimesForMyLocation };