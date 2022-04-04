import { modulo } from 'src/shared/modulo';

type Cardinal = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export class Direction {
  private currentDirectionIndex: number;

  private constructor(index: number) {
    this.currentDirectionIndex = index;
  }

  public next(): Direction {
    return new Direction(modulo(this.currentDirectionIndex + 1, 4));
  }

  public prev(): Direction {
    return new Direction(modulo(this.currentDirectionIndex - 1, 4));
  }

  public get value(): string {
    return Direction.directions[this.currentDirectionIndex];
  }

  private static directions: [Cardinal, Cardinal, Cardinal, Cardinal] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  public static NORTH = new Direction(0);
  public static EAST = new Direction(1);
  public static SOUTH = new Direction(2);
  public static WEST = new Direction(3);
}
