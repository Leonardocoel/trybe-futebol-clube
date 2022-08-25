import * as chai from "chai";
import * as Sinon from "sinon";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import TeamsModel from "../database/models/teams.model"

import { Response } from "superagent";

chai.use(chaiHttp);

import { expect } from "chai";
import { allTeams, team } from "./mocks/teams.mocks";

describe("Teams", () => {

 describe("Get", () => {
     
    afterEach(() =>  Sinon.restore());

    it("Request all teams, return status 200 and a array of teams.", async () => {
      Sinon.stub(TeamsModel, "findAll").resolves(allTeams as TeamsModel[])
      
      const response = await chai.request(app).get('/teams') ;

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(allTeams);

    });

    it('Request team by id, return status 200 and the correct team.', async () => {
      Sinon.stub(TeamsModel, "findOne").resolves(allTeams[1] as TeamsModel)

      const response = await chai.request(app).get('/teams/:id').send({id: 2});

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(team)
    })
 })
})
