import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getSchedules, addSchedule, updateRaid, deleteSchedule, addRaid, addCrew, deleteCrew } from './controllers';

dotenv.config();

const app: Express = express();
const port = process.env.DB_PORT;
const pwd: string = encodeURIComponent(process.env.DB_PASS as string);
const host: string = process.env.DB_HOST!.replace('<password>', pwd) as string;

app.use(express.json());
app.use(cors());

// app.route('/').get(getSchedules);

app
  .route('/schedule')
  .get(getSchedules)
  .post(addSchedule);

app
  .route('/schedule/:id')
  .post(addRaid)

app
  .route('/schedule/:id/:raidId')
  .delete(deleteSchedule)
  .patch(updateRaid)
  .post(addCrew)

app
  .route('/schedule/:id/:raidId/:crewId')
  .delete(deleteCrew)

mongoose.connect(host)
.then(() => console.log('DB connection successful'));

app.listen(5000, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
