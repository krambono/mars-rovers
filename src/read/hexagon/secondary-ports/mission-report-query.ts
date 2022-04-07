import { MissionReport } from '../models/mission-report';

export interface MissionReportQuery {
  findMany(): Promise<MissionReport[]>;
}
