// import app from "../../src";
// import mongoose from "mongoose";
// import redisClient from "../../src/database/redis";
// import {
//   uniqueNamesGenerator,
//   adjectives,
//   colors,
//   animals,
// } from "unique-names-generator";

// const request = require("supertest");
// const PREFIX_API = "/api/products";
// const AUTH_PREFIX_API = "/api/auth";

// let authorization: string;
// let randomName: string;
// let randomPwd: string;

// beforeAll(async () => {
//   randomName = uniqueNamesGenerator({
//     dictionaries: [adjectives, colors, animals],
//   });
//   randomPwd = uniqueNamesGenerator({
//     dictionaries: [adjectives, colors, animals],
//   });

//   await request(app)
//     .post(`${AUTH_PREFIX_API}/signup`)
//     .set("Content-Type", "application/json")
//     .send({ username: randomName, password: randomPwd });

//   const res_login = await request(app)
//     .post(`${AUTH_PREFIX_API}/login`)
//     .set("Content-Type", "application/json")
//     .send({ username: randomName, password: randomPwd });

//   authorization = `Bearer ${res_login.body.access_token}`;
// });

// afterAll(() => {
//   mongoose.disconnect();
//   redisClient.disconnect();
// });

// describe(`GET ${PREFIX_API}`, () => {
//   it("Should get 401 status code", () => {
//     return request(app).get(PREFIX_API).expect(401);
//   });

//   it("Should get products correctly", () => {
//     return request(app)
//       .get(PREFIX_API)
//       .set("Authorization", authorization)
//       .expect(200);
//   });
// });

// describe(`POST & GET by id ${PREFIX_API} - ${PREFIX_API}/{id}`, () => {
//   it("Should try create a product bad get 400 status code", () => {
//     return request(app)
//       .post(PREFIX_API)
//       .set("Authorization", authorization)
//       .expect(400);
//   });

//   it("Should try create a product bad get 401 status code", () => {
//     return request(app).post(PREFIX_API).expect(401);
//   });

//   it("Should create a product correctly", async () => {
//     const res_create = await request(app)
//       .post(PREFIX_API)
//       .set("Authorization", authorization)
//       .send({
//         name: randomName,
//         price: 1000,
//         imageUrl: "http://example.com",
//       });
//     expect(res_create.status).toBe(200);
//     expect(res_create.body._id).toBeDefined();

//     const res_get = await request(app)
//       .get(`${PREFIX_API}/${res_create.body._id}`)
//       .set("Authorization", authorization);
//     expect(res_get.status).toBe(200);
//     expect(res_get.body._id).toBeDefined();

//     return request(app).get(`${PREFIX_API}/${res_create.body._id}`).expect(401);
//   });
// });

// describe(`PUT ${PREFIX_API}`, () => {
//   it("Should try update a product bad get 400 status code", () => {
//     return request(app)
//       .put(PREFIX_API)
//       .set("Authorization", authorization)
//       .expect(400);
//   });

//   it("Should try update a product bad get 401 status code", () => {
//     return request(app).put(PREFIX_API).expect(401);
//   });

//   it("Should update a product correctly", async () => {
//     const res_create = await request(app)
//       .post(PREFIX_API)
//       .set("Authorization", authorization)
//       .send({
//         name: randomName,
//         price: 1000,
//         imageUrl: "http://example.com",
//       });
//     expect(res_create.status).toBe(200);
//     expect(res_create.body._id).toBeDefined();

//     const newName = res_create.body.name + " Update";
//     const res_update = await request(app)
//       .put(PREFIX_API)
//       .send({ ...res_create.body, name: newName })
//       .set("Authorization", authorization);
//     expect(res_update.status).toBe(200);
//     expect(res_update.body._id).toBeDefined();
//     expect(res_update.body.name).toEqual(newName);
//   });
// });

// describe(`DELETE ${PREFIX_API}/{id}`, () => {
//   it("Should update a product correctly", async () => {
//     const res_create = await request(app)
//       .post(PREFIX_API)
//       .set("Authorization", authorization)
//       .send({
//         name: randomName,
//         price: 1000,
//         imageUrl: "http://example.com",
//       });
//     expect(res_create.status).toBe(200);
//     expect(res_create.body._id).toBeDefined();

//     const res_remove = await request(app)
//       .delete(`${PREFIX_API}/${res_create.body._id}`)
//       .set("Authorization", authorization);
//     expect(res_remove.status).toBe(200);

//     const res_remove_401 = await request(app).delete(
//       `${PREFIX_API}/${res_create.body._id}`
//     );
//     expect(res_remove_401.status).toBe(401);
//   });
// });
