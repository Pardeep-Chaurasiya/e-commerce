const express = require("express");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/db.config");
const cors = require("cors");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const adminProductRoute = require("./routes/adminProduct.route");
const adminOrderRoute = require("./routes/adminOrder.route");
const cartRoute = require("./routes/cart.route");
const cartItemRoute = require("./routes/cartItem.route");
const orderRoute = require("./routes/order.route");
const raingRoute = require("./routes/rating.route");
const reviewRoute = require("./routes/review.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users",userRoute)
// app.use("/api/products",productRoute)
// app.use("/api/admin/products",adminProductRoute)
// app.use("/api/admin/orders",adminOrderRoute)
// app.use("/api/cart",cartRoute)
// app.use("/api/cart_items",cartItemRoute)
// app.use("/api/orders",orderRoute)
// app.use("/api/ratings",raingRoute)
// app.use("/api/reviews",reviewRoute)

const PORT = process.env.PORT;
connectDB();
app.listen(PORT, () => {
  console.log(`Server started on port : http://localhost:${PORT}`);
});
