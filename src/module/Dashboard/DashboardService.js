class DashboardService {
  constructor(webSocketServer) {
    this.webSocketServer = webSocketServer;
  }

  async cloneDatabase(req, res) {
    res.json({
      code: 200,
      message: `Database clone started`
    });
    this.webSocketServer.sockets.emit(
      `/production/database/log`,
      `Clone started`
    );
  }

  async resetStagingPasswords(req, res) {
    res.json({
      code: 200,
      message: `All passwords of users changed to default Feracode password`
    });
    this.webSocketServer.sockets.emit(
      `/staging/reset-passwords/log`,
      `Reseting passwords`
    );
  }

  async getLogs(req, res) {
    const { env } = req.params;
    res.json({
      code: 200,
      environment: env.toUpperCase(),
      data: [
        {
          text: `Logs example`
        }
      ]
    });
  }
}

export default DashboardService;
