import { randomUUID } from 'crypto';
import { IdGenerator } from 'src/hexagon/secondary-ports/id-generator';

export class UUIDGenerator implements IdGenerator {
  public generateId(): string {
    return randomUUID();
  }
}
