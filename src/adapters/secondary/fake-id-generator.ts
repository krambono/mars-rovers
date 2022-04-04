import { IdGenerator } from 'src/hexagon/secondary-ports/id-generator';

export class FakeIdGenerator implements IdGenerator {
  private _id: string = 'fake_id';

  public generateId(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }
}
