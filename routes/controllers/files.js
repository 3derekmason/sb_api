const mongodb = require("mongodb");
const dotenv = require("dotenv");
const upload = require("../../storage.js");

dotenv.config();

const filesCollection = async () => {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URI);
  return client.db("base").collection("files");
};

module.exports = {
  getAllFiles: async (req, res) => {
    try {
      fs.readdir("../../uploads", (err, docs) => {
        if (err) console.log(err);
        else {
          fs.readFile(`../../uploads/${docs[1]}`, "utf-8", (err, data) => {
            res.status(200).send(data);
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  },
  addFile: async (req, res) => {
    var file = fs.readFileSync(req.file.path);

    var encode_file = file.toString("base64");
    var final_file = {
      contentType: req.file.mimetype,
      file: encode_file.toString("base64"),
    };
    newFile.create(final_file, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        console.log("Saved To database");
        res.contentType(final_file.contentType);
        res.send(final_file);
      }
    });
  });
};
