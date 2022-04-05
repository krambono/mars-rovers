export interface FileStorage {
  readFileLineByLine(filePath: string): Promise<string[]>;
}
