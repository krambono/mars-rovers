import { CommandsValidation } from './commands-validation';

describe('Commands validation', () => {
  it('should be an array', () => {
    expect(CommandsValidation.validate([])).toBeTruthy();
    expect(CommandsValidation.validate({})).toBeFalsy();
    expect(CommandsValidation.validate('')).toBeFalsy();
    expect(CommandsValidation.validate(1)).toBeFalsy();
    expect(CommandsValidation.validate(true)).toBeFalsy();
  });

  it('should only contains array', () => {
    expect(CommandsValidation.validate([['RIGHT']])).toBeTruthy();
    expect(CommandsValidation.validate([{}])).toBeFalsy();
    expect(CommandsValidation.validate([''])).toBeFalsy();
    expect(CommandsValidation.validate([1])).toBeFalsy();
    expect(CommandsValidation.validate([true])).toBeFalsy();
  });

  it('sub arrays should not be empty', () => {
    expect(CommandsValidation.validate([['RIGHT'], ['LEFT']])).toBeTruthy();
    expect(CommandsValidation.validate([[]])).toBeFalsy();
    expect(CommandsValidation.validate([['RIGHT'], [], ['LEFT']])).toBeFalsy();
    expect(CommandsValidation.validate([['RIGHT'], ['LEFT'], []])).toBeFalsy();
  });

  it('sub arrays should only contains valid command strings', () => {
    expect(CommandsValidation.validate([['RIGHT']])).toBeTruthy();
    expect(CommandsValidation.validate([['LEFT']])).toBeTruthy();
    expect(CommandsValidation.validate([['FORWARD']])).toBeTruthy();
    expect(CommandsValidation.validate([['BACKWARD']])).toBeTruthy();
    expect(CommandsValidation.validate([['RIGHT', 'LEFT'], ['BACKWARD'], ['FORWARD', 'LEFT']])).toBeTruthy();
    expect(CommandsValidation.validate([['UNKNOWN']])).toBeFalsy();
    expect(CommandsValidation.validate([['LEFT', 'FORWARD'], ['RIGHT'], ['BACKWARD', 'COMMAND']])).toBeFalsy();
  });
});
