const { Router } = require("express");
const router = Router();

const ratingController = require("../controllers/rating.controller");
const authenticate = require("../middlewares/authenticate");

router.post("/create", authenticate, ratingController.createRating);
router.get("product/:productId", authenticate, ratingController.getAllRatings);

module.export = router;
