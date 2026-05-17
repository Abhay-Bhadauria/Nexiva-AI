const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

/* =========================
   Middlewares
========================= */

app.use(express.json());

app.use(cookieParser());

/* =========================
   CORS Configuration
========================= */

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://interviewiq-frontend-fts0.onrender.com"
];

app.use(cors({
    origin: function(origin, callback) {

        // allow requests with no origin
        // like mobile apps or postman
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },

    credentials: true
}));

/* =========================
   Routes
========================= */

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);

app.use("/api/interview", interviewRouter);

/* =========================
   Default Route
========================= */

app.get("/", (req, res) => {
    res.send("Backend API is running...");
});

/* =========================
   Export App
========================= */

module.exports = app;