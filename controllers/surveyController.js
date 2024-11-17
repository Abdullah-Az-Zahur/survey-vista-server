import {
  createSurvey,
  deleteSurveyById,
  getAllSurveys,
  getPaginatedSurveys,
  getSurveyById,
  getSurveyCount,
  getSurveysBySurveyorEmail,
  updateSurveyById,
  updateSurveyVote,
} from "../models/surveyModel.js";

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

export const updateSurveyByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const result = await updateSurveyById(id, updateData);

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Survey not found" });
    }

    res.send({ message: "Survey updated successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating survey", error });
  }
};

export const getPaginatedSurveysController = async (req, res) => {
  try {
    const size = parseInt(req.query.size) || 10; // Default size
    const page = (parseInt(req.query.page) || 1) - 1; // Default page 1, zero-indexed
    const filter = req.query.filter;
    const sort = req.query.sort;
    const search = req.query.search || "";

    // console.log(`Fetching page ${page + 1}, size ${size}`);

    let query = {
      title: { $regex: search, $options: "i" },
    };

    if (filter) query.category = filter;

    let options = {};
    if (sort) options = { sort: { deadline: sort === "asc" ? 1 : -1 } };

    const result = await getPaginatedSurveys(query, options, size, page);
    res.send(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error fetching paginated surveys", error });
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
    res.send({ count });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching survey count", error });
  }
};

export const updateSurveyVoteController = async (req, res) => {
  try {
    const id = req.params.id;
    const item = req.body;

    if (item?.selectedValue === "Yes") {
      const updateDoc = { $inc: { yes: 1 } };
      const result = await updateSurveyVote(id, updateDoc);
      return res.send(result);
    } else if (item?.selectedValue === "No") {
      const updateDoc = { $inc: { no: 1 } };
      const result = await updateSurveyVote(id, updateDoc);
      return res.send(result);
    } else {
      return res.status(400).send({ message: "Invalid vote value" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating survey vote", error });
  }
};

export const createSurveyController = async (req, res) => {
  try {
    const surveyData = req.body;
    const result = await createSurvey(surveyData);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving survey data", error });
  }
};

export const getSurveysBySurveyorEmailController = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await getSurveysBySurveyorEmail(email);
    res.send(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error fetching surveys for surveyor", error });
  }
};

export const deleteSurveyByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteSurveyById(id);
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Survey not found" });
    }
    res.send({ message: "Survey deleted successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting survey", error });
  }
};
