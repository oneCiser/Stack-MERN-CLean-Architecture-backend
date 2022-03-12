import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import mongoose from "mongoose";
import redisClient from "../../src/database/redis/connection";
import app from "../../src";

const request = require("supertest");
const API_URL = "/api";
const API_VERSION = "/v1";
const API_RESOURCE = "/auth";
const RESOURCE_URL = `${API_URL}${API_VERSION}${API_RESOURCE}`;

let generateName: string;
let generatePassword: string;

beforeAll(() => {
    generateName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    style: 'capital'
  });
  generatePassword = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    style: 'capital'
  });
});


afterAll(async () => {
  await mongoose.disconnect()
  await redisClient.disconnect();
});

describe(`Auth resource ${RESOURCE_URL}`, () => {
    describe(`Signup ${RESOURCE_URL}/signup`, () => {
        describe("Satisfactory creation", () => {
            it("Should return 201 on successful creation", async () => {
                try {
                    const response = await request(app)
                    .post(`${RESOURCE_URL}/signup`)
                    .send({
                        username: generateName,
                        password: generatePassword
                    });
                    expect(response.status).toBe(201);
                } catch (error) {
                    console.log(error);
                }

            });
        });
        describe("Unsatisfactory creation", () => {
            it("Should return 409 on existing user", async () => {
                const response = await request(app)
                .post(`${RESOURCE_URL}/signup`)
                .send({
                    username: generateName,
                    password: generatePassword
                });
                expect(response.status).toBe(409);
            });
            it("Should return 400 on only username", async () => {
                const response = await request(app)
                .post(`${RESOURCE_URL}/signup`)
                .send({
                    username: generateName
                });
                expect(response.status).toBe(400);
            });
            it("Should return 400 on only password", async () => {
                const response = await request(app)
                .post(`${RESOURCE_URL}/signup`)
                .send({
                    password: generatePassword
                });
                expect(response.status).toBe(400);
            });
            it("Should return 400 on empty body", async () => {
                const response = await request(app)
                .post(`${RESOURCE_URL}/signup`)
                .send({ });
                expect(response.status).toBe(400);
            });
        });
    });
    describe(`Login ${RESOURCE_URL}/login`, () => {
        describe("Satisfactory login", () => {
            it("Should return 200 on successful login", async () => {
                const response = await request(app)
                .post(`${RESOURCE_URL}/login`)
                .send({
                    username: generateName,
                    password: generatePassword
                });
                expect(response.status).toBe(200);
                expect(response.body.data).toBeDefined();
                expect(response.body.data.access_token).toBeDefined();
            });
        });
        describe("Unsatisfactory login", () => {
            it("Should return 401 on wrong credentials", async () => {
                const response = await request(app)
                .post(`${RESOURCE_URL}/login`)
                .send({
                    username: generateName,
                    password: generatePassword + "wrong"
                });
                expect(response.status).toBe(401);
                expect(response.body.error).toBeDefined();
            });
            it("Should return 400 on partial credentials", async () => {
                const response = await request(app)
                .post(`${RESOURCE_URL}/login`)
                .send({
                    username: generateName
                });
                expect(response.status).toBe(400);
                expect(response.body.error).toBeDefined();
            });
        });
    });
    describe(`Logout ${RESOURCE_URL}/logout`, () => {
        it("Should return 205 on successful logout", async () => {
            const response = await request(app)
            .post(`${RESOURCE_URL}/logout`);
            expect(response.status).toBe(205);
        });
    });
});



