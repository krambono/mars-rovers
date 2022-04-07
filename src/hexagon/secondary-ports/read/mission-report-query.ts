import { MissionReport } from '../../domain/read/models/mission-report';

export interface MissionReportQuery {
  findMany(): Promise<MissionReport[]>;
}
