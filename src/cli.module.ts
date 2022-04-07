import { Module } from '@nestjs/common';
import { MarsExplorationCommand } from './write/adapters/primary/cli-commands/mars-exploration-command';
import { HDDFileStorage } from './write/adapters/secondary/hdd-file-storage';
import { MissionReportLogger } from './write/adapters/secondary/mission-report-logger/mission-report-logger';
import { Logger } from './write/adapters/secondary/mission-report-logger/secondary-ports/logger';
import { CommonModule } from './common.module';
import { RoverPosition } from './write/hexagon/domain/models/position';
import { RoverFactory } from './write/hexagon/domain/models/rover-factory';
import { RoverCommandInterpreter } from './write/adapters/primary/cli-commands/rover-command-interpreter';
import { FileStorage } from './write/hexagon/secondary-ports/file-storage';
import { IdGenerator } from './write/hexagon/secondary-ports/id-generator';
import { MissionReportHandler } from './write/hexagon/secondary-ports/mission-report-handler';
import { ExploreMars } from './write/hexagon/use-cases/explore-mars';

@Module({
  imports: [CommonModule],
  providers: [
    MarsExplorationCommand,
    {
      provide: ExploreMars,
      useFactory: (
        idGenerator: IdGenerator,
        missionReportHandler: MissionReportHandler,
        roverFactory: RoverFactory,
        landingPosition: RoverPosition
      ) => new ExploreMars(idGenerator, missionReportHandler, roverFactory, landingPosition),
      inject: ['ID_GENERATOR', 'MISSION_REPORT_HANDLER', 'ROVER_FACTORY', 'LANDING_POSITION']
    },
    {
      provide: RoverCommandInterpreter,
      useFactory: (fileStorage: FileStorage) => new RoverCommandInterpreter(fileStorage),
      inject: ['FILE_STORAGE']
    },
    { provide: 'FILE_STORAGE', useClass: HDDFileStorage },
    {
      provide: 'MISSION_REPORT_HANDLER',
      useFactory: (logger: Logger) => new MissionReportLogger(logger),
      inject: ['LOGGER']
    },
    { provide: 'LOGGER', useValue: console }
  ]
})
export class CliModule {}
