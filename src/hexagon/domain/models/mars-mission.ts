import { IdGenerator } from '../../secondary-ports/id-generator';
import { Command } from './command';
import { RoverPosition } from './position';
import { Rover } from './rover';
import { RoverFactory } from './rover-factory';

export interface MissionReport {
  id: string;
  rover: { id: string; positions: RoverPosition[][] };
}

export class MarsMission {
  private id: string;
  private rover: Rover;

  public constructor(idGenerator: IdGenerator, private roverFactory: RoverFactory) {
    this.id = idGenerator.generateId();
  }

  public assignRover(): void {
    this.rover = this.roverFactory.createRover();
  }

  public launchRover(landingPosition: RoverPosition): void {
    this.rover.land(landingPosition);
  }

  public startMission(commandSets: Command[][]): void {
    for (const commands of commandSets) {
      this.rover.execute(commands);
    }
  }

  public getReport(): MissionReport {
    return { id: this.id, rover: this.rover.state };
  }
}
