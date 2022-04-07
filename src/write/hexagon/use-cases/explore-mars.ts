import { Command } from '../domain/models/command';
import { MarsMission } from '../domain/models/mars-mission';
import { RoverPosition } from '../domain/models/position';
import { RoverFactory } from '../domain/models/rover-factory';
import { IdGenerator } from '../secondary-ports/id-generator';
import { MissionReportHandler } from '../secondary-ports/mission-report-handler';

export class ExploreMars {
  public constructor(
    private idGenerator: IdGenerator,
    private missionReportHandler: MissionReportHandler,
    private roverFactory: RoverFactory,
    private landingPosition: RoverPosition
  ) {}

  public async apply(commands: Command[][]): Promise<void> {
    const mission = new MarsMission(this.idGenerator, this.roverFactory);
    mission.assignRover();
    mission.launchRover(this.landingPosition);
    mission.startMission(commands);
    const report = mission.getReport();
    await this.missionReportHandler.handle(report);
  }
}
