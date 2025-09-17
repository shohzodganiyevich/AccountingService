const {
  getAllContracts,
  addContract,
  updateContract,
  deleteContract,
  getOneContractByID,
} = require("../controllers/contract.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");
const client_authGuard = require("../middlewares/guards/client_auth.guard");
const creatorGuard = require("../middlewares/guards/creator.guard");
const selfGuard = require("../middlewares/guards/self.guard");
const validation = require("../middlewares/validation");
const contractValidation = require("../validation/contract.validation");
const router = require("express").Router();

router.get("/", admin_authGuard, creatorGuard, getAllContracts);
router.post("/", validation(contractValidation), client_authGuard, addContract);
router.patch("/:id", validation(contractValidation),admin_authGuard, updateContract);
router.delete("/:id",admin_authGuard, deleteContract);
router.get("/:id",client_authGuard,selfGuard, getOneContractByID);

module.exports = router;
