const express = require("express");
const router = require("./routes/index.js");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/", router);

app.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
});
