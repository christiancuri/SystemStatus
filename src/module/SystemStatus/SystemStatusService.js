import SystemStatusHelper from "./SystemStatusHelper";
class SystemStatusService {
  async getUptime(req, res) {
    const { module } = req.params;
    const { limit } = req.query;
    SystemStatusHelper.getUpTime(module, limit || 10)
      .then(data => {
        if (!data) return res.status(404).json({ message: "Not found" });
        return res.json(data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      });
  }
}

export default new SystemStatusService();
