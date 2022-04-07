import * as chalk from 'chalk';
import { Command, CommandRunner } from 'nest-commander';
import { ExploreMars } from 'src/write/hexagon/use-cases/explore-mars';
import { RoverCommandInterpreter } from './rover-command-interpreter';

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
