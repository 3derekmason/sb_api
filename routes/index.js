const controller = require("./controllers/index.js");

const router = require("express").Router();

router.get("/", controller.stories.getAllStories);

module.exports = router;
