import { Module } from '@nestjs/common';
import { HDDFileStorage } from './adapters/secondary/hdd-file-storage';
import { UUIDGenerator } from './adapters/secondary/uuid-generator';
import { RoverCommandInterpreter } from './hexagon/domain/services/rover-command-interpreter';
import { FileStorage } from './hexagon/secondary-ports/file-storage';
import { IdGenerator } from './hexagon/secondary-ports/id-generator';
import { MissionReportHandler } from './hexagon/secondary-ports/mission-report-handler';
import { ExploreMars } from './hexagon/usecases/explore-mars';

@Module({
  imports: [],
  controllers: [],
  providers: [
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
      useFactory: () => null,
      inject: []
    }
  ]
})
export class ApiModule {}
