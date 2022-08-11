import bodyParser from "body-parser";
const cors = require("cors");
const express = require("express");
const fs + require("fs");
const router = require("./routes/index.js");
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api/", router);

app.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
});
