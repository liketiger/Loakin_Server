"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CharacterDetailSchema = new mongoose_1.default.Schema({
    ServerName: String,
    CharacterName: String,
    CharacterLevel: Number,
    CharacterClassName: String,
    ItemAvgLevel: Number
});
const RaidDetailSchemna = new mongoose_1.default.Schema({
    name: String,
    level: String,
    time: String,
    characterList: [CharacterDetailSchema]
});
const ScheduleSchema = new mongoose_1.default.Schema({
    date: String,
    raid: [RaidDetailSchemna]
});
const Schedule = mongoose_1.default.model('Schedule', ScheduleSchema);
exports.default = Schedule;
//# sourceMappingURL=index.js.map