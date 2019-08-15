import SystemStatusModel from "./SystemStatusModel";

class SystemStatusHelper {
  constructor() {
    this.schema = SystemStatusModel.schema();
  }

  async getUpTime(moduleName) {
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
        const data = res.find(it => it.module === moduleName);
        const { module, totalDocuments, totalAlive } = data;
        const percentage = ((100 * totalAlive) / totalDocuments).toFixed(2);
        return this.schema
          .find({ module: moduleName }, "isAlive")
          .sort({ createdAt: -1 })
          .limit(10)
          .lean()
          .exec()
          .then(documents => {
            const docs = documents.map(item => ({
              isAlive: item.isAlive,
              createdAt: item.createdAt
            }));
            return {
              module,
              percentage,
              docs
            };
          });
      })
      .catch(() => 0.0);
  }
}

export default new SystemStatusHelper();
