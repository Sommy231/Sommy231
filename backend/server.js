require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const createAdmin = require("./createAdmin");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*"
  })
);

app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SafeRoads API Running Successfully"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const isDatabaseConnected = await connectDB();

  if (isDatabaseConnected) {
    await createAdmin();
  } else {
    console.warn("Server started without database access.");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
