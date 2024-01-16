const express = require("express");
const router = express.Router();

const cartItemController = require("../controllers/cartItem.controller");
const {authenticate} = require("../middlewares/authenticate");

router.delete("/:id", authenticate, cartItemController.removeCartItem);
router.put("/:id", authenticate, cartItemController.updateCartItem);

module.exports = router;
