const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId });

    const cartItems = await CartItem.find({ cart: cart._id }).populate(
      "product"
    );

    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalPrice = totalPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addCardItem = async (userId, req) => {
  try {
    const cart = Cart.findOne({ user: userId });
    const product = Product.findById(req.productId);

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        discountedPrice: product.discountedPrice,
        size: req.size,
      });
      const creeatedCartItem = await cartItem.save();
      cart.cartItems.push(creeatedCartItem);
      await cart.save();

      return "Item added to cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createCart, findUserCart, addCardItem };
