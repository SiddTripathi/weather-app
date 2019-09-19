const path = require("path");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");
const express = require("express");
const hbs = require("hbs");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));

//setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialpath);

app.get("", (req, res) => {
  res.render("index", {
    title: "The Weather App",
    name: "Sidd"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About myself",
    name: "Siddharthaa"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Siddharth",
    message: "This is in case you need any help"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must pass address"
    });
  }
  geocode(req.query.address, (error, { lattitude, longitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    weather(lattitude, longitude, (error, temperature) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        temp: temperature,
        location: place
      });
    });
  });
  // res.send({
  //   forecast: "It is raining",
  //   address: "Auckland",
  //   location: "Auckland"
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Siddharth",
    errorMessages: "Help page not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sidharth",
    errorMessages: "Page not found"
  });
});

app.listen(port, () => {
  console.log("server is up now" + port);
});
