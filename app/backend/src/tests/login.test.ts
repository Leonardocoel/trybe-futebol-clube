import * as chai from "chai";
import * as Sinon from "sinon";
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from "../app";
import UserModel from "../database/models/user.model";
import jwtService from "../services/jwt.service"
import { token, validUser } from "./mocks/mocks";

chai.use(chaiHttp);

import { expect } from "chai";

describe("Login", () => {
  describe("Correct credentials", () => {
    afterEach(() => (UserModel.findOne as Sinon.SinonStub).restore());

    it("When the credentials are correct, it should return status 200 and the token.", async () => {
      Sinon.stub(UserModel, "findOne").resolves(validUser as UserModel);
      Sinon.stub(jwtService, "sign").returns(token);

      const response = await chai.request(app).post('/login')

      expect(response).to.have.status(200);
      expect(response.body.token).to.be.equal('any-token')

    });
  });
  describe("Wrong credentials", () => {
    it("");
  });
});

