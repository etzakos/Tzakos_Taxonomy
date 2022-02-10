const logger = require("./services/logging");
const express = require("express");
const app = express();

require("./services/logging");
require("./services/routes")(app);
require("./services/dbService");
require("./services/config")();
require("./services/validation")();

const port = process.env.PORT || 3001;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
