import { MissionReport } from 'src/hexagon/domain/models/mars-mission';
import { MissionReportRepository } from '../secondary-ports/mission-report-repository';

export class inMemoryMissionReportRepository implements MissionReportRepository {
  private missionReports: Record<string, MissionReport> = {};

  public async save(missionReport: MissionReport): Promise<void> {
    this.missionReports[missionReport.id] = missionReport;
  }
}
