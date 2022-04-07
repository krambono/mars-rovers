import { randomUUID } from 'crypto';
import { IdGenerator } from 'src/write/hexagon/secondary-ports/id-generator';

export class UUIDGenerator implements IdGenerator {
  public generateId(): string {
    return randomUUID();
  }
}
