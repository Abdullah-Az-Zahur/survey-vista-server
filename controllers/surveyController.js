import {
  deleteSurveyById,
  getAllSurveys,
  getSurveyById,
  saveSurvey,
  updateSurvey,
} from "../models/surveyModel.js";

export const getAllSurveysController = async (req, res) => {
  const surveys = await getAllSurveys(req.query);
  res.send(surveys);
};

export const getSurveyByIdController = async (req, res) => {
  const survey = await getSurveyById(req.params.id);
  res.send(survey);
};

export const saveSurveyController = async (req, res) => {
  const result = await saveSurvey(req.body);
  res.send(result);
};

export const updateSurveyController = async (req, red) => {
  const result = await updateSurvey(req.params.id, req.body);
  res.send(result);
};

export const deleteSurveyByIdController = async (req, res) => {
  const result = await deleteSurveyById(req.params.id);
  res.req(result);
};
