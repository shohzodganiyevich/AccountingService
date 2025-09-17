const {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  getOneNewsByID,
} = require("../controllers/news.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");
const newsValidation = require("../validation/news.validation");
const router = require("express").Router();
const validation = require("./../middlewares/validation");

router.get("/", getAllNews);
router.post("/", validation(newsValidation), admin_authGuard, addNews);
router.patch("/:id", validation(newsValidation),admin_authGuard, updateNews);
router.delete("/:id",admin_authGuard, deleteNews);
router.get("/:id", getOneNewsByID);

module.exports = router;
