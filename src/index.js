import { CronJob } from "cron";
import SystemStatus from "./SystemStatus.js";
import MongoDB from "./MongoDB.js";
import { config } from "dotenv";
import mongoose from "mongoose";

const App = async function() {
  config();
  const cronTime = `0 */1 * * * *`;
  const job = {
    development: new CronJob(cronTime, async function() {
      SystemStatus.check(`development`);
    }),
    staging: new CronJob(cronTime, async function() {
      SystemStatus.check(`staging`);
    }),
    production: new CronJob(cronTime, async function() {
      SystemStatus.check(`production`);
    })
  };

  MongoDB.connect();
  mongoose.connection.on(`connected`, async () => {
    // job.production.start();
  });
};

App();

export default App;
