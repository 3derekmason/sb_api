const mongodb = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const storiesCollection = async () => {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URI);
  return client.db("base").collection("stories");
};

module.exports = {
  getAllStories: async (req, res, next) => {
    try {
      const stories = await storiesCollection();
      res
        .status(200)
        .send(
          (await stories.find({}).toArray()) || "Hello from the other side"
        );
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};
