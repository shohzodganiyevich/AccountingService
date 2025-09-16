const {
  getAllClients,
  addClient,
  updateClient,
  deleteClient,
  getOneClientByID,
} = require("./../controllers/client.controller");
const router = require("express").Router();

router.get("/", getAllClients);
router.post("/", addClient);
router.patch("/:id", updateClient);
router.delete("/:id", deleteClient);
router.get("/:id", getOneClientByID);

module.exports = router;
