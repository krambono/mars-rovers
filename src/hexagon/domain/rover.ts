import { IdGenerator } from '../secondary-ports/id-generator';
import { Command } from './command';
import { Plateau } from './plateau';
import { RoverPosition } from './rover-position';

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
    if (command === Command.LEFT) {
      this.positions.push(this.rotateLeft());
    }

    if (command === Command.RIGHT) {
      this.positions.push(this.rotateRight());
    }

    if (command === Command.FORWARD) {
      this.positions.push(this.moveForward());
    }

    if (command === Command.BACKWARD) {
      this.positions.push(this.moveBackward());
    }
  }

  public rotateLeft(): RoverPosition {
    return { ...this.currentPosition, direction: this.currentPosition.direction.prev() };
  }

  public rotateRight(): RoverPosition {
    return { ...this.currentPosition, direction: this.currentPosition.direction.next() };
  }

  public moveForward(): RoverPosition {
    const points: Record<string, { x: number; y: number }> = {
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
    const points: Record<string, { x: number; y: number }> = {
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

  public computeNewPoint(p1: { x: number; y: number }, p2: { x: number; y: number }): { x: number; y: number } {
    return { x: p1.x + p2.x, y: p1.y + p2.y };
  }

  public get state() {
    return { id: this.id, positions: this.positions };
  }

  private get currentPosition(): RoverPosition {
    return this.positions.at(-1)!;
  }
}
