import { MissionReport } from 'src/hexagon/domain/models/mars-mission';
import { MissionReportHandler } from 'src/hexagon/secondary-ports/mission-report-handler';

export class FakeMissionReportHandler implements MissionReportHandler {
  private _report: MissionReport;

  public async handle(report: MissionReport): Promise<void> {
    this._report = report;
  }

  public getReport(): MissionReport {
    return this._report;
  }
}
