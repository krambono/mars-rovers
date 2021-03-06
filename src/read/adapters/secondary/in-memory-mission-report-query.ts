import { MissionReport } from 'src/read/hexagon/models/mission-report';
import { MissionReportQuery } from 'src/read/hexagon/secondary-ports/mission-report-query';
import { InMemoryMissionReportRepository } from 'src/write/adapters/secondary/mission-report-storage/adapters/in-memory-mission-report-repository';

export class InMemoryMissionReportQuery implements MissionReportQuery {
  public constructor(private inMemoryMissionReportRepository: InMemoryMissionReportRepository) {}

  public async findMany(): Promise<MissionReport[]> {
    return this.inMemoryMissionReportRepository.getReports().map(report => ({
      id: report.id,
      rover: {
        id: report.rover.id,
        positions: [report.rover.landingPosition, ...report.rover.positions.flat()].map(roverPosition => ({
          x: roverPosition.x,
          y: roverPosition.y,
          direction: roverPosition.direction
        }))
      }
    }));
  }
}
