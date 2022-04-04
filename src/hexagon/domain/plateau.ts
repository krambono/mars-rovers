import { Position } from './position';

interface Size {
  width: number;
  height: number;
}

export class Plateau {
  public constructor(private size: Size) {}

  public isPositionValid({ x, y }: Position): boolean {
    return x >= 0 && x < this.size.width && y >= 0 && y < this.size.height;
  }
}
