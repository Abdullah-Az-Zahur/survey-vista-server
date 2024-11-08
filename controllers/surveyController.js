import {
  deleteSurveyById,
  getAllSurveys,
  getSurveyById,
  getSurveyCount,
  getSurveys,
  saveSurvey,
  updateSurvey,
} from "../models/surveyModel.js";

export const getSurveysController = async (req, res) => {
  const surveys = await getSurveys(req.query);
  res.send(surveys);
};

export const getAllSurveysController = async (req, res) => {
  try {
    const size = parseInt(req.query.size) || 10; // Default size
    const page = (parseInt(req.query.page) || 1) - 1; // Default page
    const filter = req.query.filter;
    const sort = req.query.sort;
    const search = req.query.search || "";
    

    let query = {
      title: { $regex: search, $options: "i" },
    };
    if (filter) query.category = filter;

    let options = {};
    if (sort) {
      options.sort = { deadline: sort === "asc" ? 1 : -1 };
    }

    const surveys = await getAllSurveys(query, options, page, size);
    res.status(200).send(surveys);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch surveys" });
  }
};

export const getSurveyCountController = async (req, res) => {
  try {
    const filter = req.query.filter;
    const search = req.query.search || "";

    let query = {
      title: { $regex: search, $options: "i" },
    };
    if (filter) query.category = filter;

    const count = await getSurveyCount(query);
    res.status(200).send({ count });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch survey count" });
  }
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
