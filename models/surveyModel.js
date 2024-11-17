import client from "../config/db.js";
const surveyCollection = client.db("survey1DB").collection("survey");

export const getAllSurveys = async () => {
  return await surveyCollection.find().toArray();
};
