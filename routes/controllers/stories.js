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
        author: req.body.author,
        body: req.body.body,
        tags: req.body.tags,
        link: req.body.link,
        created_at: new Date(),
      });
      res
        .status(201)
        .send(`Story uploaded :${req.body.title} by ${req.body.author}`);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};
