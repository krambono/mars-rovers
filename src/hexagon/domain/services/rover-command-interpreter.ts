import { FileStorage } from 'src/hexagon/secondary-ports/file-storage';
import { Command } from '../models/command';

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
    const knownCommands = ['R', 'L', 'F', 'B'];

    for (const c of line) {
      if (c === ' ' || c === '\t') {
        continue;
      }
      if (knownCommands.includes(c)) {
        commands.push(commandsCharacterMapping[c]);
      } else {
        throw Error(`Unknown command : ${c}`);
      }
    }

    return commands;
  }
}
