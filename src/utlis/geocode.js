// CALL BACK
// Call the function from demo.js

const request = require("postman-request");

const geoCode = (address, callback) => {
  const geoURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaXJmYW5naGF6aSIsImEiOiJja25rNGVhdHQwN24yMm9wbXFmZHNhZXo0In0.oXD_WeY1a2lqQp8l8Hivvg";

  request({ url: geoURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
// geoCode("kolkata", (error, data) => {
//   console.log("error", error);
//   console.log("data", data);
// });

module.exports = geoCode;
