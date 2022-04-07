import { FileStorage } from 'src/write/hexagon/secondary-ports/file-storage';

interface File {
  path: string;
  lines: string[];
}

export class FakeFileStorage implements FileStorage {
  private files: Record<string, File> = {};

  public async readFileLineByLine(filePath: string): Promise<string[]> {
    const lines = this.files[filePath]?.lines;
    if (!lines) {
      throw new Error('File does not exist');
    }
    return lines;
  }

  public setFile(file: File) {
    this.files[file.path] = file;
  }
}
