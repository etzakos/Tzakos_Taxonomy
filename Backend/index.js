const express = require("express");
const app = express();
const taxonomy = require("./routes/taxonomy");

const cors = require("cors");
const { filter } = require("lodash");

app.use(express.json());

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    //Handle SyntaxError here.
    return res.status(500).send({ data: "Invalid data" });
  } else {
    next();
  }
});

app.use(cors({ origin: "*" }));

app.use("/api", taxonomy);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
