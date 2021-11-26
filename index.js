const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const flash = require("connect-flash");
const passport = require("passport");

// db
const { options } = require("./keys");

// app
const app = express();
require("./lib/passport");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Middlewares
app.use(
  session({
    secret: "videojuegos24",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(options),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.error = req.flash("error");
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require("./routes/index"));
app.use(require("./routes/auth"));

// Public
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto ", app.get("port"));
});
