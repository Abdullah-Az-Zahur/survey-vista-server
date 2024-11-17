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

export const updateSurveyById = async (id, updateData) => {
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      title: updateData.title,
      description: updateData.description,
      category: updateData.category,
      deadline: updateData.deadline,
    },
  };
  return await surveyCollection.updateOne(filter, updateDoc);
};

export const getPaginatedSurveys = async (query, options, size, page) => {
  return await surveyCollection
    .find(query, options)
    .skip(page * size)
    .limit(size)
    .toArray();
};

export const getSurveyCount = async (query) => {
  return await surveyCollection.countDocuments(query);
};

export const updateSurveyVote = async (id, updateDoc) => {
  const filter = { _id: new ObjectId(id) };
  return await surveyCollection.updateOne(filter, updateDoc);
};