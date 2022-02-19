const logger = require("./services/logging");
const express = require("express");
const app = express();

require("./services/config")();
require("./services/logging");
require("./services/dbService");
require("./services/routes")(app);

const port = process.env.PORT || 3001;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
