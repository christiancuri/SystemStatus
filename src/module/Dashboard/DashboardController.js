import DashboardService from "./DashboardService";
import { Router } from "express";
class SystemStatusController {
  async init(mainRouter, webSocketServer) {
    const service = new DashboardService(webSocketServer);
    const router = Router();
    router
      .put(`/production/database/clone`, service.cloneDatabase.bind(service))
      .put(
        `/staging/reset-passwords`,
        service.resetStagingPasswords.bind(service)
      )
      .get(`/:env/logs`, service.getLogs.bind(service));
    return mainRouter.use(`/`, router);
  }
}

export default new SystemStatusController();
