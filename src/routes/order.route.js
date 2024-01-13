const {Router} = require("express")
const router = Router()

const orderController = require("../controllers/order.controller")
const authenticate = require("../middlewares/authenticate")


router.post("/",authenticate,orderController.createOrder)
router.get("/user",authenticate,orderController.orderHistory)
router.get("/:id",authenticate,orderController.findOrderById)


modeule.export = router