const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors"); // Import the cors package

const Menu = require("./models/Menu");
const OnlineOrder = require("./models/OnlineOrder");
const Reservation = require("./models/Reservation");
const Special = require("./models/Special");
const User = require("./models/User");

const app = express();

mongoose
  .connect(
    "mongodb+srv://sha989:FX7x01zSKXAGJVB2@cluster0.kggjqo6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log("error with connecting to the DB ", err);
  });

// important for using the body parameters
app.use(express.json());

app.get("/sayHello", (req, res) => {
  res.send("your app is working");
});

// ========== USERS ENDPOINTS ==========
app.post("/register", async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    const findUser = await User.find({ email }); // it will alwayas return array or embty array

    if (findUser.length > 0) {
      res.status(404).json({ message: "The email is already exsist!" });

      return;
    }

    // Hash passowrd
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.email = email;
    newUser.password = hashedPassword;

    await newUser.save();

    res.status(200).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      res.status(404).json({ message: "Wrong email!" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (passwordMatch) {
      res.status(200).json(findUser);
    } else {
      res.status(404).json({ message: "Wrong password!" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

// ========== MENU ENDPOINTS ==========
app.post("/menuitems", async (req, res) => {
  try {
    const itemInfo = req.body;
    const newMenuItem = new Menu();
    newMenuItem.category = itemInfo.category;
    newMenuItem.title = itemInfo.title;
    newMenuItem.price = itemInfo.price;
    newMenuItem.img = itemInfo.img;
    newMenuItem.desc = itemInfo.desc;

    await newMenuItem.save();
    res.status(200).json({ message: "Added successfully" });
  } catch (err) {
    return res.send("error");
  }
});

// Route to handle the menu request with category filtering
app.get("/menuitems", async (req, res) => {
  const category = req.query.category; // Get the category from the query string

  try {
    const menuItems = await Menu.find({ category });

    if (!menuItems.length) {
      return res
        .status(404)
        .json({ message: "No menu items found for that category" });
    }

    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/menuitems/:mealId", async (req, res) => {
  const id = req.params.mealId;
  try {
    const meal = await Menu.findById(id);
    res.json(meal);
    return;
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ========== SPECIALS ENDPOINTS ==========
app.post("/specials", async (req, res) => {
  try {
    const itemInfo = req.body;
    const newSpecialItem = new Special();
    newSpecialItem.title = itemInfo.title;
    newSpecialItem.price = itemInfo.price;
    newSpecialItem.img = itemInfo.img;
    newSpecialItem.description = itemInfo.description;
    await newSpecialItem.save();
    res.status(200).json({ message: "Added successfully" });
  } catch (err) {
    return res.send("error");
  }
});

app.get("/specials", async (req, res) => {
  try {
    const specials = await Special.find();
    return res.json(specials);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ========== ONLINEORDERS ENDPOINTS ==========
app.post("/onlineorders", async (req, res) => {
  try {
    const orderInfo = req.body;

    const newOrder = new OnlineOrder();
    newOrder.firstName = orderInfo.firstName;
    newOrder.phoneNumber = orderInfo.phoneNumber;
    newOrder.location = orderInfo.location;
    newOrder.totalPrice = orderInfo.totalPrice;
    newOrder.orderdItems = orderInfo.orderdItems;

    await newOrder.save();
    res.status(200).json({ message: "Ordered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

// ========== RESERVATIONS ENDPOINTS ==========
app.post("/reservations", async (req, res) => {
  try {
    const reservationInfo = req.body;

    const newReservations = new Reservation();
    newReservations.firstName = reservationInfo.firstName;
    newReservations.lastName = reservationInfo.lastName;
    newReservations.email = reservationInfo.email;
    newReservations.phoneNumber = reservationInfo.phoneNumber;
    newReservations.options = reservationInfo.options;

    await newReservations.save();
    res.status(200).json({ message: "Ordered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

app.listen(3000, () => {
  console.log("I'm listening in port 3000");
});
