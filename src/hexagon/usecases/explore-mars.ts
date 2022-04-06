import { Command } from '../domain/models/command';
import { MarsMission } from '../domain/models/mars-mission';
import { Plateau } from '../domain/models/plateau';
import { RoverPosition } from '../domain/models/position';
import { CuriosityRoverFactory } from '../domain/models/rover-factory';
import { IdGenerator } from '../secondary-ports/id-generator';
import { MissionReportHandler } from '../secondary-ports/mission-report-handler';

export class ExploreMars {
  public constructor(private idGenerator: IdGenerator, private missionReportHandler: MissionReportHandler) {}

  public async apply(plateau: Plateau, landingPosition: RoverPosition, commands: Command[][]): Promise<void> {
    const roverFactory = new CuriosityRoverFactory(this.idGenerator, plateau);
    const mission = new MarsMission(this.idGenerator, roverFactory);
    mission.assignRover();
    mission.launchRover(landingPosition);
    mission.startMission(commands);
    await this.missionReportHandler.handle(mission.getReport());
  }
}
