import { IdGenerator } from '../secondary-ports/id-generator';
import { Plateau } from './plateau';
import { Rover } from './rover';

export class RoverFactory {
  public constructor(private idGenerator: IdGenerator, private plateau: Plateau) {}

  public createRover() {
    return new Rover(this.idGenerator, this.plateau);
  }
}
