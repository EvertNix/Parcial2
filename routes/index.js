const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Videojuegos24" });
});

module.exports = router;
