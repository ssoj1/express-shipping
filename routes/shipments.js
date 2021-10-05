"use strict";

const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");

const { shipProduct } = require("../shipItApi");

const jsonschema = require("jsonschema");
const shipmentsSchema = require("../schema/shipmentsSchema.json");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const { productId, name, addr, zip } = req.body;

  const result = jsonschema.validate(req.body, shipmentsSchema);
  if (!result.valid) {
    let errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;