import { MissionReport } from '../domain/models/mars-mission';

export interface MissionReportHandler {
  handle(report: MissionReport): Promise<void>;
}
