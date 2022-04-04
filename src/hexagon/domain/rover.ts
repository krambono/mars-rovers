import { IdGenerator } from '../secondary-ports/id-generator';
import { Command } from './command';
import { Plateau } from './plateau';
import { Position, RoverPosition } from './position';

export class Rover {
  private id: string;
  private plateau: Plateau;
  private positions: RoverPosition[];

  public constructor(idGenerator: IdGenerator, plateau: Plateau, initialPosition: RoverPosition) {
    this.id = idGenerator.generateId();
    this.plateau = plateau;
    this.positions = [initialPosition];
  }

  public execute(command: Command): void {
    const fns: Record<Command, () => RoverPosition> = {
      LEFT: this.rotateLeft.bind(this),
      RIGHT: this.rotateRight.bind(this),
      FORWARD: this.moveForward.bind(this),
      BACKWARD: this.moveBackward.bind(this)
    };

    this.positions.push(fns[command]());
  }

  public rotateLeft(): RoverPosition {
    return { ...this.currentPosition, direction: this.currentPosition.direction.prev() };
  }

  public rotateRight(): RoverPosition {
    return { ...this.currentPosition, direction: this.currentPosition.direction.next() };
  }

  public moveForward(): RoverPosition {
    const points: Record<string, Position> = {
      NORTH: { x: 0, y: 1 },
      EAST: { x: 1, y: 0 },
      SOUTH: { x: 0, y: -1 },
      WEST: { x: -1, y: 0 }
    };
    const point = points[this.currentPosition.direction.value];

    const newPoint = this.computeNewPoint(this.currentPosition, point);

    if (!this.plateau.isPositionValid(newPoint)) {
      return this.currentPosition;
    }
    return { ...this.currentPosition, ...newPoint };
  }

  public moveBackward(): RoverPosition {
    const points: Record<string, Position> = {
      NORTH: { x: 0, y: -1 },
      EAST: { x: -1, y: 0 },
      SOUTH: { x: 0, y: 1 },
      WEST: { x: 1, y: 0 }
    };
    const point = points[this.currentPosition.direction.value];

    const newPoint = this.computeNewPoint(this.currentPosition, point);

    if (!this.plateau.isPositionValid(newPoint)) {
      return this.currentPosition;
    }

    return { ...this.currentPosition, ...newPoint };
  }

  private get currentPosition(): RoverPosition {
    return this.positions.at(-1)!;
  }

  private computeNewPoint(p1: Position, p2: Position): Position {
    return { x: p1.x + p2.x, y: p1.y + p2.y };
  }

  public get state() {
    return { id: this.id, positions: this.positions };
  }
}
