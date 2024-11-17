import { getAllSurveys } from "../models/surveyModel.js";

export const getAllSurveysController = async (req, res) => {
  try {
    const surveys = await getAllSurveys();
    res.send(surveys);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error fetching surveys", error });
  }
};
