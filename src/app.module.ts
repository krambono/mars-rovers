import { Module } from '@nestjs/common';
import { HDDFileStorage } from './adapters/secondary/hdd-file-storage';
import { UUIDGenerator } from './adapters/secondary/uuid-generator';
import { ExploreMars } from './hexagon/usecases/explore-mars';
import { RoverCommandInterpreter } from './hexagon/domain/services/rover-command-interpreter';
import { FileStorage } from './hexagon/secondary-ports/file-storage';
import { IdGenerator } from './hexagon/secondary-ports/id-generator';
import { MissionReportHandler } from './hexagon/secondary-ports/mission-report-handler';
import { Logger } from './adapters/secondary/mission-report-logger/secondary-ports/logger';
import { MissionReportLogger } from './adapters/secondary/mission-report-logger/mission-report-logger';
import { CLI } from './adapters/primary/cli';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: CLI,
      useFactory: (exploreMars: ExploreMars, roverCommandInterpreter: RoverCommandInterpreter) =>
        new CLI(exploreMars, roverCommandInterpreter),
      inject: [ExploreMars, RoverCommandInterpreter]
    },
    {
      provide: ExploreMars,
      useFactory: (idGenerator: IdGenerator, missionReportHandler: MissionReportHandler) =>
        new ExploreMars(idGenerator, missionReportHandler),
      inject: ['ID_GENERATOR', 'MISSION_REPORT_HANDLER']
    },
    {
      provide: RoverCommandInterpreter,
      useFactory: (fileStorage: FileStorage) => new RoverCommandInterpreter(fileStorage),
      inject: ['FILE_STORAGE']
    },
    { provide: 'ID_GENERATOR', useClass: UUIDGenerator },
    { provide: 'FILE_STORAGE', useClass: HDDFileStorage },
    {
      provide: 'MISSION_REPORT_HANDLER',
      useFactory: (logger: Logger) => new MissionReportLogger(logger),
      inject: ['CUSTOM_LOGGER']
    },
    { provide: 'CUSTOM_LOGGER', useValue: console }
  ]
})
export class AppModule {}
