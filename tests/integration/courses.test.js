const request = require("supertest");
const { Course } = require("../../models/courses");
const { User } = require("../../models/user");

let server;

describe("/api/courses", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Course.remove({}); // 会删除掉分类集合中的所有文档
  });
  // 13.5
  describe("GET /", () => {
    it("should return all courses", async () => {
      await Course.collection.insertMany([
        { name: "course1" },
        { name: "course2" },
      ]);
      const res = await request(server).get("/api/courses");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "course1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "course2")).toBeTruthy();
    });
  });
  // 13.6
  describe("GET /:id", () => {
    it("should be return a course if valid id is passed.", async () => {
      const course = new Course({ name: "course1" });
      await course.save();

      const res = await request(server).get("/api/courses/" + course._id);
      expect(res.status).toBe(200);
      // expect(res.body).toMatchObject(course);
      expect(res.body).toHaveProperty("name", course.name);
    });
  });

  // 13.7
  describe("GET /:id", () => {
    it("should be return 404 if invalid id is passed.", async () => {
      const res = await request(server).get("/api/courses/1");
      expect(res.status).toBe(404);
    });
  });

  // 13.9
  describe("POST /", () => {
    it("should return 401 if the client is not logged in", async () => {
      const res = await request(server)
        .post("/api/courses")
        .send({ name: "course1" });
      expect(res.status).toBe(401);
    });

    // 13.10
    it("should return 400 if course is less than 3 characters", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post("/api/courses")
        .set("x-auth-token", token)
        .send({ name: "12" });
      expect(res.status).toBe(400);
    });
    it("should return 400 if course is more than 50 characters", async () => {
      const token = new User().generateAuthToken();

      const name = new Array(52).join("a");
      const res = await request(server)
        .post("/api/courses")
        .set("x-auth-token", token)
        .send({
          name: name,
        });
      expect(res.status).toBe(400);
    });
    // 13.11 Testing the Happy Path
    it("should save the course 400 if it is valid", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post("/api/courses")
        .set("x-auth-token", token)
        .send({
          name: "course1",
        });
      const course = await Course.find({ name: "course1" });
      expect(course).not.toBeNull();
    });

    it("should return the course 400 if it is valid", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post("/api/courses")
        .set("x-auth-token", token)
        .send({
          name: "course1",
        });
      const course = await Course.find({ name: "course1" });
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "course1");
    });
  });
});
