import { IdGenerator } from '../secondary-ports/id-generator';
import { Command } from './command';
import { Plateau } from './plateau';
import { Rover } from './rover';
import { RoverPosition } from './position';

export class MarsMission {
  private rover: Rover;

  public constructor(private idGenerator: IdGenerator, private plateau: Plateau) {}

  public addRover(initialPosition: RoverPosition) {
    this.rover = this.createRover(initialPosition);
  }

  public startMission(commands: Command[]): { id: string; positions: RoverPosition[] } {
    for (const command of commands) {
      this.rover.execute(command);
    }
    return this.rover.state;
  }

  private createRover(initialPosition: RoverPosition): Rover {
    return new Rover(this.idGenerator, this.plateau, initialPosition);
  }
}
