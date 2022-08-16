const controller = require("./controllers/index.js");
const upload = require("../storage.js");
const router = require("express").Router();

router.get("/", controller.stories.getAllStories);
router.post("/stories", controller.stories.addStory);
router.delete("/stories", controller.stories.deleteStory);
router.get("/files", controller.files.getAllFiles);
router.post("/files", upload.single("file"), controller.files.addFile);

module.exports = router;
