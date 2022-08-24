import * as chai from "chai";
import * as Sinon from "sinon";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";


import { Response } from "superagent";

chai.use(chaiHttp);

import { expect } from "chai";
import { allTeams } from "./mocks/teams.mocks";

describe("Teams", () => {

 describe("Get", () => {
    it("All teams", async () => {
      Sinon.stub(TeamsModel, "findAll").resolves(allTeams);
      
      const response = await chai.request(app).get('/teams') ;

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(allTeams);

      Sinon.restore();
    });
 })

 
class TeamsModel {
  static findAll() {
    throw new Error("Function not implemented.");

  }
}
})
