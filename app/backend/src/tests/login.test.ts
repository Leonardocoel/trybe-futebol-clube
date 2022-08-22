import * as chai from "chai";
import * as Sinon from "sinon";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import UserModel from "../database/models/user.model";
import jwtService from "../services/jwt.service";
import {
  invalidLogin,
  token,
  validLogin,
  validUser,
  validUserDTO,
} from "./mocks/mocks";

import { Response } from "superagent";

chai.use(chaiHttp);

import { expect } from "chai";

describe("Login", () => {
  let response: Response;

  describe("Correct credentials", () => {
    afterEach(() => Sinon.restore());

    it("When the credentials are correct, it should return status 200 and the token.", async () => {
      Sinon.stub(UserModel, "findOne").resolves(validUser as UserModel);
      Sinon.stub(jwtService, "sign").returns(token);

      const response = await chai.request(app).post("/login").send(validLogin);

      expect(response.status).to.be.equal(200);
      expect(response.body.token).to.be.equal("any-token");
    });
  });
  describe("Wrong credentials", () => {
    it("When the email is missing, it should return status 400 and 'All fields must be filled' message.", async () => {
      const response = await chai
        .request(app)
        .post("/login")
        .send({ password: validLogin.password });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal("All fields must be filled");
    });
    it("When the password is missing, it should return status 400 and 'All fields must be filled' message.", async () => {
      const response = await chai
        .request(app)
        .post("/login")
        .send({ email: validLogin.email });

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal("All fields must be filled");
    });
    it("When the email is incorrect, it should return status 401 and 'Incorrect email or password' message.", async () => {
      const response = await chai
        .request(app)
        .post("/login")
        .send(invalidLogin);

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal("Incorrect email or password");
    });
    it("When the password is incorrect, it should return status 401 and 'Incorrect email or password' message.", async () => {
      const response = await chai
        .request(app)
        .post("/login")
        .send({ email: validLogin.email, password: invalidLogin.password });

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal("Incorrect email or password");
    });
  });
  describe("User role", () => {
    it("after validating the token returns the user role ", async () => {
      Sinon.stub(jwtService, "verify").returns(validUserDTO);

      const response = await chai.request(app).get("/login/validate").set("Authorization", token);

      expect(response.status).to.be.equal(200);
      expect(response.body.role).to.be.equal("user");

      Sinon.restore();
    });
  });
});
