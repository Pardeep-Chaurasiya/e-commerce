const express = require("express");
const router = express.Router();

const cardController = require("../controllers/cart.controller");
const {authenticate} = require("../middlewares/authenticate");

router.get("/", authenticate, cardController.findUserCart);
router.put("/add", authenticate, cardController.addItemToCart);

module.exports = router;
