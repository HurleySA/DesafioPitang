import { randomUUID } from "crypto";
import request from "supertest";
import { prismaClient } from "../../database/prismaClient";
import { app } from "../../server";


beforeEach(async () => {
  await prismaClient.vaccineSchedule.deleteMany({});
});
describe("[POST] /vaccineSchedules", () => {
    it("should be able to create new vaccine schedule", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(201);
    });

    it("should not be able to create new vaccine schedule when born date is on the future", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"2029-05-20T13:10:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(400);
    });

    it("should not be able to create new vaccine schedule when vaccination date is on the past", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"1997-06-30T14:00:00.000Z",
        })
        .expect(400);
    });

    it("should not be able to create new vaccine schedule when name lenght is less than 5 characteres", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Edua",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(400);
    });

    it("should not be able to create new vaccine schedule when born date input is not a IsoString", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"NãoéIsoString",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(400);
    });

    it("should not be able to create new vaccine schedule when vaccinate date input is not a IsoString", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"NãoéIsoString",
        })
        .expect(400);
    });

    it("should not be able to create new vaccine schedule without name", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(400);
    });

    it("should not be able to create new vaccine schedule without born date", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(400);
    });
    it("should not be able to create new vaccine schedule without vacination date", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(400);
    });

    it("should be able to create 2 new vaccine schedule in the same hour ", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(201);

        await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(201);
    });

    it("should not be able to create 3 new vaccine schedule in the same hour ", async () => {
      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(201);

        await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(201);

        await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:"2029-05-20T13:10:00.000Z",
        })
        .expect(403);
    });

    it("should be able to create 20 new vaccine schedule in the same day ", async () => {
      for (let i = 0; i < 20; i++){
        const hour = i >= 10 ? i : `0${i}`;
        await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:`2029-05-20T${hour}:10:00.000Z`,
        })
        .expect(201);
      }

      const response = await request(app)
      .get("/api/vaccineSchedule")
      .expect(200);

      expect(response.body.length).toBe(20);
      
    });

    it("should not be able to create 21 new vaccine schedule in the same day ", async () => {
      for (let i = 0; i < 20; i++){
        const hour = i >= 10 ? i : `0${i}`;
        await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:`2029-05-20T${hour}:10:00.000Z`,
        })
        .expect(201);
      }

      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:`2029-05-20T23:10:00.000Z`,
        })
        .expect(403);

      const response = await request(app)
      .get("/api/vaccineSchedule")
      .expect(200);

      expect(response.body.length).toBe(20);
      
    });

    it("should be able to create a new vaccine schedule when some day already have 20 schedules ", async () => {
      for (let i = 0; i < 20; i++){
        const hour = i >= 10 ? i : `0${i}`;
        await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:`2029-05-20T${hour}:10:00.000Z`,
        })
        .expect(201);
      }

      await request(app)
        .post("/api/vaccineSchedule")
        .send({
            name:"Eduardo",
            born_date:"1997-06-30T14:00:00.000Z",
            vaccination_date:`2029-05-25T00:10:00.000Z`,
        })
        .expect(201);

      const response = await request(app)
      .get("/api/vaccineSchedule")
      .expect(200);
      expect(response.body.length).toBe(21);
      
    });

})





describe("[GET] /vaccineSchedules", () => {
  it("should be initialize with no data", async () => {
    const response = await request(app)
      .get("/api/vaccineSchedule")
      .expect(200);

      expect(response.body.length).toBe(0);
  });

  it("should be able contains a schedule after being created", async () => {
    await request(app)
      .post("/api/vaccineSchedule")
      .send({
          name:"Eduardo",
          born_date:"1997-06-30T14:00:00.000Z",
          vaccination_date:"2029-05-20T13:10:00.000Z",
      })
      .expect(201);

      const response = await request(app)
      .get("/api/vaccineSchedule")
      .expect(200);
      
      expect(response.body.length).toBe(1);
      
  });

  it("should sort the schedules list by vaccination date", async () => {
    await request(app)
      .post("/api/vaccineSchedule")
      .send({
          name:"Eduardo",
          born_date:"1997-06-30T14:00:00.000Z",
          vaccination_date:"2029-05-20T15:10:00.000Z",
      })
      .expect(201);

    await request(app)
      .post("/api/vaccineSchedule")
      .send({
          name:"Eduardo",
          born_date:"1997-06-30T14:00:00.000Z",
          vaccination_date:"2029-05-20T13:10:00.000Z",
      })
      .expect(201);

      const response = await request(app)
      .get("/api/vaccineSchedule")
      .expect(200);

      expect(response.body[0]).toMatchObject({
        name: 'Eduardo',
        born_date: '1997-06-30T14:00:00.000Z',
        vaccination_date: '2029-05-20T13:00:00.000Z',
        vaccinated: false,
        conclusion: null,
      })
      
  });
  
})


describe("[DELETE] /vaccineSchedules", () => {
  it("should not be able to delete non exist schedule", async () => {
    const randomUuid = randomUUID();
    await request(app)
      .get(`/api/vaccineSchedule/${randomUuid}`)
      .expect(404);
  });
  it("should be able to delete a existing schedule", async () => {
    const response = await request(app)
      .post("/api/vaccineSchedule")
      .send({
          name:"Eduardo",
          born_date:"1997-06-30T14:00:00.000Z",
          vaccination_date:"2029-05-20T15:10:00.000Z",
      })
      .expect(201);

    await request(app)
      .get(`/api/vaccineSchedule/${response.body.id}`)
      .expect(404);
  });

})


