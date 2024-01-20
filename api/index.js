import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import cors from "cors";
// import { Users } from "./users.js";
import axios from "axios";

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", async(req, res) => { 
  const Users = await axios.get("http://localhost:8800/api/auth/data12");
  console.log("Users",Users.data)
  const { q } = req.query;
  console.log("q", q);
  const keys = ["username", "email"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key]?.toLowerCase().includes(q))
    );
  };
  // console.log(search(data))
  q ? res.json(search(Users.data).slice(0, 10)) : res.json(Users.data.slice(0,10));
});

app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("API working!c1!");
});
