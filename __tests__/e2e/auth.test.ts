// import app from "../../src";
// import {
//   uniqueNamesGenerator,
//   adjectives,
//   colors,
//   animals,
// } from "unique-names-generator";
// import mongoose from 'mongoose'
// import redisClient from "../../src/database/redis";

// const request = require("supertest");
// const PREFIX_API = "/api/auth";

// let randomName: string;
// let randomPwd: string;

// beforeAll( () => {
//   randomName = uniqueNamesGenerator({
//     dictionaries: [adjectives, colors, animals],
//   });
//   randomPwd = uniqueNamesGenerator({
//     dictionaries: [adjectives, colors, animals],
//   });
// });


// afterAll(() => {
//   mongoose.disconnect()
//   redisClient.disconnect()
// });


// describe(`POST ${PREFIX_API}/singup`, () => {
//   it("Shoudl create a new user correctly", async () => {
//     const res_signup = await request(app)
//       .post(`${PREFIX_API}/signup`)
//       .set("Content-Type", "application/json")
//       .send({ username: randomName, password: randomPwd });
//     expect(res_signup.status).toEqual(200);
//     expect(res_signup.body._id).toBeDefined();
//   });

//   it("Shoudl try create a new user with bad request", async () => {
//     return request(app)
//       .post(`${PREFIX_API}/signup`)
//       .set("Content-Type", "application/json")
//       .send({})
//       .expect(400);
//   });
// });

// describe(`POST ${PREFIX_API}/login`, () => {
//   it("Shoudl be authenticate user correctly", async () => {
//     const res_login = await request(app)
//       .post(`${PREFIX_API}/login`)
//       .set("Content-Type", "application/json")
//       .send({ username: randomName, password: randomPwd });
//     expect(res_login.status).toEqual(200);
//     expect(res_login.body.access_token).toBeDefined();
//   });
// });
