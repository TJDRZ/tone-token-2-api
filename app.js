require("dotenv").config({ path: "./.env" });
const { connectDB } = require("./config/db");
connectDB();

const express = require("express");
const path = require("path");

const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/user", require("./routes/user"));
app.use("/api/pedalboard", require("./routes/pedalboard"));
app.use("/api/pedal", require("./routes/pedal"));
app.use("/api/control", require("./routes/control"));

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(__dirname, "../client/build", "index.html")
  )
);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}...`));
