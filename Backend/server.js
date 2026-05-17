require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

/* =========================
   Connect Database
========================= */

connectToDB();

/* =========================
   PORT Configuration
========================= */

const PORT = process.env.PORT || 3000;

/* =========================
   Start Server
========================= */

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});