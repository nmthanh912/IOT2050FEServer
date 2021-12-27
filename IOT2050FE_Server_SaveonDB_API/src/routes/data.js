const express = require("express");
const router = express.Router();
const data_Controller = require("../app/controllers/data_Controller");

// router.get("/", data_Controller.Show);
exports.getAllData = async () => {
  const data = await data_Controller.show();
  return data;
};

exports.getDataByValueName = async (valueName) => {
  const data = await data_Controller.findByValueName(valueName);
  return data;
};
