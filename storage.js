const multer = require("multer");

// SET STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "_" + new Date());
  },
});

let upload = multer({ storage: storage });

module.exports = upload;
