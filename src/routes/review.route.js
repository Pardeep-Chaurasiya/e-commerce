const { Router } = require("express");
const router = Router();

const reviewController = require("../controllers/review.controller");
const authenticate = require("../middlewares/authenticate");

router.post("/create", authenticate, reviewController.createReview);
router.get("product/:productId", authenticate, reviewController.getAllReview);

module.export = router;
