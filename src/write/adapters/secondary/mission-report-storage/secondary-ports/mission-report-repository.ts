import { MissionReport } from 'src/write/hexagon/domain/models/mars-mission';

export interface MissionReportRepository {
  save(missionReport: MissionReport): Promise<void>;
}
