import { MissionReport } from '../domain/read/models/mission-report';
import { MissionReportQuery } from '../secondary-ports/read/mission-report-query';

export class RetrieveMissionReports {
  public constructor(private missionReportQuery: MissionReportQuery) {}

  public run(): Promise<MissionReport[]> {
    return this.missionReportQuery.findMany();
  }
}
