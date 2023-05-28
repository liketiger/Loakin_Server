"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCrew = exports.addCrew = exports.deleteSchedule = exports.updateRaid = exports.addRaid = exports.addSchedule = exports.getSchedules = void 0;
const models_1 = __importDefault(require("../models"));
const getSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield models_1.default.find();
        return res.status(200).json({
            status: 'success',
            data: {
                schedules
            }
        });
    }
    catch (err) {
        return res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});
exports.getSchedules = getSchedules;
const addSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = yield models_1.default.create(req.body);
        return res.status(201).json({
            status: 'success',
            data: {
                schedule
            }
        });
    }
    catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: err
        });
    }
});
exports.addSchedule = addSchedule;
const addRaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = yield models_1.default.updateOne({ _id: req.params.id }, {
            $push: {
                raid: req.body
            }
        });
        return res.status(200).json({
            status: 'success',
            data: {
                schedule
            }
        });
    }
    catch (err) {
        return res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});
exports.addRaid = addRaid;
const updateRaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, raidId } = req.params;
        const schedule = yield models_1.default.findById(id);
        if (!schedule)
            return res.status(404).json({ error: 'Schedule not found' });
        const raidIndex = schedule.raid.findIndex((raid) => raid._id.toString() === raidId);
        if (raidIndex === -1)
            return res.status(404).json({ error: 'Raid not found' });
        schedule.raid[raidIndex] = req.body;
        yield schedule.save();
        return res.status(200).json({
            status: 'success',
            message: 'null'
        });
    }
    catch (err) {
        return res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});
exports.updateRaid = updateRaid;
const deleteSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, raidId } = req.params;
        const schedule = yield models_1.default.findById(id);
        if (!schedule)
            return res.status(404).json({ error: 'Schedule not found' });
        const raidIndex = schedule.raid.findIndex((raid) => raid._id.toString() === raidId);
        if (raidIndex === -1)
            return res.status(404).json({ error: 'Raid not found' });
        schedule.raid.splice(raidIndex, 1);
        yield schedule.save();
        return res.status(200).json({
            status: 'success',
            message: 'null'
        });
    }
    catch (err) {
        return res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});
exports.deleteSchedule = deleteSchedule;
const addCrew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, raidId } = req.params;
        const schedule = yield models_1.default.findById(id);
        if (!schedule)
            return res.status(404).json({ error: 'Schedule not found' });
        const raidIndex = schedule.raid.findIndex((raid) => raid._id.toString() === raidId);
        if (raidIndex === -1)
            return res.status(404).json({ error: 'Raid not found' });
        schedule.raid[raidIndex].characterList.push(req.body);
        yield schedule.save();
        return res.status(200).json({
            status: 'success',
            message: 'null'
        });
    }
    catch (err) {
        return res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});
exports.addCrew = addCrew;
const deleteCrew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, raidId, crewId } = req.params;
        const schedule = yield models_1.default.findById(id);
        if (!schedule)
            return res.status(404).json({ error: 'Schedule not found' });
        const raid = schedule.raid.find((raid) => raid._id.toString() === raidId);
        const crewIndex = raid.characterList.findIndex((character) => character._id.toString() === crewId);
        raid === null || raid === void 0 ? void 0 : raid.characterList.splice(crewIndex, 1);
        yield schedule.save();
        return res.status(200).json({
            status: 'success',
            message: 'null'
        });
    }
    catch (err) {
        return res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});
exports.deleteCrew = deleteCrew;
//# sourceMappingURL=index.js.map