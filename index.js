const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser')


var app = express();

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static('public'));
//app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
//app.set("views", __dirname);



const createViewRoute = require('./Routes/auth');

app.use('/', createViewRoute);

const updateDeleteRoute = require('./Routes/crud');

app.use('/', updateDeleteRoute);


app.listen(3000, () => {
  console.log("Express Server started at 3000");
});