"use strict";
// const AxiosMockAdapter = require("axios-mock-adapter");
// const axios = require("axios");
// const axiosMock = new AxiosMockAdapter(axios);
const shipFake = require("../shipItApi");

shipFake.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    shipFake.shipProduct.mockReturnValue(1000);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 1000 });
  });

  xtest("invalid input", async function () {
    const resp = await await request(app).post("/shipments").send({
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
  });
});
