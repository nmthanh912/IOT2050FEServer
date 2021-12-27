const dataRouter = require("./data");
const express = require("express");
const router = express.Router();

//Get home page
router.get("/", async function (req, res, next) {
  dataRespond = await dataRouter.getAllData();
  if (dataRespond) {
    res.status(200).json(dataRespond);
  } else {
    res.status(404).json({ message: "error!" });
  }
});

router.get("/getByValueName", async function (req, res, next) {
  const valueName = req.query.valueName;
  dataRespond = await dataRouter.getDataByValueName(valueName);
  if (dataRespond) {
    res.status(200).json(dataRespond);
  } else {
    res.status(404).json({ message: "error!" });
  }
});
// function route(app) {
//   app.use("/", dataRouter);
//   // app.use("/api", userRouter)
// }

module.exports = router;
