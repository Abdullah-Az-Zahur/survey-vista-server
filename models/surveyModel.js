import { ObjectId } from "mongodb";
import client from "../config/db.js";
const surveyCollection = client.db("survey1DB").collection("survey");

export const getAllSurveys = async () => {
  return await surveyCollection.find().toArray();
};

export const getSurveyById = async (id) => {
  const query = { _id: new ObjectId(id) };
  return await surveyCollection.findOne(query);
};
