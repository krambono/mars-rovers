import { Body, Controller, Post, UnprocessableEntityException } from '@nestjs/common';
import { Command } from 'src/hexagon/domain/models/command';
import { ExploreMars } from 'src/hexagon/usecases/explore-mars';
import { CommandsValidation } from './commands-validation';

@Controller('mars-exploration')
export class MarsExplorationController {
  public constructor(private exploreMars: ExploreMars) {}

  @Post()
  public async explore(@Body('commands') commands: Command[][]): Promise<void> {
    if (!CommandsValidation.validate(commands)) {
      throw new UnprocessableEntityException('Commands are malformatted');
    }
    await this.exploreMars.apply(commands);
  }
}
