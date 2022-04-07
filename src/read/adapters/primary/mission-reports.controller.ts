import { Controller, Get } from '@nestjs/common';
import { MissionReport } from 'src/read/hexagon/models/mission-report';
import { RetrieveMissionReports } from 'src/read/hexagon/use-cases/retrieve-mission-reports';

@Controller('mission-reports')
export class MissionReportController {
  public constructor(private retrieveMissionReports: RetrieveMissionReports) {}

  @Get()
  public getMissionReports(): Promise<MissionReport[]> {
    return this.retrieveMissionReports.run();
  }
}
