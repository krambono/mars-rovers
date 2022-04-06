import { Module } from '@nestjs/common';
import { MarsExplorationCommand } from './adapters/primary/mars-exploration-command';
import { HDDFileStorage } from './adapters/secondary/hdd-file-storage';
import { MissionReportLogger } from './adapters/secondary/mission-report-logger/mission-report-logger';
import { Logger } from './adapters/secondary/mission-report-logger/secondary-ports/logger';
import { CommonModule } from './common.module';
import { RoverPosition } from './hexagon/domain/models/position';
import { RoverFactory } from './hexagon/domain/models/rover-factory';
import { RoverCommandInterpreter } from './hexagon/domain/services/rover-command-interpreter';
import { FileStorage } from './hexagon/secondary-ports/file-storage';
import { IdGenerator } from './hexagon/secondary-ports/id-generator';
import { MissionReportHandler } from './hexagon/secondary-ports/mission-report-handler';
import { ExploreMars } from './hexagon/usecases/explore-mars';

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
