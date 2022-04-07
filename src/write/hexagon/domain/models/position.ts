import { Direction, nextDirection, prevDirection } from './direction';

export class Position {
  protected _x: number;
  protected _y: number;

  public constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public translate(position: Position): Position {
    return new Position(this._x + position.x, this._y + position.y);
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }
}

export class RoverPosition extends Position {
  private _direction: Direction;

  public constructor(x: number, y: number, direction: Direction) {
    super(x, y);
    this._direction = direction;
  }

  public rotateLeft(): RoverPosition {
    return new RoverPosition(this._x, this._y, prevDirection(this._direction));
  }

  public rotateRight(): RoverPosition {
    return new RoverPosition(this._x, this._y, nextDirection(this._direction));
  }

  public translate(position: Position): RoverPosition {
    const translation = super.translate(position);
    return new RoverPosition(translation.x, translation.y, this._direction);
  }

  public get direction() {
    return this._direction;
  }
}
