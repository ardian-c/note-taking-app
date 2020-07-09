import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema";

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/note_app_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const PORT = 4300;

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Note API v1",
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
