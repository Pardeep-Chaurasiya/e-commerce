const { Router } = require("express");
const router = Router();

const orderController = require("../controllers/adminOrder.controller");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, orderController.getAllOrders);
router.put("/:orderId/confirmed", authenticate, orderController.confirmOrders);
router.put("/:orderId/ship", authenticate, orderController.shipOrders);
router.put("/:orderId/deliver", authenticate, orderController.deliverOrders);
router.put("/:orderId/cancle", authenticate, orderController.cancelledOrders);
router.put("/:orderId/delete", authenticate, orderController.deleteOrders);

module.export = router;
