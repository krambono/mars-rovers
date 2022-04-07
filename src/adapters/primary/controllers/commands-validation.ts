export class CommandsValidation {
  public static validate(arg: any): boolean {
    if (!Array.isArray(arg)) {
      return false;
    }
    if (!arg.every(el => Array.isArray(el) && el.length)) {
      return false;
    }
    const validCommands = ['RIGHT', 'LEFT', 'FORWARD', 'BACKWARD'];
    return arg.flat().every(el => validCommands.includes(el));
  }
}
