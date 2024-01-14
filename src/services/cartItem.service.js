const CartItem = require("../models/cartItem.model");
const userService = require("./user.service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);

    if (!item) throw new Error("cart not found :", cartItemId);

    const user = await userService.getUserById(item.userId);

    if (!user) throw new Error("user not found :", userId);

    if (user._id.toString() === userId.toString()) {
      (item.quantity = cartItemData.quantity),
        (item.price = item.quantity * item.product.price),
        (item.discoutedPrice = item.quantity * item.product.discoutedPrice);

      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("you can't update this cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeCartItem = async (userId, cartItemId) => {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.getUserById(userId);

  if (user._id.toString() === cartItem.userId.toString()) {
    await CartItem.findByIdAndDelete(cartItemId);
  }

  throw new Error("you can't remove another user item");
};

const findCartItemById = async (cartItemId) => {
  const cartItem = await findCartItemById(cartItemId);
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("cartItem not found with id :", cartItemId);
  }
};

module.exports = { updateCartItem, removeCartItem, findCartItemById };
