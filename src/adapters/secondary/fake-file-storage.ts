import { FileStorage } from 'src/hexagon/secondary-ports/file-storage';

interface File {
  path: string;
  lines: string[];
}

export class FakeFileStorage implements FileStorage {
  private files: Record<string, File> = {};

  public async readFileLineByLine(filePath: string): Promise<string[]> {
    return this.files[filePath].lines;
  }

  public setFile(file: File) {
    this.files[file.path] = file;
  }
}
