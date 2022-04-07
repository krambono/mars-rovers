import { MissionReport } from 'src/hexagon/domain/models/mars-mission';

export interface MissionReportRepository {
  save(missionReport: MissionReport): Promise<void>;
}
