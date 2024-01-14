const { Router } = require("express");
const router = Router();

const productController = require("../controllers/product.controller");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, productController.getAllProducts);
router.get("id/:id", authenticate, productController.findProductById);

module.export = router;
