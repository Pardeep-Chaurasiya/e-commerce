const { Router } = require("express");
const router = Router();

const cardController = require("../controllers/cart.controller");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, cardController.findUserCart);
router.put("/add", authenticate, cardController.addItemToCart);

module.export = router;
