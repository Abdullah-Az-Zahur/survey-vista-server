import { getAllSurveyResults, getSurveyResultByEmail, updateSurveyResult } from "../models/surveyResultModel.js";

export const getAllSurveyResultsController = async (req, res) => {
    try {
      const result = await getAllSurveyResults();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching survey results", error });
    }
  };

  export const updateSurveyResultController = async (req, res) => {
    try {
      const surveyData = req.body;
      const result = await updateSurveyResult(surveyData);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error updating survey result", error });
    }
  };

  export const getSurveyResultByEmailController = async (req, res) => {
    try {
      const email = req.params.email;
      const result = await getSurveyResultByEmail(email);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching survey results", error });
    }
  };