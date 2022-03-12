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
const API_RESOURCE = "/product";
const AUTH_RESOURCE = "/auth";
const AUTH_URL = `${API_URL}${API_VERSION}${AUTH_RESOURCE}`;
const RESOURCE_URL = `${API_URL}${API_VERSION}${API_RESOURCE}`;

let generateName: string;
let generatePassword: string;
let authToken: string;
beforeAll(async () => {
    generateName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    style: 'capital'
  });
  generatePassword = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    style: 'capital'
  });
  await request(app)
    .post(`${AUTH_URL}/signup`)
    .set("Content-Type", "application/json")
    .send({
        username: generateName,
        password: generatePassword
    });
    const response = await request(app)
        .post(`${AUTH_URL}/login`)
        .set("Content-Type", "application/json")
        .send({
            username: generateName,
            password: generatePassword
        });
    authToken = `Bearer ${response.body.data.access_token}`;
});


afterAll(async () => {
  await mongoose.disconnect()
  await redisClient.disconnect();
});

describe(`Product resource ${RESOURCE_URL}`, () => {

    describe(`Create ${RESOURCE_URL}`, () => {
        it("Should return 201 on successful creation", async () => {
            try {
                const newName = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                    style: 'capital'
                  });
                const response = await request(app)
                .post(`${RESOURCE_URL}/create`)
                .set("Authorization", authToken)
                .send({
                    name: newName,
                    price: 100,
                    description:"Test Product Description",
                });
                expect(response.status).toBe(201);
            } catch (error) {
                console.log(error);
                expect(error).toBeNull();
            }
        });
        it("Shoyld return  400 on partial data", async () => {
            try {
                const response = await request(app)
                .post(`${RESOURCE_URL}/create`)
                .set("Authorization", authToken)
                .send({
                    name: "Test Product",
                });
                expect(response.status).toBe(400);
            } catch (error) {
                console.log(error);
                expect(error).toBeNull();
            }
        });
    });
    describe(`Update ${RESOURCE_URL}`, () => {
        it("Should return 200 on successful update", async () => {
            try {
                const newName = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                    style: 'capital'
                  });
                const created = await request(app)
                .post(`${RESOURCE_URL}/create`)
                .set("Authorization", authToken)
                .send({
                    name: newName,
                    price: 100,
                    description:"Test Product Description",
                });
                const updateName = `${newName}_updated`;
                const reponse = await request(app)
                    .put(`${RESOURCE_URL}/${created.body.data._id}`)
                    .set("Authorization", authToken)
                    .send({
                        name: updateName,
                        price: 100,
                        description:"Test Product Description",
                    });
                    expect(reponse.status).toBe(200);
                    expect(reponse.body.data._id).toBeDefined();
                    expect(reponse.body.data.name).toEqual(updateName);
            } catch (error) {
                console.log(error);
                expect(error).toBeNull();
            }
        });
        it("Should return 404 on not found", async () => {
            try {
                const newName = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                    style: 'capital'
                  });
                const created = await request(app)
                .post(`${RESOURCE_URL}/create`)
                .set("Authorization", authToken)
                .send({
                    name: newName,
                    price: 100,
                    description:"Test Product Description",
                });
                const deleteResponse = await request(app)
                    .delete(`${RESOURCE_URL}/${created.body.data._id}`)
                    .set("Authorization", authToken);
                const updateName = `${newName}_updated`;
                const reponse = await request(app)
                    .put(`${RESOURCE_URL}/${created.body.data._id}`)
                    .set("Authorization", authToken)
                    .send({
                        name: updateName,
                        price: 100,
                        description:"Test Product Description",
                    });
                        
                expect(reponse.status).toBe(404);
            } catch (error) {
                console.log(error);
                expect(error).toBeNull();
            }
        });
    });

    describe(`Get ${RESOURCE_URL}`, () => {
        it("Should return 200 on successful get", async () => {
            try {
                const newName = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                    style: 'capital'
                  });
                const created = await request(app)
                .post(`${RESOURCE_URL}/create`)
                .set("Authorization", authToken)
                .send({
                    name: newName,
                    price: 100,
                    description:"Test Product Description",
                });
                const response = await request(app)
                    .get(`${RESOURCE_URL}/${created.body.data._id}`)
                    .set("Authorization", authToken);
                expect(response.status).toBe(200);
                expect(response.body.data._id).toBeDefined();
                expect(response.body.data.name).toEqual(newName);
            } catch (error) {
                console.log(error);
                expect(error).toBeNull();
            }
        });
        it("Should return 404 on not found", async () => {
            try {
                const response = await request(app)
                .get(`${RESOURCE_URL}/5e9e9d0d7e8f8b1e8c6d9e9a`)
                .set("Authorization", authToken);
                expect(response.status).toBe(404);
            } catch (error) {
                console.log(error);
                expect(error).toBeNull();
            }
        });
    });

    describe(`Delete ${RESOURCE_URL}`, () => {
        it("Should return 200 on successful delete", async () => {
            try {
                const newName = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                    style: 'capital'
                  });
                const created = await request(app)
                .post(`${RESOURCE_URL}/create`)
                .set("Authorization", authToken)
                .send({
                    name: newName,
                    price: 100,
                    description:"Test Product Description",
                });
                const response = await request(app)
                    .delete(`${RESOURCE_URL}/${created.body.data._id}`)
                    .set("Authorization", authToken);
                expect(response.status).toBe(200);
            } catch (error) {
                console.log(error);
                expect(error).toBeNull();
            }
        });
        it("Should return 404 on not found", async () => {
            try {
                const response = await request(app)
                .delete(`${RESOURCE_URL}/5e9e9d0d7e8f8b1e8c6d9e9a`)
                .set("Authorization", authToken);
                expect(response.status).toBe(404);
            } catch (error) {
                console.log(error);
                expect(error).toBeNull();
            }
        });
    });

    describe(`Get all ${RESOURCE_URL}`, () => {
        it("Should return 200 on successful get", async () => {
            try {
                const newName = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                    style: 'capital'
                  });
                const created = await request(app)
                .post(`${RESOURCE_URL}/create`)
                .set("Authorization", authToken)
                .send({
                    name: newName,
                    price: 100,
                    description:"Test Product Description",
                });
                const response = await request(app)
                    .get(`${RESOURCE_URL}/list`)
                    .set("Authorization", authToken);
                expect(response.status).toBe(200);
                expect(response.body.data.length).toBeGreaterThan(0);
            } catch (error) {
                console.log(error);
                expect(error).toBeNull();
            }
        });
    });
});