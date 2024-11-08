import { ObjectId } from "mongodb";
import { connectDB } from "../config/db.js";

let collections = null;

(async () => {
  collections = await connectDB();
})();

export const getAllSurveys = async (query) => {
  return await collections.surveyCollection.find(query).toArray();
};

export const getSurveyById = async (id) => {
  return await collections.surveyCollection.findOne({
    _id: new ObjectId(id),
  });
};

export const saveSurvey = async (surveyData) => {
  return await collections.surveyCollection.insertOne(surveyData);
};

export async function updateSurvey(id, surveyData) {
  return await collections.surveyCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: surveyData }
  );
}

export const deleteSurveyById = async (id) => {
  return await collections.surveyCollection.deleteOne({
    _id: new ObjectId(id),
  });
};
