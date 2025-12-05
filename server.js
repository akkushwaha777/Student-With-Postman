const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require('dotenv').config();

const userRoutes = require("./routes/Userroutes");
const authRoutes = require("./routes/authRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running...");
});

app.use("/api/User", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
