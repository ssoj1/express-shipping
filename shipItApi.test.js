"use strict";
const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const { shipProduct, SHIPIT_SHIP_URL } = require("./shipItApi");

test("shipProduct", async function () {
  axiosMock.onPost(SHIPIT_SHIP_URL).reply(200, {
    receipt: {
      itemId: 1001,
      name: "Benson",
      addr: "1000002",
      zip: "123456",
      shipId: 1000,
    },
  });

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(1000);
});

//  const resp = await axios({
//   method: "POST",
//   url: SHIPIT_SHIP_URL,
//   data: {
//     itemId: productId,
//     name: name,
//     addr: addr,
//     zip: zip,
//     key: SHIPIT_API_KEY,
//   },
// });
