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
          const results = [];
          docs.forEach(async (doc, i) => {
            await fs.readFile(`./uploads/${docs[i]}`, "utf-8", (data) => {
              console.log(data);
            });
          });
          console.log(results);
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
