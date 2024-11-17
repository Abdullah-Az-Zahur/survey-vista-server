import client from "../config/db.js";
const surveyResultCollection = client
  .db("survey1DB")
  .collection("surveyResult");
