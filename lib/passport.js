const passport = require("passport");
const PassportLocal = require("passport-local").Strategy;

//
const pool = require("../database");
//
const helpers = require("../lib/helpers");

passport.use(
  "local.register",
  new PassportLocal(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { email } = req.body;
      const users = {
        username,
        email,
        password,
      };
      users.password = await helpers.encryptPassword(password);
      const result = await pool.query("INSERT INTO users SET ?", [users]);
      users.id = result.insertId;
      return done(null, users);
    }
  )
);

passport.use(
  "local.login",
  new PassportLocal(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      console.log(req.body);
      const rows = await pool.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        const validatePassword = await helpers.comparePassword(
          password,
          user.password
        );
        if (validatePassword) {
          done(
            null,
            user,
            req.flash("success", "Bienvenido " + user.username)
          );
        } else {
          done(null, false, req.flash("error", "Contraseña incorrecta"));
        }
      } else {
        return done(null, false, req.flash("error", "El usuario no existe"));
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
