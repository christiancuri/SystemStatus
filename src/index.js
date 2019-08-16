import { config } from "dotenv";
import { CronJob } from "cron";
import MongoDB from "./MongoDB.js";
import mongoose from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";

import SystemStatusTask from "./module/SystemStatus/SystemStatusTask";
import ModuleRoutes from "./ModuleRoutes.js";

const app = express();
config();

const App = async function() {
  const cronTime = `0 */5 * * * *`;
  const job = {
    development: new CronJob(cronTime, async function() {
      SystemStatusTask.check(`development`);
    }),
    staging: new CronJob(cronTime, async function() {
      SystemStatusTask.check(`staging`);
    }),
    production: new CronJob(cronTime, async function() {
      SystemStatusTask.check(`production`);
    })
  };

  MongoDB.connect();
  mongoose.connection.on(`connected`, async () => {
    job.production.start();
  });

  const httpServer = http.createServer(app);
  const port = process.env.PORT || 8080;
  httpServer.listen(port, () =>
    console.log(`Running http server on port ${port}`)
  );

  app.use(cors());

  ModuleRoutes.start(app);
};

App();

export default app;
