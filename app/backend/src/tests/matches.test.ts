import * as chai from "chai";
import * as Sinon from "sinon";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import MatchesModel from "../database/models/matches.model"


import { Response } from "superagent";

chai.use(chaiHttp);

import { expect } from "chai";
import { allMatches, allMatchesEager } from "./mocks/matches.mocks";


describe("Matches", () => {

 describe("Get", () => {
     
    afterEach(() =>  Sinon.restore());
    it("All matches", async () => {
      Sinon.stub(MatchesModel, "findAll").resolves(allMatchesEager as unknown as MatchesModel[])
      
      const response = await chai.request(app).get('/matches') ;

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(allMatchesEager);

    });
 })
})