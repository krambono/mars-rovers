import { MissionReport } from 'src/read/hexagon/models/mission-report';
import { MissionReportQuery } from 'src/read/hexagon/secondary-ports/mission-report-query';

export class FakeMissionReportQuery implements MissionReportQuery {
  public reports: MissionReport[] = [];

  public async findMany(): Promise<MissionReport[]> {
    return this.reports;
  }

  public setReports(reports: MissionReport[]): void {
    this.reports = reports;
  }
}
