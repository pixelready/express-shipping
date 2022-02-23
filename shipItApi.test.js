"use strict";
const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const {
  shipProduct,
} = require("./shipItApi");


test("shipProduct", async function () {
  axiosMock.onPost("http://localhost:3001/ship").reply(200, {receipt: {
    itemId: 5000,
    name: 'Edwin',
    addr: '100 Test St',
    zip: '95656',
    shipId: 9444
  }});

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(9444);

  // const shipId = await shipProduct({
  //   productId: 1000,
  //   name: "Test Tester",
  //   addr: "100 Test St",
  //   zip: "12345-6789",
  // });

  // expect(shipId).toEqual(expect.any(Number));
});
