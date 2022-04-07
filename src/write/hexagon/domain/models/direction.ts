import { modulo } from 'src/shared/modulo';

export enum Direction {
  'NORTH' = 'NORTH',
  'EAST' = 'EAST',
  'SOUTH' = 'SOUTH',
  'WEST' = 'WEST'
}

const directions: [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST] = [
  Direction.NORTH,
  Direction.EAST,
  Direction.SOUTH,
  Direction.WEST
];

export function nextDirection(direction: Direction): Direction {
  const index = directions.indexOf(direction);
  return directions[modulo(index + 1, 4)];
}

export function prevDirection(direction: Direction): Direction {
  const index = directions.indexOf(direction);
  return directions[modulo(index - 1, 4)];
}
