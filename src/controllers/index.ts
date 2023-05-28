import { Request, Response } from 'express';
import Schedule from '../models';

const getSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await Schedule.find();

    return res.status(200).json({
      status: 'success',
      data: {
        schedules
      }
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

const addSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.create(req.body);

    return res.status(201).json({
      status: 'success',
      data: {
        schedule
      }
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

const addRaid = async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.updateOne(
      { _id: req.params.id },
      {
        $push: {
          raid: req.body
        }
      }
    );

    return res.status(200).json({
      status: 'success',
      data: {
        schedule
      }
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

const updateRaid = async (req: Request, res: Response) => {
  try {
    const { id, raidId } = req.params;
    const schedule = await Schedule.findById(id);

    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });

    const raidIndex = schedule!.raid.findIndex((raid) => raid._id!.toString() === raidId);

    if (raidIndex === -1) return res.status(404).json({ error: 'Raid not found' });

    schedule!.raid[raidIndex] = req.body;
    await schedule!.save();

    return res.status(200).json({
      status: 'success',
      message: 'null'
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const { id, raidId } = req.params;
    const schedule = await Schedule.findById(id);

    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });

    const raidIndex = schedule!.raid.findIndex((raid) => raid._id!.toString() === raidId);

    if (raidIndex === -1) return res.status(404).json({ error: 'Raid not found' });

    schedule!.raid.splice(raidIndex, 1);
    await schedule!.save();

    return res.status(200).json({
      status: 'success',
      message: 'null'
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

const addCrew = async (req: Request, res: Response) => {
  try {
    const { id, raidId } = req.params;
    const schedule = await Schedule.findById(id);

    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });

    const raidIndex = schedule!.raid.findIndex((raid) => raid._id!.toString() === raidId);

    if (raidIndex === -1) return res.status(404).json({ error: 'Raid not found' });

    schedule!.raid[raidIndex].characterList.push(req.body);
    await schedule!.save();

    return res.status(200).json({
      status: 'success',
      message: 'null'
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

const deleteCrew = async (req: Request, res: Response) => {
  try {
    const { id, raidId, crewId } = req.params;
    const schedule = await Schedule.findById(id);

    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });

    const raid = schedule!.raid.find((raid) => raid._id!.toString() === raidId);
    const crewIndex = raid!.characterList.findIndex((character) => character._id!.toString() === crewId);

    raid?.characterList.splice(crewIndex, 1);
    await schedule!.save();

    return res.status(200).json({
      status: 'success',
      message: 'null'
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

export { getSchedules, addSchedule, addRaid, updateRaid, deleteSchedule, addCrew, deleteCrew };
