import { IdGenerator } from '../../secondary-ports/id-generator';
import { Plateau } from './plateau';
import { Rover, CuriosityRover } from './rover';

export interface RoverFactory {
  createRover(): Rover;
}

export class CuriosityRoverFactory implements RoverFactory {
  public constructor(private idGenerator: IdGenerator, private plateau: Plateau) {}

  public createRover(): Rover {
    return new CuriosityRover(this.idGenerator, this.plateau);
  }
}
