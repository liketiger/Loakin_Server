import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import './env';
import { getSchedules, addSchedule, updateRaid, deleteSchedule, addRaid, addCrew, deleteCrew } from './controllers';

const app: Express = express();
const port = process.env.PORT || 8000;
const pwd: string = encodeURIComponent(process.env.DB_PASS as string);
const host: string = process.env.DB_HOST!.replace('<password>', pwd) as string;

app.use(express.json());
app.use(cors());

app.route('/schedule')
  .get(getSchedules)
  .post(addSchedule);

app.route('/schedule/:id')
  .post(addRaid);

app.route('/schedule/:id/:raidId')
  .delete(deleteSchedule)
  .patch(updateRaid)
  .post(addCrew);

app.route('/schedule/:id/:raidId/:crewId')
  .delete(deleteCrew);

mongoose
  .connect(host, {
    serverSelectionTimeoutMS: 3000 // 30 seconds timeout
  })
  .then(() => console.log('DB connection successful'));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;