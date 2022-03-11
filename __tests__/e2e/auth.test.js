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
const unique_names_generator_1 = require("unique-names-generator");
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = __importDefault(require("../../src/database/redis"));
const request = require("supertest");
const PREFIX_API = "/api/auth";
let randomName;
let randomPwd;
beforeAll(() => {
    randomName = (0, unique_names_generator_1.uniqueNamesGenerator)({
        dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.colors, unique_names_generator_1.animals],
    });
    randomPwd = (0, unique_names_generator_1.uniqueNamesGenerator)({
        dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.colors, unique_names_generator_1.animals],
    });
});
afterAll(() => {
    mongoose_1.default.disconnect();
    redis_1.default.disconnect();
});
describe(`POST ${PREFIX_API}/singup`, () => {
    it("Shoudl create a new user correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const res_signup = yield request(src_1.default)
            .post(`${PREFIX_API}/signup`)
            .set("Content-Type", "application/json")
            .send({ username: randomName, password: randomPwd });
        expect(res_signup.status).toEqual(200);
        expect(res_signup.body._id).toBeDefined();
    }));
    it("Shoudl try create a new user with bad request", () => __awaiter(void 0, void 0, void 0, function* () {
        return request(src_1.default)
            .post(`${PREFIX_API}/signup`)
            .set("Content-Type", "application/json")
            .send({})
            .expect(400);
    }));
});
describe(`POST ${PREFIX_API}/login`, () => {
    it("Shoudl be authenticate user correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const res_login = yield request(src_1.default)
            .post(`${PREFIX_API}/login`)
            .set("Content-Type", "application/json")
            .send({ username: randomName, password: randomPwd });
        expect(res_login.status).toEqual(200);
        expect(res_login.body.access_token).toBeDefined();
    }));
});
