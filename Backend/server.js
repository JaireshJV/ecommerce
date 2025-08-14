// const express = require("express");
// const app = express();
// require("dotenv").config();
// app.use(express.json());
// const mongoose = require("mongoose");
// const cors = require("cors")
// app.use(cors())
// const authRoutes = require('./routes/auth');

// app.get("/", (req, res) => {
//   res.send("Hiiiiii");
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(
//         `The port is running successfully on PORT ${process.env.PORT}`
//       );
//     });
//   })
//   .catch((error) => console.log(error));

//   app.use('/api/auth', authRoutes);

  const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const authroute = require('./routes/auth')
const productRoutes = require('./routes/product');


// Routes
app.use('/api/auth',authroute);
app.use('/api/products', productRoutes);

// Protected test route
const authMiddleware = require('./middleware/authMiddleware');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello User ${req.user.id}, you are authorized!` });
});

// DB Connection & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error(err));



