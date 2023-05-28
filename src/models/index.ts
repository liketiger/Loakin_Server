import mongoose from "mongoose";

const CharacterDetailSchema = new mongoose.Schema({
  ServerName: String,
  CharacterName: String,
  CharacterLevel: Number,
  CharacterClassName: String,
  ItemAvgLevel: Number
});

const RaidDetailSchemna = new mongoose.Schema({
  name: String,
  level: String,
  time: String,
  characterList: [CharacterDetailSchema]
})

const ScheduleSchema = new mongoose.Schema({
  date: String,
  raid: [RaidDetailSchemna]
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

export default Schedule;