import { MissionReport } from 'src/hexagon/domain/models/mars-mission';
import { RoverPosition } from 'src/hexagon/domain/models/position';
import { MissionReportHandler } from 'src/hexagon/secondary-ports/mission-report-handler';
import { Logger } from './secondary-ports/logger';

export class MissionReportLogger implements MissionReportHandler {
  public constructor(private logger: Logger) {}

  public async handle(report: MissionReport): Promise<void> {
    const lastPositionsBySets: RoverPosition[] = report.rover.positions.map(positionSets => positionSets.at(-1)!);
    lastPositionsBySets.forEach(position => this.logPosition(position));
  }

  private logPosition(position: RoverPosition): void {
    this.logger.log(`${position.x} ${position.y} ${position.direction.at(0)}`);
  }
}
