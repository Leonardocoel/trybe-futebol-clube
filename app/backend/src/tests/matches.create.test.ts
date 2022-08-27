import * as chai from "chai";
import * as Sinon from "sinon";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import MatchesModel from "../database/models/matches.model";
import TeamModel from "../database/models/teams.model";

import { Response } from "superagent";

chai.use(chaiHttp);

import {  expect } from "chai";
import { newMatch, newMatchReturn, newMatchSameTeams, newMatchWrongTeams, newScore } from "./mocks/matches.mocks";
import JwtService from "../services/jwt.service";
import { token, validUserDTO } from "./mocks/users.mocks";
import { team } from "./mocks/teams.mocks";


describe("Matches", () => {
  describe("Update", () => {
    describe("If Valid", () => {
      beforeEach(() => Sinon.stub(JwtService, "verify").returns(validUserDTO));
      afterEach(() => Sinon.restore());

      it("When a match is sent, returns status 201 and the complete data.", async () => {
        Sinon.stub(MatchesModel, "create")
          .withArgs(newMatch)
          .resolves(newMatchReturn as MatchesModel);

        const response = await chai
          .request(app)
          .post("/matches")
          .set("Authorization", token)
          .send(newMatch);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.eql(newMatchReturn);
      });

      it("When a match is set as finished, returns status 200 and the message Finished.", async () => {
        const stub = Sinon.stub(MatchesModel, "update");

        const response = await chai
          .request(app)
          .patch("/matches/48/finish")
          .set("Authorization", token);

        expect(stub.calledWith({ inProgress: false }, { where: { id: "48" } })).to.be.true;
        expect(response.status).to.be.equal(200);
        expect(response.body.message).to.be.equal("Finished");
      });

      it("It is possible to update the score of matches in progress, returns status 200 ", async () => {
        const stub = Sinon.stub(MatchesModel, "update")

        const response = await chai
        .request(app)
        .patch("/matches/48")
        .set("Authorization", token)
        .send(newScore)

        expect(stub.calledWith(newScore, { where: { id: "48" } })).to.be.true;
        expect(response.status).to.be.equal(200);
      })
    });

    describe("If Invalid", () => {
      beforeEach(() => Sinon.stub(JwtService, "verify").returns(validUserDTO));
      afterEach(() => Sinon.restore());

      it("When the teams are the same, returns status 401 and the message 'It is not possible to create a match with two equal teams' ", async () => {
        const stub = Sinon.stub(MatchesModel, "create").resolves(newMatchReturn as MatchesModel);

        const response = await chai
          .request(app)
          .post('/matches')
          .set("Authorization", token)
          .send(newMatchSameTeams);

          expect(stub.notCalled).to.be.true
          expect(response.status).to.be.equal(401)
          expect(response.body.message).to.be.equal('It is not possible to create a match with two equal teams')
      });

      it("When one of the teams does not exist , returns status 404 and the message 'There is no team with such id!' ", async () => {
        const a = Sinon.stub(TeamModel, "findByPk")
        .withArgs(16).resolves(team as TeamModel);

        const stub = Sinon.stub(MatchesModel, "create").resolves(newMatchReturn as MatchesModel);

        const response = await chai
          .request(app)
          .post("/matches")
          .set("Authorization", token)
          .send(newMatchWrongTeams);

        expect(stub.notCalled).to.be.true;

        expect(response.status).to.be.equal(404);
        expect(response.body.message).to.be.equal("There is no team with such id!");
     });
   
    });
   
  });
});
