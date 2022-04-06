import { Direction } from 'src/hexagon/domain/models/direction';
import { Plateau } from 'src/hexagon/domain/models/plateau';
import { RoverPosition } from 'src/hexagon/domain/models/position';
import { RoverCommandInterpreter } from 'src/hexagon/domain/services/rover-command-interpreter';
import { ExploreMars } from 'src/hexagon/usecases/explore-mars';
import * as chalk from 'chalk';

export class CLI {
  public constructor(private exploreMars: ExploreMars, private roverCommandInterpreter: RoverCommandInterpreter) {}

  public async execute(filePath: string) {
    this.errorHandling(async () => {
      const plateau: Plateau = new Plateau({ width: 5, height: 5 });
      const landingPosition = new RoverPosition(0, 0, Direction.NORTH);
      const commandsSets = await this.roverCommandInterpreter.interpret(filePath);
      await this.exploreMars.apply(plateau, landingPosition, commandsSets);
    });
  }

  public async errorHandling<T>(fn: () => T) {
    try {
      return await fn();
    } catch (error) {
      console.error(chalk.red('ERROR :'));
      console.error(error.message);
    }
  }
}
