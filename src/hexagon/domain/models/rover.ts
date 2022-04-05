import { IdGenerator } from '../../secondary-ports/id-generator';
import { Command } from './command';
import { Direction } from './direction';
import { Plateau } from './plateau';
import { Position, RoverPosition } from './position';

export interface RoverState {
  id: string;
  positions: RoverPosition[];
}

export abstract class Rover {
  protected id: string;
  protected plateau: Plateau;
  protected positions: RoverPosition[] = [];

  public constructor(idGenerator: IdGenerator, plateau: Plateau) {
    this.id = idGenerator.generateId();
    this.plateau = plateau;
  }

  public land(landingPosition: RoverPosition): void {
    this.positions.push(landingPosition);
  }

  public abstract execute(command: Command): void;

  public get state(): RoverState {
    return { id: this.id, positions: this.positions };
  }

  protected get currentPosition(): RoverPosition {
    return this.positions.at(-1)!;
  }
}

export class CuriosityRover extends Rover {
  public execute(command: Command): void {
    const commandHandlerMapping: Record<Command, () => RoverPosition> = {
      LEFT: this.rotateLeft.bind(this),
      RIGHT: this.rotateRight.bind(this),
      FORWARD: this.moveForward.bind(this),
      BACKWARD: this.moveBackward.bind(this)
    };
    const newPosition = commandHandlerMapping[command]();
    this.positions.push(newPosition);
  }

  private rotateLeft(): RoverPosition {
    return this.currentPosition.rotateLeft();
  }

  private rotateRight(): RoverPosition {
    return this.currentPosition.rotateRight();
  }

  private moveForward(): RoverPosition {
    const translations: Record<Direction, Position> = {
      NORTH: new Position(0, 1),
      EAST: new Position(1, 0),
      SOUTH: new Position(0, -1),
      WEST: new Position(-1, 0)
    };
    return this.move(translations);
  }

  private moveBackward(): RoverPosition {
    const translations: Record<Direction, Position> = {
      NORTH: new Position(0, -1),
      EAST: new Position(-1, 0),
      SOUTH: new Position(0, 1),
      WEST: new Position(1, 0)
    };
    return this.move(translations);
  }

  private move(translations: Record<Direction, Position>): RoverPosition {
    const translation = translations[this.currentPosition.direction];
    const newPosition = this.currentPosition.translate(translation);

    if (this.plateau.isPositionValid(newPosition)) {
      return newPosition;
    }
    return this.currentPosition;
  }
}
