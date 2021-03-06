import { MissionReport } from 'src/write/hexagon/domain/models/mars-mission';
import { MissionReportHandler } from 'src/write/hexagon/secondary-ports/mission-report-handler';
import { MissionReportRepository } from './secondary-ports/mission-report-repository';

export class MissionReportStorage implements MissionReportHandler {
  public constructor(private missionReportRepository: MissionReportRepository) {}

  public async handle(report: MissionReport): Promise<void> {
    await this.missionReportRepository.save(report);
  }
}
