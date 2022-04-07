import { MissionReport } from 'src/write/hexagon/domain/models/mars-mission';
import { MissionReportRepository } from '../secondary-ports/mission-report-repository';

export class InMemoryMissionReportRepository implements MissionReportRepository {
  private missionReports: Record<string, MissionReport> = {};

  public async save(missionReport: MissionReport): Promise<void> {
    this.missionReports[missionReport.id] = missionReport;
  }

  public getReports(): MissionReport[] {
    return Object.values(this.missionReports);
  }
}
