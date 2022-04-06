import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { FileStorage } from 'src/hexagon/secondary-ports/file-storage';

export class HDDFileStorage implements FileStorage {
  public async readFileLineByLine(filePath: string): Promise<string[]> {
    try {
      const rl = createInterface({ input: createReadStream(filePath) });

      const lines: string[] = [];
      for await (const line of rl) {
        lines.push(line);
      }

      return lines;
    } catch (error) {
      throw new Error(`Error reading file : ${filePath}`);
    }
  }
}
