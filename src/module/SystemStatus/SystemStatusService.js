import SystemStatusHelper from "./SystemStatusHelper";
class SystemStatusService {
  async getUptime(req, res) {
    const { module } = req.params;
    const { limit } = req.query;
    SystemStatusHelper.getUpTime(module, limit || 10).then(data => {
      if (!data) return res.status(404).json({ message: "Not found" });
      return res.json(data);
    });
  }
}

export default new SystemStatusService();
