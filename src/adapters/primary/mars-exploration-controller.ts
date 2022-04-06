import { Body, Controller, Post } from '@nestjs/common';
import { Command } from 'src/hexagon/domain/models/command';
import { ExploreMars } from 'src/hexagon/usecases/explore-mars';

@Controller('mars-exploration')
export class MarsExplorationController {
  public constructor(private exploreMars: ExploreMars) {}

  @Post()
  public async explore(@Body('commands') commands: Command[][]): Promise<void> {
    await this.exploreMars.apply(commands);
  }
}
