import * as chai from "chai";
import * as Sinon from "sinon";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import MatchesModel from "../database/models/matches.model";

import { Response } from "superagent";

chai.use(chaiHttp);

import { assert, expect } from "chai";
import {
  allMatches,
  allMatchesFinished,
  allMatchesInProgress,
  argMock,
} from "./mocks/matches.mocks";
import { where } from "sequelize/types";

describe("Matches", () => {
  describe("Get", () => {
    afterEach(() => Sinon.restore());

    it("Request all matches, return status 200 and all matches.", async () => {
      Sinon.stub(MatchesModel, "findAll")
        .withArgs(argMock)
        .resolves(allMatches as unknown as MatchesModel[]);

      const response = await chai.request(app).get("/matches");

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(allMatches);
    });

    it("If in progress is true,return status 200 and all in progress matches.", async () => {
      argMock.where = { inProgress: true };

      Sinon.stub(MatchesModel, "findAll")
        .withArgs(argMock)
        .resolves(allMatchesInProgress as unknown as MatchesModel[]);

      const response = await chai
        .request(app)
        .get("/matches")
        .query({ inProgress: true });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(allMatchesInProgress);
    });

    it("If in progress is false,return status 200 and all finished matches.", async () => {
      argMock.where = { inProgress: false };

      Sinon.stub(MatchesModel, "findAll")
        .withArgs(argMock)
        .resolves(allMatchesFinished as unknown as MatchesModel[]);

      const response = await chai
        .request(app)
        .get("/matches")
        .query({ inProgress: false });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(allMatchesFinished);
    });
  });
});
