const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Data = new Schema(
  {
    station: { type: String },
    siteID: { type: Number },
    slaveID: { type: Number },
    value: { type: String },
    idValue: { type: Number },
    valueName: { type: String },
    deviceName: { type: String },
  },
  {
    timestamps: true,
    _id: true,
  }
);

//Add plugin
mongoose.plugin(slug);
Data.plugin(mongooseDelete, { overrideMethods: "all" }, { deletedAt: true });

module.exports = mongoose.model("ModbusTCPValue", Data);
