import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import '../../src/env';
import serverless from 'serverless-http';
import type { HandlerContext, HandlerEvent } from '@netlify/functions';
import { getSchedules, addSchedule, updateRaid, deleteSchedule, addRaid, addCrew, deleteCrew } from '../../src/controllers';

export async function handler(event: HandlerEvent, context: HandlerContext) {
  const app: Express = express();
  const port = process.env.PORT || 8080;
  const pwd: string = encodeURIComponent(process.env.DB_PASS as string);
  const host: string = process.env.DB_HOST!.replace('<password>', pwd) as string;

  app.use(express.json());
  app.use(cors());

  app.route('/schedule').get(getSchedules).post(addSchedule);

  app.route('/schedule/:id').post(addRaid);

  app.route('/schedule/:id/:raidId').delete(deleteSchedule).patch(updateRaid).post(addCrew);

  app.route('/schedule/:id/:raidId/:crewId').delete(deleteCrew);

  mongoose
    .connect(host, {
      serverSelectionTimeoutMS: 30000 // 30 seconds timeout
    })
    .then(() => console.log('DB connection successful'));

  app.listen(5000, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

  return serverless(app)(event, context);
}
