import { Command } from './command';
import { RoverPosition } from './position';
import { Rover } from './rover';
import { RoverFactory } from './rover-factory';

export class MarsMission {
  private rover: Rover;

  public constructor(private roverFactory: RoverFactory) {}

  public assignRover(): void {
    this.rover = this.roverFactory.createRover();
  }

  public launchRover(landingPosition: RoverPosition): void {
    this.rover.land(landingPosition);
  }

  public startMission(commands: Command[]): void {
    for (const command of commands) {
      this.rover.execute(command);
    }
  }

  public getReport(): { id: string; positions: RoverPosition[] } {
    return this.rover.state;
  }
}
