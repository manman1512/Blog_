const router = require("express").Router();
const {createCate, getCate, getCateByUser, getPostByTag} = require("../controllers/category.controller")

router.post("/", createCate);
router.get("/", getCate);
// router.get("/:tagId", getPostByTags)
router.get("/user/:_id", getCateByUser)
router.get("/:name", getPostByTag)

module.exports = router;