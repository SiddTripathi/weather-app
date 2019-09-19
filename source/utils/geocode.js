const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoic3RyaXBhdGhpIiwiYSI6ImNqem50YjVhNzA3cHIzbG81bWppdXVtMGMifQ.ushxGhIh1sVli4USGUU5uQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Location not found", undefined);
    } else {
      callback(undefined, {
        lattitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        place: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
