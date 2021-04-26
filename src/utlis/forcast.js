// call the function from demo.js

const request = require("postman-request");

let forcast = (latitude, longitude, callback) => {
  const weatherURL =
    "http://api.weatherstack.com/current?access_key=42f10f3592edd3f331bb95564a78c42c&query=" +
    latitude +
    "," +
    longitude +
    "";

  request({ url: weatherURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect location", undefined);
    } else if (body.error) {
      callback("Entered wrong location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degree out. It feels like ${body.current.feelslike} degree inside the house and the humidity is ${body.current.humidity}%.`
      );
    }
  });
};

// forcast(22.565, 88.317, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = forcast;
