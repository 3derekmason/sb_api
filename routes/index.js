const controller = require("./controllers/index.js");

const router = require("express").Router();

router.get("/", controller.stories.getAllStories);
router.post("/stories", controller.stories.addStory);

module.exports = router;
