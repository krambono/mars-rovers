import { FileStorage } from 'src/hexagon/secondary-ports/file-storage';
import { Command } from '../../../hexagon/domain/models/command';

export class RoverCommandInterpreter {
  public constructor(private fileStorage: FileStorage) {}

  public async interpret(filePath: string): Promise<Command[][]> {
    const lines = await this.retrieveFileLines(filePath);
    return this.transformLinesIntoCommands(lines);
  }

  private async retrieveFileLines(filePath: string): Promise<string[]> {
    try {
      return await this.fileStorage.readFileLineByLine(filePath);
    } catch (e) {
      throw new Error(`Failed to read file : ${filePath}`);
    }
  }

  private transformLinesIntoCommands(lines: string[]): Command[][] {
    return lines.reduce((commandsSets, line) => {
      const commands = this.parseLine(line);
      if (commands.length) {
        commandsSets.push(commands);
      }
      return commandsSets;
    }, [] as Command[][]);
  }

  private parseLine(line: string): Command[] {
    const commands: Command[] = [];
    const commandsCharacterMapping: Record<'R' | 'L' | 'F' | 'B', Command> = {
      R: Command.RIGHT,
      L: Command.LEFT,
      F: Command.FORWARD,
      B: Command.BACKWARD
    };
    const validCommands = ['R', 'L', 'F', 'B'];

    for (const character of line) {
      if (character === ' ' || character === '\t') {
        continue;
      }
      if (validCommands.includes(character)) {
        commands.push(commandsCharacterMapping[character]);
      } else {
        throw Error(`Unknown command : ${character}`);
      }
    }

    return commands;
  }
}
