import { Direction } from './direction';

export interface Position {
  x: number;
  y: number;
}

export interface RoverPosition extends Position {
  direction: Direction;
}
