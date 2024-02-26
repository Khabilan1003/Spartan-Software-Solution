const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
var passport = require("passport");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

dotenv.config();
const connection = require("./config/database");
const MongoStore = require("connect-mongo")(session);
const app = express();

const bannerRouter = require("./routers/bannerRouter");
const dataRouter = require("./routers/dataRouter");
const authRouter = require("./routers/authRouter");

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));

// Session Setup and Passport Initialization
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 14 * 1000 * 60 * 60 * 24, // Equals 14 day (14 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Router Connection
app.use("/data", dataRouter);
app.use("/auth", authRouter);
app.use("/banners", bannerRouter);

// Starting API
app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening to port = ${process.env.PORT || 3000}`)
);
