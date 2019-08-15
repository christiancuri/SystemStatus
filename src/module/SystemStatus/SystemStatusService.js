class SystemStatusService {
  async test(req, res) {
    res.send(true);
  }
}

export default new SystemStatusService();
