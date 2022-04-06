import * as chalk from 'chalk';
import { Command, CommandRunner } from 'nest-commander';
import { RoverCommandInterpreter } from 'src/hexagon/domain/services/rover-command-interpreter';
import { ExploreMars } from 'src/hexagon/usecases/explore-mars';

@Command({
  name: 'mars-mission',
  arguments: '<file>',
  description: 'Start an exploration mission',
  options: { isDefault: true }
})
export class MarsExplorationCommand implements CommandRunner {
  public constructor(private exploreMars: ExploreMars, private roverCommandInterpreter: RoverCommandInterpreter) {}

  async run(passedParam: string[]): Promise<void> {
    try {
      await this.execute(passedParam[0]);
    } catch (error) {
      console.error(chalk.red('ERROR :'));
      console.error(error.message);
    }
  }

  private async execute(filePath: string) {
    const commands = await this.roverCommandInterpreter.interpret(filePath);
    await this.exploreMars.apply(commands);
  }
}
