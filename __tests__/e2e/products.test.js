"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../../src"));
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = __importDefault(require("../../src/database/redis"));
const unique_names_generator_1 = require("unique-names-generator");
const request = require("supertest");
const PREFIX_API = "/api/products";
const AUTH_PREFIX_API = "/api/auth";
let authorization;
let randomName;
let randomPwd;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    randomName = (0, unique_names_generator_1.uniqueNamesGenerator)({
        dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.colors, unique_names_generator_1.animals],
    });
    randomPwd = (0, unique_names_generator_1.uniqueNamesGenerator)({
        dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.colors, unique_names_generator_1.animals],
    });
    yield request(src_1.default)
        .post(`${AUTH_PREFIX_API}/signup`)
        .set("Content-Type", "application/json")
        .send({ username: randomName, password: randomPwd });
    const res_login = yield request(src_1.default)
        .post(`${AUTH_PREFIX_API}/login`)
        .set("Content-Type", "application/json")
        .send({ username: randomName, password: randomPwd });
    authorization = `Bearer ${res_login.body.access_token}`;
}));
afterAll(() => {
    mongoose_1.default.disconnect();
    redis_1.default.disconnect();
});
describe(`GET ${PREFIX_API}`, () => {
    it("Should get 401 status code", () => {
        return request(src_1.default).get(PREFIX_API).expect(401);
    });
    it("Should get products correctly", () => {
        return request(src_1.default)
            .get(PREFIX_API)
            .set("Authorization", authorization)
            .expect(200);
    });
});
describe(`POST & GET by id ${PREFIX_API} - ${PREFIX_API}/{id}`, () => {
    it("Should try create a product bad get 400 status code", () => {
        return request(src_1.default)
            .post(PREFIX_API)
            .set("Authorization", authorization)
            .expect(400);
    });
    it("Should try create a product bad get 401 status code", () => {
        return request(src_1.default).post(PREFIX_API).expect(401);
    });
    it("Should create a product correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const res_create = yield request(src_1.default)
            .post(PREFIX_API)
            .set("Authorization", authorization)
            .send({
            name: randomName,
            price: 1000,
            imageUrl: "http://example.com",
        });
        expect(res_create.status).toBe(200);
        expect(res_create.body._id).toBeDefined();
        const res_get = yield request(src_1.default)
            .get(`${PREFIX_API}/${res_create.body._id}`)
            .set("Authorization", authorization);
        expect(res_get.status).toBe(200);
        expect(res_get.body._id).toBeDefined();
        return request(src_1.default).get(`${PREFIX_API}/${res_create.body._id}`).expect(401);
    }));
});
describe(`PUT ${PREFIX_API}`, () => {
    it("Should try update a product bad get 400 status code", () => {
        return request(src_1.default)
            .put(PREFIX_API)
            .set("Authorization", authorization)
            .expect(400);
    });
    it("Should try update a product bad get 401 status code", () => {
        return request(src_1.default).put(PREFIX_API).expect(401);
    });
    it("Should update a product correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const res_create = yield request(src_1.default)
            .post(PREFIX_API)
            .set("Authorization", authorization)
            .send({
            name: randomName,
            price: 1000,
            imageUrl: "http://example.com",
        });
        expect(res_create.status).toBe(200);
        expect(res_create.body._id).toBeDefined();
        const newName = res_create.body.name + " Update";
        const res_update = yield request(src_1.default)
            .put(PREFIX_API)
            .send(Object.assign(Object.assign({}, res_create.body), { name: newName }))
            .set("Authorization", authorization);
        expect(res_update.status).toBe(200);
        expect(res_update.body._id).toBeDefined();
        expect(res_update.body.name).toEqual(newName);
    }));
});
describe(`DELETE ${PREFIX_API}/{id}`, () => {
    it("Should update a product correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const res_create = yield request(src_1.default)
            .post(PREFIX_API)
            .set("Authorization", authorization)
            .send({
            name: randomName,
            price: 1000,
            imageUrl: "http://example.com",
        });
        expect(res_create.status).toBe(200);
        expect(res_create.body._id).toBeDefined();
        const res_remove = yield request(src_1.default)
            .delete(`${PREFIX_API}/${res_create.body._id}`)
            .set("Authorization", authorization);
        expect(res_remove.status).toBe(200);
        const res_remove_401 = yield request(src_1.default).delete(`${PREFIX_API}/${res_create.body._id}`);
        expect(res_remove_401.status).toBe(401);
    }));
});
