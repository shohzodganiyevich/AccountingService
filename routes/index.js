const clientRoutes = require("./client.routes");
const contractRoutes = require("./contract.routes");
const paymentTypeRoutes = require("./payment_type.routes");
const paymentRoutes = require("./payment.routes");
const paymentTypeContractRoutes = require("./payment_type_contract.routes");
const adminRoutes = require("./admin.routes");
const newsRoutes = require("./news.routes");
const employerRoutes = require("./employer.routes");
const workRoutes = require("./work.routes");
const routes = require("express").Router();

routes.use("/client", clientRoutes);
routes.use("/contract", contractRoutes);
routes.use("/payment_type", paymentTypeRoutes);
routes.use("/payment", paymentRoutes);
routes.use("/payment_type_contract", paymentTypeContractRoutes);
routes.use("/admin", adminRoutes);
routes.use("/news", newsRoutes);
routes.use("/employer", employerRoutes);
routes.use("/work", workRoutes);

module.exports = routes;
