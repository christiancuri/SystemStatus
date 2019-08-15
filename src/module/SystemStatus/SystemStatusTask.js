import { format } from "date-fns";
import axios from "axios";
import { config } from "dotenv";

import SystemStatusModel from "./SystemStatusModel";
import SystemStatusHelper from "./SystemStatusHelper";

config();
class SystemStatusTask {
  constructor() {
    this.url_base = process.env.URL_BASE;
    this.schema = SystemStatusModel.schema();
    this.modules = [
      `system`,
      `chat`,
      `workspace`,
      `profile-file`,
      `profile-card`,
      `dashboard`,
      `user`,
      `user-profile`,
      `vault`,
      `contact`,
      `calendar`,
      `communication`,
      `task`
    ];

    this.domains = {
      development: `dev`,
      staging: `staging`,
      production: `app`
    };
  }

  async check(environment) {
    console.log(`Running in ${this._now()}`);
    const url_base = this.url_base.replace(
      `%environment%`,
      this.domains[environment]
    );
    this.modules.map(async moduleName => {
      const url = url_base.replace(`%module%`, moduleName);
      const status = await this.isAlive(url);
      this.saveStatus(environment, moduleName, status);
    });
  }

  async saveStatus(environment, moduleName, isAlive) {
    new this.schema({
      environment,
      module: moduleName,
      isAlive
    })
      .save()
      .then(data =>
        console.log(
          `data inserted: Status: ${isAlive} - Environment: ${environment} - Module: ${moduleName} - ID: ${String(
            data._id
          )}`
        )
      );
  }

  async isAlive(url) {
    return axios
      .get(url)
      .then(data => data.status === 200)
      .catch(() => false);
  }

  _now() {
    return format(new Date(), `MM-DD-YYYY HH:mm:ss`);
  }
}

export default new SystemStatusTask();