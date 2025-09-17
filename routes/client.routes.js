const admin_authGuard = require("../middlewares/guards/admin_auth.guard");
const client_authGuard = require("../middlewares/guards/client_auth.guard");
const creatorGuard = require("../middlewares/guards/creator.guard");
const selfGuard = require("../middlewares/guards/self.guard");
const validation = require("../middlewares/validation");
const clientValidation = require("../validation/client.validation");
const {
  getAllClients,
  addClient,
  updateClient,
  deleteClient,
  getOneClientByID,
} = require("./../controllers/client.controller");
const router = require("express").Router();

router.get("/", admin_authGuard, creatorGuard, getAllClients);
router.post("/", validation(clientValidation),client_authGuard, addClient);
router.patch("/:id", validation(clientValidation),admin_authGuard, updateClient);
router.delete("/:id",admin_authGuard,selfGuard, deleteClient);
router.get("/:id",selfGuard, getOneClientByID);

module.exports = router;
