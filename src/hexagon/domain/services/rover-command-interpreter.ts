import { FileStorage } from 'src/hexagon/secondary-ports/file-storage';
import { Command } from '../models/command';

export class RoverCommandInterpreter {
  public constructor(private fileStorage: FileStorage) {}

  public async interpret(filePath: string): Promise<Command[][]> {
    const lines = await this.fileStorage.readFileLineByLine(filePath);
    return lines.reduce((commands, line) => [...commands, this.parseLine(line)], [] as Command[][]);
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
