import { FakeIdGenerator } from 'src/adapters/secondary/fake-id-generator';
import { Command } from '../domain/command';
import { Direction } from '../domain/direction';
import { Plateau } from '../domain/plateau';
import { RoverPosition } from '../domain/position';
import { ExplorePlateau } from './explore-plateau';

describe('Plateau exploration', () => {
  const plateau = new Plateau({ width: 6, height: 6 });
  let fakeIdGenerator: FakeIdGenerator;
  let explorePlateau: ExplorePlateau;

  beforeEach(() => {
    fakeIdGenerator = new FakeIdGenerator();
    explorePlateau = new ExplorePlateau(fakeIdGenerator);
  });

  it('should have same position and direction when not receiving any command', () => {
    const commands: Command[] = [];
    expectMissionGiveReport(commands, [new RoverPosition(0, 0, Direction.NORTH)]);
  });

  it('should rotate at left', () => {
    const commands: Command[] = [Command.LEFT];
    expectMissionGiveReport(commands, [
      new RoverPosition(0, 0, Direction.NORTH),
      new RoverPosition(0, 0, Direction.WEST)
    ]);

    expectMissionGiveReport(commands, [
      new RoverPosition(0, 0, Direction.WEST),
      new RoverPosition(0, 0, Direction.SOUTH)
    ]);

    expectMissionGiveReport(commands, [
      new RoverPosition(0, 0, Direction.SOUTH),
      new RoverPosition(0, 0, Direction.EAST)
    ]);

    expectMissionGiveReport(commands, [
      new RoverPosition(0, 0, Direction.EAST),
      new RoverPosition(0, 0, Direction.NORTH)
    ]);
  });

  it('should rotate at right', () => {
    const commands: Command[] = [Command.RIGHT];
    expectMissionGiveReport(commands, [
      new RoverPosition(0, 0, Direction.NORTH),
      new RoverPosition(0, 0, Direction.EAST)
    ]);

    expectMissionGiveReport(commands, [
      new RoverPosition(0, 0, Direction.EAST),
      new RoverPosition(0, 0, Direction.SOUTH)
    ]);

    expectMissionGiveReport(commands, [
      new RoverPosition(0, 0, Direction.SOUTH),
      new RoverPosition(0, 0, Direction.WEST)
    ]);

    expectMissionGiveReport(commands, [
      new RoverPosition(0, 0, Direction.WEST),
      new RoverPosition(0, 0, Direction.NORTH)
    ]);
  });

  it('should move forward', () => {
    const commands: Command[] = [Command.FORWARD];
    expectMissionGiveReport(commands, [
      new RoverPosition(1, 1, Direction.NORTH),
      new RoverPosition(1, 2, Direction.NORTH)
    ]);

    expectMissionGiveReport(commands, [
      new RoverPosition(1, 1, Direction.EAST),
      new RoverPosition(2, 1, Direction.EAST)
    ]);

    expectMissionGiveReport(commands, [
      new RoverPosition(1, 1, Direction.SOUTH),
      new RoverPosition(1, 0, Direction.SOUTH)
    ]);

    expectMissionGiveReport(commands, [
      new RoverPosition(1, 1, Direction.WEST),
      new RoverPosition(0, 1, Direction.WEST)
    ]);
  });

  it('should move backward', () => {
    const commands: Command[] = [Command.BACKWARD];
    expectMissionGiveReport(commands, [
      new RoverPosition(1, 1, Direction.NORTH),
      new RoverPosition(1, 0, Direction.NORTH)
    ]);
    expectMissionGiveReport(commands, [
      new RoverPosition(1, 1, Direction.EAST),
      new RoverPosition(0, 1, Direction.EAST)
    ]);
    expectMissionGiveReport(commands, [
      new RoverPosition(1, 1, Direction.SOUTH),
      new RoverPosition(1, 2, Direction.SOUTH)
    ]);
    expectMissionGiveReport(commands, [
      new RoverPosition(1, 1, Direction.WEST),
      new RoverPosition(2, 1, Direction.WEST)
    ]);
  });

  describe('Rover is at the edge of plateau', () => {
    it('should not move forward', () => {
      const commands: Command[] = [Command.FORWARD];
      expectMissionGiveReport(commands, [
        new RoverPosition(1, 5, Direction.NORTH),
        new RoverPosition(1, 5, Direction.NORTH)
      ]);

      expectMissionGiveReport(commands, [
        new RoverPosition(5, 2, Direction.EAST),
        new RoverPosition(5, 2, Direction.EAST)
      ]);

      expectMissionGiveReport(commands, [
        new RoverPosition(3, 0, Direction.SOUTH),
        new RoverPosition(3, 0, Direction.SOUTH)
      ]);

      expectMissionGiveReport(commands, [
        new RoverPosition(0, 3, Direction.WEST),
        new RoverPosition(0, 3, Direction.WEST)
      ]);
    });

    it('should not move backward', () => {
      const commands: Command[] = [Command.BACKWARD];
      expectMissionGiveReport(commands, [
        new RoverPosition(1, 5, Direction.SOUTH),
        new RoverPosition(1, 5, Direction.SOUTH)
      ]);

      expectMissionGiveReport(commands, [
        new RoverPosition(5, 2, Direction.WEST),
        new RoverPosition(5, 2, Direction.WEST)
      ]);

      expectMissionGiveReport(commands, [
        new RoverPosition(3, 0, Direction.NORTH),
        new RoverPosition(3, 0, Direction.NORTH)
      ]);

      expectMissionGiveReport(commands, [
        new RoverPosition(0, 3, Direction.EAST),
        new RoverPosition(0, 3, Direction.EAST)
      ]);
    });
  });

  it('should work work with multiple commands', () => {
    const commands: Command[] = [
      Command.RIGHT,
      Command.FORWARD,
      Command.FORWARD,
      Command.FORWARD,
      Command.FORWARD,
      Command.LEFT,
      Command.FORWARD,
      Command.FORWARD,
      Command.FORWARD,
      Command.FORWARD
    ];
    expectMissionGiveReport(commands, [
      new RoverPosition(0, 0, Direction.NORTH),
      new RoverPosition(0, 0, Direction.EAST),
      new RoverPosition(1, 0, Direction.EAST),
      new RoverPosition(2, 0, Direction.EAST),
      new RoverPosition(3, 0, Direction.EAST),
      new RoverPosition(4, 0, Direction.EAST),
      new RoverPosition(4, 0, Direction.NORTH),
      new RoverPosition(4, 1, Direction.NORTH),
      new RoverPosition(4, 2, Direction.NORTH),
      new RoverPosition(4, 3, Direction.NORTH),
      new RoverPosition(4, 4, Direction.NORTH)
    ]);
  });

  it('should work work with multiple commands', () => {
    let commands: Command[] = [Command.LEFT, Command.FORWARD, Command.FORWARD, Command.LEFT];
    expectMissionGiveReport(commands, [
      new RoverPosition(4, 4, Direction.NORTH),
      new RoverPosition(4, 4, Direction.WEST),
      new RoverPosition(3, 4, Direction.WEST),
      new RoverPosition(2, 4, Direction.WEST),
      new RoverPosition(2, 4, Direction.SOUTH)
    ]);

    commands = [
      Command.FORWARD,
      Command.FORWARD,
      Command.RIGHT,
      Command.FORWARD,
      Command.FORWARD,
      Command.RIGHT,
      Command.FORWARD,
      Command.RIGHT,
      Command.RIGHT,
      Command.BACKWARD,
      Command.LEFT,
      Command.BACKWARD,
      Command.BACKWARD
    ];
    expectMissionGiveReport(commands, [
      new RoverPosition(3, 3, Direction.EAST),
      new RoverPosition(4, 3, Direction.EAST),
      new RoverPosition(5, 3, Direction.EAST),
      new RoverPosition(5, 3, Direction.SOUTH),
      new RoverPosition(5, 2, Direction.SOUTH),
      new RoverPosition(5, 1, Direction.SOUTH),
      new RoverPosition(5, 1, Direction.WEST),
      new RoverPosition(4, 1, Direction.WEST),
      new RoverPosition(4, 1, Direction.NORTH),
      new RoverPosition(4, 1, Direction.EAST),
      new RoverPosition(3, 1, Direction.EAST),
      new RoverPosition(3, 1, Direction.NORTH),
      new RoverPosition(3, 0, Direction.NORTH),
      new RoverPosition(3, 0, Direction.NORTH)
    ]);
  });

  function expectMissionGiveReport(commands: Command[], positions: RoverPosition[]) {
    fakeIdGenerator.reset();
    const results = explorePlateau.apply(plateau, positions[0], commands);
    expect(results).toStrictEqual({
      id: '1',
      rover: { id: '2', positions }
    });
  }
});
