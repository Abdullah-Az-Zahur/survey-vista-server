import { getAllSurveys, getSurveyById } from "../models/surveyModel";

export const getAllSurveysController = async (req, res) => {
  const surveys = await getAllSurveys(req.query);
  res.send(surveys);
};

export const getSurveyByIdController = async (req, res) => {
  const survey = await getSurveyById(req.params.id);
  res.send(survey);
};
