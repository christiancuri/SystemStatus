import { Router } from "express";
import SystemStatusController from "./module/SystemStatus/SystemStatusController";

class ModuleRoutes {
  async start(app) {
    const router = Router();
    app.use("/api", await SystemStatusController.init(router));
  }
}

export default new ModuleRoutes();
