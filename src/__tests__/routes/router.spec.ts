import request from "supertest";
import { app } from "../../server";
import { VaccineScheduleService } from "../../services/VaccineScheduleService";

const vaccineScheduleService = new VaccineScheduleService();

describe("[POST] /users", () => {
    it("should be able to create new vaccine schedule", async () => {
      const response = await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2022-05-20T13:10:00.000Z",
        })
        .expect(201);
  
      expect(response.body).toMatchObject({
        name:"Eduardo",
        born_date:"1997-06-30T14:00:00.000Z",
        vaccination_date:"2022-05-20T13:00:00.000Z",
        "vaccinated": false,
	    "conclusion": null,
      });
    });
})
