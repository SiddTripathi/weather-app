const request = require("request");

const weather = (lattitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/ca5f3c5ed1b32841c29e707007815d0b/" +
    lattitude +
    "," +
    longitude +
    "?units=si";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("not able to connect with app", undefined, undefined);
    }
    if (response.body.error) {
      callback("Not correct co-ordinates", undefined, undefined);
    } else {
      callback(undefined, {
        temperature: response.body.currently.temperature
      });
    }
  });
};

module.exports = weather;
