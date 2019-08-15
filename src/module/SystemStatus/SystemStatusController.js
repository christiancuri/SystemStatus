import SystemStatusService from "./SystemStatusService";
import { Router } from "express";
class SystemStatusController {
  async init(mainRouter) {
    const router = Router();
    router.get(`/uptime/:module`, SystemStatusService.getUptime);
    return mainRouter.use(`/system`, router);
  }
}

export default new SystemStatusController();
