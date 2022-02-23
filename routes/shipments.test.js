"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  /** Test for valid inputs */
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  /** Test for invalid productID */
  test("invalidProductId", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: "HELLO IM NOT NUMBER",
      name: "Edwin",
      addr: "100 Test St",
      zip: "94547",
    });

    expect(resp.body.error.status).toEqual(400);
    expect(resp.body.error.message[0]).toEqual("instance.productId is not of a type(s) integer");
  })

  /** Test for invalid name */
  test("invalidName", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 5000,
      name: 2000,
      addr: "100 Test St",
      zip: "94547",
    });

    expect(resp.body.error.status).toEqual(400);
    expect(resp.body.error.message[0]).toEqual("instance.name is not of a type(s) string");
  })

  /** Test for invalid address type */
  test("invalidAddrType", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 5000,
      name: "Edwin",
      addr: 23,
      zip: "94547",
    });

    expect(resp.body.error.status).toEqual(400);
    expect(resp.body.error.message[0]).toEqual("instance.addr is not of a type(s) string");
  })

  /** Test for invalid address format */
  test("invalidAddrFormat", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 5000,
      name: "Edwin",
      addr: "123 % Main Street",
      zip: "94547",
    });

    expect(resp.body.error.status).toEqual(400);
    expect(resp.body.error.message[0]).toEqual('instance.addr does not match pattern \"^\\\\d+\\\\s+\\\\w+\\\\s+\\\\w+\"');
  })

  /** Test for invalid zip */
  test("invalidZip", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 5000,
      name: "Edwin",
      addr: "23 Main Street",
      zip: 94547,
    });

    expect(resp.body.error.status).toEqual(400);
    expect(resp.body.error.message[0]).toEqual("instance.zip is not of a type(s) string");
  })

});
