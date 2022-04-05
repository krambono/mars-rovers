import { Command } from '../models/command';
import { MarsMission, MissionReport } from '../models/mars-mission';
import { Plateau } from '../models/plateau';
import { RoverPosition } from '../models/position';
import { CuriosityRoverFactory } from '../models/rover-factory';
import { IdGenerator } from '../../secondary-ports/id-generator';

export class MarsExploration {
  public constructor(private idGenerator: IdGenerator) {}

  public explore(plateau: Plateau, landingPosition: RoverPosition, commands: Command[]): MissionReport {
    const roverFactory = new CuriosityRoverFactory(this.idGenerator, plateau);
    const mission = new MarsMission(this.idGenerator, roverFactory);
    mission.assignRover();
    mission.launchRover(landingPosition);
    mission.startMission(commands);
    return mission.getReport();
  }
}
