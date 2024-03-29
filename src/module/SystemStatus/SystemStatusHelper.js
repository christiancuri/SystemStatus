import SystemStatusModel from "./SystemStatusModel";
import { format } from "date-fns";

class SystemStatusHelper {
  constructor() {
    this.schema = SystemStatusModel.schema();
  }

  async getUpTime(moduleName, limit = 10) {
    return this.schema
      .aggregate([
        {
          $match: {
            module: moduleName
          }
        },
        {
          $group: {
            _id: 1,
            all: { $sum: 1 },
            alive: { $sum: { $cmp: ["$isAlive", false] } }
          }
        },
        {
          $project: {
            module: moduleName,
            totalDocuments: "$all",
            totalAlive: "$alive"
          }
        }
      ])
      .then(res => {
        if (!res || res.length < 1) return false;
        const data = res.find(it => it.module === moduleName);
        const { totalDocuments, totalAlive } = data;
        const percentage = ((100 * totalAlive) / totalDocuments).toFixed(2);
        return this._getModuleLastStatus(moduleName, limit).then(documents => ({
          ...documents,
          uptime: percentage
        }));
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  async _getModuleLastStatus(moduleName, limit = 10) {
    return this.schema
      .find({ module: moduleName }, "isAlive createdAt duration")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .lean()
      .exec()
      .then(documents => {
        const docs = documents.map(item => ({
          isAlive: item.isAlive,
          createdAt: format(item.createdAt, "MM-DD-YYYY HH:mm"),
          duration: item.duration
        }));
        return {
          module: moduleName,
          docs
        };
      });
  }
}

export default new SystemStatusHelper();
