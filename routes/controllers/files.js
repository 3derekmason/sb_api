const mongodb = require("mongodb");
const dotenv = require("dotenv");
const fs = require("fs");
const upload = require("../../storage.js");

dotenv.config();

const filesCollection = async () => {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URI);
  return client.db("base").collection("files");
};

module.exports = {
  getAllFiles: async (req, res) => {
    try {
      await fs.readdir("./uploads", (err, docs) => {
        if (err) console.log(err);
        else {
          res.status(200).send(docs);
        }
      });
    } catch (err) {
      console.error(err);
    }
  },
  getAFile: async (req, res) => {
    console.log(new Date(req.query.added));
    try {
      await fs.readdir("./uploads", (err, docs) => {
        if (err) console.log(err);
        else {
          let addedDates = [];
          let correctDate = "";
          const verifyDate = (ds) => {
            const reqDate = req.query.added;

            const reqSecs = reqDate.split(":")[2];
            const dsSecs = ds.split(":")[2];

            const reqCheck = reqDate.split(":")[1];
            const dsCheck = ds.split(":")[1];

            return reqCheck === dsCheck;
          };
          docs.forEach((doc) => {
            const date = doc.split("_")[1];

            if (verifyDate(date)) {
              correctDoc = doc;
            }
            addedDates.push(new Date(date));
          });

          fs.readFile(`./uploads/${correctDoc}`, "utf-8", (err, data) => {
            if (err) console.error(err);
            res.status(200).send(data);
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  },
  addFile: async (req, res) => {
    const file = fs.readFileSync(req.file.path);
    const encode_file = file.toString("base64");
    const final_file = {
      contentType: req.file.mimetype,
      file: encode_file.toString("base64"),
    };
    try {
      const files = await filesCollection();
      await files.insertOne({ file: final_file, submitted: new Date() });
      res.status(201).send("File submitted");
    } catch (err) {
      console.error(err);
    }
  },
};
