import * as chai from "chai";
import * as Sinon from "sinon";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import MatchesModel from "../database/models/matches.model";
import TokenMiddleware from "../middlewares/token.middleware"

import { Response } from "superagent";

chai.use(chaiHttp);

import { assert, expect } from "chai";
import {
  newMatch,
  newMatchReturn,
} from "./mocks/matches.mocks";
import JwtService from "../services/jwt.service";
import { token } from "./mocks/users.mocks";


describe("Matches", () => {
  describe("Put", () => {
    afterEach(() => Sinon.restore());

    it("When a match is sent correctly, it returns status 201 and the complete data.", async () => {
      Sinon.stub(MatchesModel, "create").withArgs(newMatch).resolves(newMatchReturn as MatchesModel)
      Sinon.stub(TokenMiddleware.prototype, "validation")

      const response = await chai.request(app).put('/matches').send(newMatch)

      expect(response.status).to.be.equal(201)
      expect(response.body).to.be.equal(newMatchReturn)
    })

    // it("", async () => {
    // })
  });
});