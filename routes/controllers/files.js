const mongodb = require("mongodb");
const dotenv = require("dotenv");

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
};
