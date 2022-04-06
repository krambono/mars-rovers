import { FakeIdGenerator } from 'src/adapters/secondary/fake-id-generator';
import { FakeMissionReportHandler } from 'src/adapters/secondary/fake-mission-report-handler';
import { Command } from '../domain/models/command';
import { Direction } from '../domain/models/direction';
import { Plateau } from '../domain/models/plateau';
import { RoverPosition } from '../domain/models/position';
import { ExploreMars } from './explore-mars';

describe('Mars exploration', () => {
  const plateau = new Plateau({ width: 6, height: 6 });
  let fakeIdGenerator: FakeIdGenerator;
  let fakeMissionReportHandler: FakeMissionReportHandler;
  let exploreMars: ExploreMars;

  beforeEach(() => {
    fakeIdGenerator = new FakeIdGenerator();
    fakeMissionReportHandler = new FakeMissionReportHandler();
    exploreMars = new ExploreMars(fakeIdGenerator, fakeMissionReportHandler);
  });

  it('should have same position and direction when not receiving any command', async () => {
    const commands: Command[][] = [];
    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.NORTH), []);
  });

  it('should rotate at left', async () => {
    const commands: Command[][] = [[Command.LEFT]];
    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.NORTH), [
      [new RoverPosition(0, 0, Direction.WEST)]
    ]);

    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.WEST), [
      [new RoverPosition(0, 0, Direction.SOUTH)]
    ]);

    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.SOUTH), [
      [new RoverPosition(0, 0, Direction.EAST)]
    ]);

    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.EAST), [
      [new RoverPosition(0, 0, Direction.NORTH)]
    ]);
  });

  it('should rotate at right', async () => {
    const commands: Command[][] = [[Command.RIGHT]];
    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.NORTH), [
      [new RoverPosition(0, 0, Direction.EAST)]
    ]);

    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.EAST), [
      [new RoverPosition(0, 0, Direction.SOUTH)]
    ]);

    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.SOUTH), [
      [new RoverPosition(0, 0, Direction.WEST)]
    ]);

    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.WEST), [
      [new RoverPosition(0, 0, Direction.NORTH)]
    ]);
  });

  it('should move forward', async () => {
    const commands: Command[][] = [[Command.FORWARD]];
    await expectMissionGiveReport(commands, new RoverPosition(1, 1, Direction.NORTH), [
      [new RoverPosition(1, 2, Direction.NORTH)]
    ]);

    await expectMissionGiveReport(commands, new RoverPosition(1, 1, Direction.EAST), [
      [new RoverPosition(2, 1, Direction.EAST)]
    ]);

    await expectMissionGiveReport(commands, new RoverPosition(1, 1, Direction.SOUTH), [
      [new RoverPosition(1, 0, Direction.SOUTH)]
    ]);

    await expectMissionGiveReport(commands, new RoverPosition(1, 1, Direction.WEST), [
      [new RoverPosition(0, 1, Direction.WEST)]
    ]);
  });

  it('should move backward', async () => {
    const commands: Command[][] = [[Command.BACKWARD]];
    await expectMissionGiveReport(commands, new RoverPosition(1, 1, Direction.NORTH), [
      [new RoverPosition(1, 0, Direction.NORTH)]
    ]);
    await expectMissionGiveReport(commands, new RoverPosition(1, 1, Direction.EAST), [
      [new RoverPosition(0, 1, Direction.EAST)]
    ]);
    await expectMissionGiveReport(commands, new RoverPosition(1, 1, Direction.SOUTH), [
      [new RoverPosition(1, 2, Direction.SOUTH)]
    ]);
    await expectMissionGiveReport(commands, new RoverPosition(1, 1, Direction.WEST), [
      [new RoverPosition(2, 1, Direction.WEST)]
    ]);
  });

  describe('Rover is at the edge of plateau', () => {
    it('should not move forward', async () => {
      const commands: Command[][] = [[Command.FORWARD]];
      await expectMissionGiveReport(commands, new RoverPosition(1, 5, Direction.NORTH), [
        [new RoverPosition(1, 5, Direction.NORTH)]
      ]);

      await expectMissionGiveReport(commands, new RoverPosition(5, 2, Direction.EAST), [
        [new RoverPosition(5, 2, Direction.EAST)]
      ]);

      await expectMissionGiveReport(commands, new RoverPosition(3, 0, Direction.SOUTH), [
        [new RoverPosition(3, 0, Direction.SOUTH)]
      ]);

      await expectMissionGiveReport(commands, new RoverPosition(0, 3, Direction.WEST), [
        [new RoverPosition(0, 3, Direction.WEST)]
      ]);
    });

    it('should not move backward', async () => {
      const commands: Command[][] = [[Command.BACKWARD]];
      await expectMissionGiveReport(commands, new RoverPosition(1, 5, Direction.SOUTH), [
        [new RoverPosition(1, 5, Direction.SOUTH)]
      ]);

      await expectMissionGiveReport(commands, new RoverPosition(5, 2, Direction.WEST), [
        [new RoverPosition(5, 2, Direction.WEST)]
      ]);

      await expectMissionGiveReport(commands, new RoverPosition(3, 0, Direction.NORTH), [
        [new RoverPosition(3, 0, Direction.NORTH)]
      ]);

      await expectMissionGiveReport(commands, new RoverPosition(0, 3, Direction.EAST), [
        [new RoverPosition(0, 3, Direction.EAST)]
      ]);
    });
  });

  it('should work work with multiple commands', async () => {
    const commands: Command[][] = [
      [
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
      ]
    ];
    await expectMissionGiveReport(commands, new RoverPosition(0, 0, Direction.NORTH), [
      [
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
      ]
    ]);
  });

  it('should work work with multiple commands', async () => {
    let commands: Command[][] = [[Command.LEFT, Command.FORWARD, Command.FORWARD, Command.LEFT]];
    await expectMissionGiveReport(commands, new RoverPosition(4, 4, Direction.NORTH), [
      [
        new RoverPosition(4, 4, Direction.WEST),
        new RoverPosition(3, 4, Direction.WEST),
        new RoverPosition(2, 4, Direction.WEST),
        new RoverPosition(2, 4, Direction.SOUTH)
      ]
    ]);

    commands = [
      [
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
      ]
    ];
    await expectMissionGiveReport(commands, new RoverPosition(3, 3, Direction.EAST), [
      [
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
      ]
    ]);
  });

  it('should work work with multiple commands sets', async () => {
    const commands: Command[][] = [
      [Command.FORWARD, Command.FORWARD, Command.RIGHT, Command.FORWARD, Command.FORWARD, Command.RIGHT],
      [
        Command.FORWARD,
        Command.RIGHT,
        Command.RIGHT,
        Command.BACKWARD,
        Command.LEFT,
        Command.BACKWARD,
        Command.BACKWARD
      ]
    ];
    await expectMissionGiveReport(commands, new RoverPosition(3, 3, Direction.EAST), [
      [
        new RoverPosition(4, 3, Direction.EAST),
        new RoverPosition(5, 3, Direction.EAST),
        new RoverPosition(5, 3, Direction.SOUTH),
        new RoverPosition(5, 2, Direction.SOUTH),
        new RoverPosition(5, 1, Direction.SOUTH),
        new RoverPosition(5, 1, Direction.WEST)
      ],
      [
        new RoverPosition(4, 1, Direction.WEST),
        new RoverPosition(4, 1, Direction.NORTH),
        new RoverPosition(4, 1, Direction.EAST),
        new RoverPosition(3, 1, Direction.EAST),
        new RoverPosition(3, 1, Direction.NORTH),
        new RoverPosition(3, 0, Direction.NORTH),
        new RoverPosition(3, 0, Direction.NORTH)
      ]
    ]);
  });

  async function expectMissionGiveReport(
    commandSets: Command[][],
    landingPosition: RoverPosition,
    positions: RoverPosition[][]
  ) {
    fakeIdGenerator.reset();
    await exploreMars.apply(plateau, landingPosition, commandSets);
    const results = fakeMissionReportHandler.getReport();
    expect(results).toStrictEqual({
      id: '1',
      rover: { id: '2', landingPosition, positions }
    });
  }
});
