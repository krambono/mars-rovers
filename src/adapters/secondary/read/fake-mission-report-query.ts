import { MissionReport } from 'src/hexagon/domain/read/models/mission-report';
import { MissionReportQuery } from 'src/hexagon/secondary-ports/read/mission-report-query';

export class FakeMissionReportQuery implements MissionReportQuery {
  public reports: MissionReport[] = [];

  public async findMany(): Promise<MissionReport[]> {
    return this.reports;
  }

  public setReports(reports: MissionReport[]): void {
    this.reports = reports;
  }
}
