import { IdGenerator } from 'src/hexagon/secondary-ports/id-generator';

export class FakeIdGenerator implements IdGenerator {
  private _id: number = 1;

  public generateId(): string {
    return (this._id++).toString();
  }

  public reset() {
    this._id = 1;
  }
}
