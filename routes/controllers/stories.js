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
      res.status(200).send(await stories.find({}).toArray());
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  addStory: async (req, res, next) => {
    try {
      const stories = await storiesCollection();
      await stories.insertOne({
        title: req.body.title,
        authorFirst: req.body.authorFirst,
        authorLast: req.body.authorLast,
        body: req.body.body,
        tags: req.body.tags,
        created_at: new Date(),
      });
      res
        .status(201)
        .send(`Story uploaded :${req.body.title} by ${req.body.authorFirst}`);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  deleteStory: async (req, res, next) => {
    try {
      console.log(req.body.title);
      const stories = await storiesCollection();
      await stories.deleteOne({ title: req.body.title });
      res.status(201).send("Story deleted forever");
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};
