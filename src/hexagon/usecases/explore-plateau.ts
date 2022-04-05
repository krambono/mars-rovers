import { Command } from '../domain/command';
import { MarsMission, MissionReport } from '../domain/mars-mission';
import { Plateau } from '../domain/plateau';
import { RoverPosition } from '../domain/position';
import { CuriosityRoverFactory } from '../domain/rover-factory';
import { IdGenerator } from '../secondary-ports/id-generator';

export class ExplorePlateau {
  public constructor(private idGenerator: IdGenerator, private plateau: Plateau) {}

  public apply(landingPosition: RoverPosition, commands: Command[]): MissionReport {
    const roverFactory = new CuriosityRoverFactory(this.idGenerator, this.plateau);
    const mission = new MarsMission(this.idGenerator, roverFactory);
    mission.assignRover();
    mission.launchRover(landingPosition);
    mission.startMission(commands);
    return mission.getReport();
  }
}
