import { FakeIdGenerator } from 'src/adapters/secondary/fake-id-generator';
import { Command } from '../domain/command';
import { Direction } from '../domain/direction';
import { MarsMission } from '../domain/mars-mission';
import { Plateau } from '../domain/plateau';
import { RoverPosition } from '../domain/position';

describe('Plateau exploration', () => {
  let fakeIdGenerator: FakeIdGenerator;
  let plateau: Plateau;
  let mission: MarsMission;

  beforeEach(() => {
    fakeIdGenerator = new FakeIdGenerator();
    plateau = new Plateau({ width: 6, height: 6 });
    mission = new MarsMission(fakeIdGenerator, plateau);
  });

  it('should have same position and direction when not receiving any command', () => {
    const commands: Command[] = [];
    expectMissionGiveTheRightPositions(commands, [{ x: 0, y: 0, direction: Direction.NORTH }]);
  });

  it('should rotate at left', () => {
    const commands: Command[] = [Command.LEFT];
    expectMissionGiveTheRightPositions(commands, [
      { x: 0, y: 0, direction: Direction.NORTH },
      { x: 0, y: 0, direction: Direction.WEST }
    ]);

    expectMissionGiveTheRightPositions(commands, [
      { x: 0, y: 0, direction: Direction.WEST },
      { x: 0, y: 0, direction: Direction.SOUTH }
    ]);

    expectMissionGiveTheRightPositions(commands, [
      { x: 0, y: 0, direction: Direction.SOUTH },
      { x: 0, y: 0, direction: Direction.EAST }
    ]);

    expectMissionGiveTheRightPositions(commands, [
      { x: 0, y: 0, direction: Direction.EAST },
      { x: 0, y: 0, direction: Direction.NORTH }
    ]);
  });

  it('should rotate at right', () => {
    const commands: Command[] = [Command.RIGHT];
    expectMissionGiveTheRightPositions(commands, [
      { x: 0, y: 0, direction: Direction.NORTH },
      { x: 0, y: 0, direction: Direction.EAST }
    ]);

    expectMissionGiveTheRightPositions(commands, [
      { x: 0, y: 0, direction: Direction.EAST },
      { x: 0, y: 0, direction: Direction.SOUTH }
    ]);

    expectMissionGiveTheRightPositions(commands, [
      { x: 0, y: 0, direction: Direction.SOUTH },
      { x: 0, y: 0, direction: Direction.WEST }
    ]);

    expectMissionGiveTheRightPositions(commands, [
      { x: 0, y: 0, direction: Direction.WEST },
      { x: 0, y: 0, direction: Direction.NORTH }
    ]);
  });

  it('should move forward', () => {
    const commands: Command[] = [Command.FORWARD];
    expectMissionGiveTheRightPositions(commands, [
      { x: 1, y: 1, direction: Direction.NORTH },
      { x: 1, y: 2, direction: Direction.NORTH }
    ]);

    expectMissionGiveTheRightPositions(commands, [
      { x: 1, y: 1, direction: Direction.EAST },
      { x: 2, y: 1, direction: Direction.EAST }
    ]);

    expectMissionGiveTheRightPositions(commands, [
      { x: 1, y: 1, direction: Direction.SOUTH },
      { x: 1, y: 0, direction: Direction.SOUTH }
    ]);

    expectMissionGiveTheRightPositions(commands, [
      { x: 1, y: 1, direction: Direction.WEST },
      { x: 0, y: 1, direction: Direction.WEST }
    ]);
  });

  it('should move backward', () => {
    const commands: Command[] = [Command.BACKWARD];
    expectMissionGiveTheRightPositions(commands, [
      { x: 1, y: 1, direction: Direction.NORTH },
      { x: 1, y: 0, direction: Direction.NORTH }
    ]);
    expectMissionGiveTheRightPositions(commands, [
      { x: 1, y: 1, direction: Direction.EAST },
      { x: 0, y: 1, direction: Direction.EAST }
    ]);
    expectMissionGiveTheRightPositions(commands, [
      { x: 1, y: 1, direction: Direction.SOUTH },
      { x: 1, y: 2, direction: Direction.SOUTH }
    ]);
    expectMissionGiveTheRightPositions(commands, [
      { x: 1, y: 1, direction: Direction.WEST },
      { x: 2, y: 1, direction: Direction.WEST }
    ]);
  });

  describe('Rover is at the edge of plateau', () => {
    it('should not move forward', () => {
      const commands: Command[] = [Command.FORWARD];
      expectMissionGiveTheRightPositions(commands, [
        { x: 1, y: 5, direction: Direction.NORTH },
        { x: 1, y: 5, direction: Direction.NORTH }
      ]);

      expectMissionGiveTheRightPositions(commands, [
        { x: 5, y: 2, direction: Direction.EAST },
        { x: 5, y: 2, direction: Direction.EAST }
      ]);

      expectMissionGiveTheRightPositions(commands, [
        { x: 3, y: 0, direction: Direction.SOUTH },
        { x: 3, y: 0, direction: Direction.SOUTH }
      ]);

      expectMissionGiveTheRightPositions(commands, [
        { x: 0, y: 3, direction: Direction.WEST },
        { x: 0, y: 3, direction: Direction.WEST }
      ]);
    });

    it('should not move backward', () => {
      const commands: Command[] = [Command.BACKWARD];
      expectMissionGiveTheRightPositions(commands, [
        { x: 1, y: 5, direction: Direction.SOUTH },
        { x: 1, y: 5, direction: Direction.SOUTH }
      ]);

      expectMissionGiveTheRightPositions(commands, [
        { x: 5, y: 2, direction: Direction.WEST },
        { x: 5, y: 2, direction: Direction.WEST }
      ]);

      expectMissionGiveTheRightPositions(commands, [
        { x: 3, y: 0, direction: Direction.NORTH },
        { x: 3, y: 0, direction: Direction.NORTH }
      ]);

      expectMissionGiveTheRightPositions(commands, [
        { x: 0, y: 3, direction: Direction.EAST },
        { x: 0, y: 3, direction: Direction.EAST }
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
    expectMissionGiveTheRightPositions(commands, [
      { x: 0, y: 0, direction: Direction.NORTH },
      { x: 0, y: 0, direction: Direction.EAST },
      { x: 1, y: 0, direction: Direction.EAST },
      { x: 2, y: 0, direction: Direction.EAST },
      { x: 3, y: 0, direction: Direction.EAST },
      { x: 4, y: 0, direction: Direction.EAST },
      { x: 4, y: 0, direction: Direction.NORTH },
      { x: 4, y: 1, direction: Direction.NORTH },
      { x: 4, y: 2, direction: Direction.NORTH },
      { x: 4, y: 3, direction: Direction.NORTH },
      { x: 4, y: 4, direction: Direction.NORTH }
    ]);
  });

  it('should work work with multiple commands', () => {
    let commands: Command[] = [Command.LEFT, Command.FORWARD, Command.FORWARD, Command.LEFT];
    expectMissionGiveTheRightPositions(commands, [
      { x: 4, y: 4, direction: Direction.NORTH },
      { x: 4, y: 4, direction: Direction.WEST },
      { x: 3, y: 4, direction: Direction.WEST },
      { x: 2, y: 4, direction: Direction.WEST },
      { x: 2, y: 4, direction: Direction.SOUTH }
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
    expectMissionGiveTheRightPositions(commands, [
      { x: 3, y: 3, direction: Direction.EAST },
      { x: 4, y: 3, direction: Direction.EAST },
      { x: 5, y: 3, direction: Direction.EAST },
      { x: 5, y: 3, direction: Direction.SOUTH },
      { x: 5, y: 2, direction: Direction.SOUTH },
      { x: 5, y: 1, direction: Direction.SOUTH },
      { x: 5, y: 1, direction: Direction.WEST },
      { x: 4, y: 1, direction: Direction.WEST },
      { x: 4, y: 1, direction: Direction.NORTH },
      { x: 4, y: 1, direction: Direction.EAST },
      { x: 3, y: 1, direction: Direction.EAST },
      { x: 3, y: 1, direction: Direction.NORTH },
      { x: 3, y: 0, direction: Direction.NORTH },
      { x: 3, y: 0, direction: Direction.NORTH }
    ]);
  });

  function addRoverToMission(position: RoverPosition) {
    fakeIdGenerator.id = '3036d6dd-ee39-4098-acda-f8f4bd9ccede';
    mission.addRover(position);
  }

  function expectMissionGiveTheRightPositions(commands: Command[], positions: RoverPosition[]) {
    addRoverToMission(positions[0]);
    const results = mission.startMission(commands);
    expect(results).toStrictEqual({ id: '3036d6dd-ee39-4098-acda-f8f4bd9ccede', positions: positions });
  }
});
