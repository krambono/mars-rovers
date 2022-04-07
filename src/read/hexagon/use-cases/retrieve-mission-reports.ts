import { MissionReport } from '../models/mission-report';
import { MissionReportQuery } from '../secondary-ports/mission-report-query';

export class RetrieveMissionReports {
  public constructor(private missionReportQuery: MissionReportQuery) {}

  public run(): Promise<MissionReport[]> {
    return this.missionReportQuery.findMany();
  }
}
