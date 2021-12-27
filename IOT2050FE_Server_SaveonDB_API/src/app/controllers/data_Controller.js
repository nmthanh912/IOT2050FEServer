const Data = require("../models/Data");

//Có quy chuẩn để export nên research
exports.show = async () => {
  const dataRespond = await Data.find({});
  return dataRespond;
};

exports.findByValueName = async (name) => {
  const dataRespond = await Data.find({ valueName: name });
  return dataRespond;
};

class Data_Control {
  // [GET]  show toàn bộ Data
  async show() {
    await Data.find({})
      .then((data) => {
        let result = [];
        for (var i in data) {
          result.push({
            id: data[i]._id,
            station: data[i].station,
            slaveID: data[i].slaveID,
            value: data[i].value,
            valueName: data[i].valueName,
            createdAt: data[i].createdAt,
          });
        }
        // console.log(result);
        return result;
      })
      .catch(() => {
        res.status(500).json({
          errCode: 1,
          errMessage: `Can't find any device type!`,
        });
      });
  }
}
