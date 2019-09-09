import { Router } from "express";
import SystemStatusController from "./module/SystemStatus/SystemStatusController";
import DashboardController from "./module/Dashboard/DashboardController";

class ModuleRoutes {
  async start(app, webSocketServer) {
    const router = Router();
    app.use("/api", await SystemStatusController.init(router));
    app.use(`/api`, await DashboardController.init(router, webSocketServer));
  }
}

export default new ModuleRoutes();
