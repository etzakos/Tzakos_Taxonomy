const auth = require("../middleware/auth");
const Joi = require("joi");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const pool = require("../services/dbService");

router.get("/", (req, res) => {
  let sql = `SELECT 
    n.tax_id,
    n.parent_tax_id,
    n.rank_id,
    a.name_txt
    From nodes as n
    INNER JOIN tax_names as a
    ON a.tax_id=n.tax_id
    WHERE a.name_class= 'scientific name' limit 50`;

  console.log(sql);
  pool.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

router.post("/filter_data", (req, res) => {
  const filter = req.body;

  /* filter contains a datastuctrure similar to the below:
  // [
  //   { field: [ 'tax_id', 'abc' ] },
  //   { boolean: 'or', field: [ 'name_txt', 'def' ] }
  // ]
  */
  let sqlPredicate = "";
  allPredicateValues = [];

  if (Array.isArray(filter)) {
    filter.forEach((item, index) => {
      let key = "";
      let value = "";
      let boolean = "";
      let valueIsArithmetic = false;

      if (item["boolean"] !== undefined)
        boolean = item["boolean"]; /* e.g. boolean='or' or boolean="and" */

      key = item["field"][0]; /* e.g. tax_id */
      spec_key = key;
      value = String(
        item["field"][1]
      ).toLowerCase(); /* e.g. 5 or a lowercase string */

      if (key === "tax_id") {
        spec_key = "n.`tax_id`";
        valueIsArithmetic = true;
      }

      if (!boolean) {
        if (valueIsArithmetic) {
          sqlPredicate += `${spec_key} = ? `;
          allPredicateValues.push(value);
        } else {
          sqlPredicate += `${spec_key} like ?`;
          allPredicateValues.push(value + "%");
        }
      } else {
        if (valueIsArithmetic) {
          sqlPredicate += `${boolean} ${spec_key} = ?`;
          allPredicateValues.push(value);
        } else {
          sqlPredicate += `${boolean} ${spec_key} like ?`;
          allPredicateValues.push(value + "%");
        }
      }
    });
  }
  let sql = `SELECT
    n.tax_id,
    n.parent_tax_id,
    n.rank_id,
    a.name_txt
    FROM nodes as n
    INNER JOIN tax_names as a
    ON a.tax_id = n.tax_id
    WHERE ( ${sqlPredicate} )`;
  console.log(sql);
  console.log(allPredicateValues);

  pool.query(sql, allPredicateValues, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

router.get("/tax_id/:id", (req, res) => {
  let id = req.params.id;
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
  AND n.tax_id = ?`;

  console.log(sql);
  pool.query(sql, [id], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

router.get("/taxonomy_taxid/:id", (req, res) => {
  let id = req.params.id;
  // let sql = `SELECT * FROM nodes where tax_id = ${id}`;
  let sql = `SELECT n.tax_id,
  n.rank_id,
  n.embl_code,
  t.name_txt,
  g.genetic_code_id,
  g.name,
  n.parent_tax_id,
  g.cde,
  t.id,
  t.name_class,
  f.lineage
   From nodes as n
      INNER JOIN tax_names as t
      ON t.tax_id = n.tax_id 
      INNER JOIN gencode as g
      ON g.genetic_code_id = n.genetic_code_id 
      INNER JOIN Fullnamelineage as f
      ON f.tax_id = n.tax_id
      WHERE t.tax_id = ?`;

  console.log(sql);
  console.log(id);
  pool.query(sql, [id], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

router.delete("/taxonomy_taxid/", [auth, admin], (req, res) => {
  const obj = req.body;

  const schema = Joi.object({
    tax_id: Joi.string().required(),
    name_txt: Joi.string().required(),
  });

  // schema options
  const options = {
    abortEarly: false, // don't include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    let totalErrorText = "";
    for (let i = 0; i < error.details.length; i++) {
      totalErrorText += error.details[i].message + "\n";
    }

    return res.send(totalErrorText);
  }

  let sql = `delete from tax_names where tax_id = ? and name_txt = ?;`;

  console.log(sql);
  console.log([obj.tax_id, obj.name_txt]);
  pool.query(sql, [obj.tax_id, obj.name_txt], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    return res.send(results);
  });
});

router.patch("/taxonomy_taxid/", auth, (req, res) => {
  const obj = req.body;

  let sql = `update tax_names set name_txt = ? where tax_id = ? and name_txt = ? LIMIT 1;`;

  // console.log("obj", obj);
  console.log(sql);
  console.log([obj.data[1], obj.data[0].tax_id, obj.data[0].name_txt]);
  pool.query(
    sql,
    [obj.data[1], obj.data[0].tax_id, obj.data[0].name_txt],
    (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results);
    }
  );
});

router.get("/taxonomy_parent/:id", (req, res) => {
  let id = req.params.id;
  // let sql = `SELECT * FROM nodes where parent_tax_id = ${id}`;
  let sql = `
  SELECT 
  n.tax_id,
  t.name_txt,
  n.rank_id,
  n.parent_tax_id
  FROM nodes as n
  INNER JOIN tax_names as t
  ON n.tax_id = t.tax_id
  where parent_tax_id = ?
  AND t.name_class = 'scientific name'`;

  console.log(sql);
  console.log(id);
  pool.query(sql, [id], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });
});

module.exports = router;
