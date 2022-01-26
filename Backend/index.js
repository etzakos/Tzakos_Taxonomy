const express = require("express");
const app = express();
const pool = require("./services/dbService");

app.use(express.json());
const cors = require("cors");
const { filter } = require("lodash");
app.use(cors({ origin: "*" }));

app.get("/", async (req, res) => {
  let sql = `SELECT 
  n.tax_id,
  n.parent_tax_id,
  n.rank,
  a.name_txt
  From nodes as n
  INNER JOIN tax_names as a
  ON a.tax_id=n.tax_id
  WHERE a.name_class= 'scientific name' limit 50`;
  pool.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

app.post("/filter_data", async (req, res) => {
  // [
  //   { field: [ 'tax_id', 'abc' ] },
  //   { boolean: 'or', field: [ 'name_txt', 'def' ] }
  // ]
  const filter = req.body;
  let sqlPredicate = "";
  console.log(req.body);
  if (Array.isArray(filter)) {
    numOfItems = filter.length;
    count = 0;
    filter.forEach((item, index) => {
      count++;
      let boolean = "";
      let field = item["field"];
      let column = field[0];
      let value = field[1];

      if (item["boolean"] !== undefined) {
        boolean = item["boolean"];
      }

      if (column === "tax_id") {
        spec_key = "n.tax_id";
      } else {
        spec_key = column;
      }

      if (!boolean) {
        sqlPredicate += `${spec_key} like '${value}%' `;
      } else {
        sqlPredicate += `${boolean} ${spec_key} like '${value}%'`;
      }

      console.log(sqlPredicate);
    });
  }
  // console.log(sqlPredicate);
  let sql = `SELECT
  n.tax_id,
  n.parent_tax_id,
  n.rank,
  a.name_txt
  From nodes as n
  INNER JOIN tax_names as a
  ON a.tax_id=n.tax_id
  WHERE a.name_class= 'scientific name' AND ( ${sqlPredicate} )`;
  console.log(sql);
  pool.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

app.get("/tax_id/:id", (req, res) => {
  let id = req.params.id;
  // let sql = `SELECT * FROM nodes where tax_id = ${id}`;
  let sql = `
  SELECT 
n.tax_id,
n.parent_tax_id,
n.rank,
a.name_txt
From nodes as n
INNER JOIN tax_names as a
ON a.tax_id=n.tax_id
WHERE a.name_class= 'scientific name'
AND n.tax_id = ${id};`;

  pool.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

app.get("/taxonomy_taxid/:id", (req, res) => {
  let id = req.params.id;
  // let sql = `SELECT * FROM nodes where tax_id = ${id}`;
  let sql = `SELECT * From nodes 
  INNER JOIN tax_names 
  ON tax_names.tax_id=nodes.tax_id 
  INNER JOIN gencode
  ON gencode.genetic_code_id=nodes.tax_id WHERE tax_names.tax_id = ${id} and name_class = 'scientific name'; `;

  pool.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

app.get("/taxonomy_parent/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM nodes where parent_tax_id = ${id}`;

  pool.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

app.post("/tax_names/search_unique_name", (req, res) => {
  let unique_name = req.body.unique_name.toLowerCase();

  let sql = `SELECT * 
              FROM tax_names 
              where LOWER(unique_name) 
              like '${unique_name}%' 
              and name_class <> 'type material';`;

  pool.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
