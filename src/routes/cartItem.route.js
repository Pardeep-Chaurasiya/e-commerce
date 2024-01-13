const {Router} = require("express")
const router = Router()

const cartItemController = require("../controllers/cartItem.controller")
const authenticate = require("../middlewares/authenticate")

router.delete("/:id",authenticate,cartItemController.removeCartItem)
router.put("/:id",authenticate,cartItemController.updateCartItem)


modeule.export = router