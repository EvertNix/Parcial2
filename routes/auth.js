const router = require("express").Router();
const passport = require("passport");

// database
const pool = require("../database");
//
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

router.get("/register", isNotLoggedIn, (req, res) => {
  res.render("auth/register", { title: "Registrate" });
});

router.post(
  "/register",
  passport.authenticate("local.register", {
    successRedirect: "/profile",
    failureRedirect: "/register",
    failureFlash: true,
  })
);

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("auth/login", { title: "Inicia sesión" });
});

router.post(
  "/login",
  isNotLoggedIn,
  passport.authenticate("local.login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "Videojuegos24" });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("login");
});

module.exports = router;
