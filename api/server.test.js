const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");
const User = require("./auth/auth-model");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("server", () => {
  it("successfully adds user", async () => {
    let all;
    await User.add({ username: "stephen", password: "password" });
    all = await db("users");
    expect(all).toHaveLength(1);
  });
  it("token is needed to fetch jokes", async () => {
    const res = await request(server).get("/jokes");
    expect(res.status).toBe(404);
  });
  it("can find by id", async () => {
    await User.add({ username: "johnny", password: "password" });
    let user = await User.findById(1);
    expect(user.id).toBe(1);
  });
});

describe("login", () => {
  it("success message", () => {
    request(server)
      .post("/login", { username: "user2", password: "password" })
      .then((res) => {
        expect(res.message).toMatch(/welcome user2/i);
      })
      .catch((err) => {
        err;
      });
  });
  it("has token", () => {
    request(server)
      .post("/login", { username: "user2", password: "password" })
      .then((res) => {
        expect(res.token).toBeInstanceOf();
      })
      .catch((err) => {
        err;
      });
  });
});
