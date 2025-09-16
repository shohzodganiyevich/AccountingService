const {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  getOneNewsByID,
} = require("../controllers/news.controller");
const router = require("express").Router();

router.get("/", getAllNews);
router.post("/", addNews);
router.patch("/:id", updateNews);
router.delete("/:id", deleteNews);
router.get("/:id", getOneNewsByID);

module.exports = router;
