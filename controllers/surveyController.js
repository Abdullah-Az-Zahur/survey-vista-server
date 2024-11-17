import { getAllSurveys, getSurveyById } from "../models/surveyModel.js";

export const getAllSurveysController = async (req, res) => {
  try {
    const surveys = await getAllSurveys();
    res.send(surveys);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error fetching surveys", error });
  }
};

export const getSurveyByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const survey = await getSurveyById(id);

    if (!survey) {
      return res.status(404).send({ message: "Survey not found" });
    }
    res.send(survey);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching survey", error });
  }
};
