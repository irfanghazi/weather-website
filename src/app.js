const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forcast = require("./utlis/forcast");
const geoCode = require("./utlis/geocode");
// console.log(__filename);
console.log(__dirname);
// console.log(path.join(__dirname));
// console.log(path.join(__dirname, ".."));
// console.log(path.join(__dirname, "../public"));

// app.com
// app.com/help
// app.com/about

// provide the final path after express
const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup static directory to server
app.use(express.static(publicDirectoryPath));

// setup Handlebars engine and views location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    Title: "Weather ",
    fName: "Irfan Ghazi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    Title: "About Me",
    fName: "Irfan Ghazi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    Title: "Help Page!",
    fName: "Irfan Ghazi",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404 page", {
    Title: 404,
    fName: "Irfan Ghazi",
    errorMessage: "Content not found",
  });
});

// app.get("*", (req, res) => {
//   res.render("404 page", {
//     Title: 404,
//     fName: "Irfan Ghazi",
//     errorMessage: "Page not found",
//   });
//});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "Please provide the location",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forcast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forcast: forecastData,

          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// No need to write default app.get("hello express"). index.html containt will be displayed

// app.get("", (req, res) => {
//   res.send("Hello express");
// });

// create a seprate html page each for /help, /about etc
// check in browser with localhost:3000/help.html

// app.get("/help", (req, res) => {
//   res.send("Help page");
// });
// app.get("/about", (req, res) => {
//   res.send("About");
// });
// app.get("/new", (req, res) => {
//   res.send({
//     forcast: "sunny",
//     location: "kolkata",
//   });
// });
//   app.get("/contact", (req, res) => {
//     res.send([
//       {
//         nameF: "John",
//         address: "New York",
//       },
//       {
//         contactP: "admin",
//         time: "morning",
//       },
//     ]);
//   });
// });
