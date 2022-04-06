import { FakeFileStorage } from 'src/adapters/secondary/fake-file-storage';
import { Command } from '../models/command';
import { RoverCommandInterpreter } from './rover-command-interpreter';

describe('Rover command interpreter', () => {
  let fakeFileStorage: FakeFileStorage;
  let roverCommandInterpreter: RoverCommandInterpreter;

  beforeEach(() => {
    fakeFileStorage = new FakeFileStorage();
    roverCommandInterpreter = new RoverCommandInterpreter(fakeFileStorage);
  });

  it('should raise an error if reading file failed', async () => {
    const missingFile = 'missing-file';
    await expect(roverCommandInterpreter.interpret(missingFile)).rejects.toThrow(
      `Failed to read file : ${missingFile}`
    );
  });

  it('should not return any command if file is empty', async () => {
    fakeFileStorage.setFile({ path: 'my-file', lines: [] });
    const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
    expect(commands).toStrictEqual([]);
  });

  describe('A single line', () => {
    it('should return RIGHT command if character R is present', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['R'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.RIGHT]]);
    });

    it('should return RIGHT commands if character R is present multiple times', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['RRR'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.RIGHT, Command.RIGHT, Command.RIGHT]]);
    });

    it('should return LEFT command if character L is present', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['L'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.LEFT]]);
    });

    it('should return LEFT commands if character L is present multiple times', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['LL'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.LEFT, Command.LEFT]]);
    });

    it('should return FORWARD command if character F is present', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['F'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.FORWARD]]);
    });

    it('should return FORWARD commands if character F is present multiple times', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['FFFF'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.FORWARD, Command.FORWARD, Command.FORWARD, Command.FORWARD]]);
    });

    it('should return BACKWARD command if character B is present', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['B'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.BACKWARD]]);
    });

    it('should return FORWARD commands if character F is present multiple times', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['FFFF'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.FORWARD, Command.FORWARD, Command.FORWARD, Command.FORWARD]]);
    });

    it('should work with different characters', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['LRBFFFBRRLBF'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([
        [
          Command.LEFT,
          Command.RIGHT,
          Command.BACKWARD,
          Command.FORWARD,
          Command.FORWARD,
          Command.FORWARD,
          Command.BACKWARD,
          Command.RIGHT,
          Command.RIGHT,
          Command.LEFT,
          Command.BACKWARD,
          Command.FORWARD
        ]
      ]);
    });

    it('should skip spaces and tabulations', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['   R\t R   L     F  \t'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.RIGHT, Command.RIGHT, Command.LEFT, Command.FORWARD]]);
    });

    it('should raise an error if a different is present', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['R R R A L L L'] });
      await expect(roverCommandInterpreter.interpret('my-file')).rejects.toThrow('Unknown command : A');
      fakeFileStorage.setFile({ path: 'my-file', lines: ['H L L L'] });
      await expect(roverCommandInterpreter.interpret('my-file')).rejects.toThrow('Unknown command : H');
      fakeFileStorage.setFile({ path: 'my-file', lines: ['RRRP'] });
      await expect(roverCommandInterpreter.interpret('my-file')).rejects.toThrow('Unknown command : P');
    });
  });

  describe('Multiple lines', () => {
    it('should work with multiples lines', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['FFBLRRRBLF', 'BBFFFLFRF'] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([
        [
          Command.FORWARD,
          Command.FORWARD,
          Command.BACKWARD,
          Command.LEFT,
          Command.RIGHT,
          Command.RIGHT,
          Command.RIGHT,
          Command.BACKWARD,
          Command.LEFT,
          Command.FORWARD
        ],
        [
          Command.BACKWARD,
          Command.BACKWARD,
          Command.FORWARD,
          Command.FORWARD,
          Command.FORWARD,
          Command.LEFT,
          Command.FORWARD,
          Command.RIGHT,
          Command.FORWARD
        ]
      ]);
    });

    it('should skip empty lines', async () => {
      fakeFileStorage.setFile({ path: 'my-file', lines: ['', 'R', 'L', '', 'B', ''] });
      const commands: Command[][] = await roverCommandInterpreter.interpret('my-file');
      expect(commands).toStrictEqual([[Command.RIGHT], [Command.LEFT], [Command.BACKWARD]]);
    });
  });
});
