const {
  exercise1,
  exercise2,
  exercise3,
  exercise4,
} = require("./../controllers/smartRequests.controller");
const router = require("express").Router();

router.use("/exircise1", exercise1);
router.use("/exircise2", exercise2);
router.use("/exircise3", exercise3);
router.use("/exircise4", exercise4);
router.use("/exircise5", exercise5);
