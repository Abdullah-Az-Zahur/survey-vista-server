import { ObjectId } from "mongodb";
import { connectDB } from "../config/db";

let collections = null;

(async () => {
  collections = await connectDB();
})();

export async function getAllSurveys(query) {
  return await collections.surveyCollection.find(query).toArray();
}

export async function getSurveyById(id) {
  return await collections.surveyCollection.findOne({
    _id: new ObjectId(id),
  });
}

export async function saveSurvey(surveyData) {
  return await collections.surveyCollection.insertOne(surveyData);
}

export async function updateSurvey(id, surveyData) {
  return await collections.surveyCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: surveyData }
  );
}

export async function deleteSurveyById(id) {
  return await collections.surveyCollection.deleteOne({
    _id: new ObjectId(id),
  });
}
