class DashboardService {
  constructor(webSocketServer) {
    this.webSocketServer = webSocketServer;
  }

  async cloneDatabase(req, res) {
    res.json({
      status: 200,
      message: `Database clone started`
    });
    this.webSocketServer.sockets.emit(
      `/production/database/log`,
      `Clone started`
    );
  }

  async resetStagingPasswords(req, res) {
    res.json({
      status: 200,
      message: `All passwords of users changed to default Feracode password`
    });
    this.webSocketServer.sockets.emit(
      `/staging/reset-passwords/log`,
      `Reseting passwords`
    );
  }
}

export default DashboardService;
