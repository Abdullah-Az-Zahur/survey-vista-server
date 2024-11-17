import client from "../config/db.js";
const surveyResultCollection = client
  .db("survey1DB")
  .collection("surveyResult");

export const getAllSurveyResults = async () => {
  return await surveyResultCollection.find().toArray();
};

export const updateSurveyResult = async (surveyData) => {
  const query = {
    $and: [
      { userEmail: surveyData?.userEmail },
      { surveyId: surveyData?.surveyId },
    ],
  };
  const options = { upsert: true };
  const updateDoc = {
    $set: surveyData,
  };
  const result = await surveyResultCollection.updateOne(
    query,
    updateDoc,
    options
  );

  if (surveyData?.selectedValue === "yes") {
    const filter = { _id: surveyData?.surveyId };
    await surveyCollection.updateOne(filter, { $inc: { yes: 1 } });
  }
  if (surveyData?.selectedValue === "no") {
    const filter = { _id: surveyData?.surveyId };
    await surveyCollection.updateOne(filter, { $inc: { no: 1 } });
  }

  return result;
};

export const getSurveyResultByEmail = async (email) => {
  let query = { userEmail: email };
  const result = await surveyResultCollection.find(query).toArray();
  return result;
};
