import { Module } from '@nestjs/common';
import { MarsExplorationController } from './adapters/primary/controllers/mars-exploration-controller';
import { MissionReportController } from './adapters/primary/controllers/read/mission-reports.controller';
import { InMemoryMissionReportRepository } from './adapters/secondary/mission-report-storage/adapters/in-memory-mission-report-repository';
import { MissionReportStorage } from './adapters/secondary/mission-report-storage/mission-report-storage';
import { MissionReportRepository } from './adapters/secondary/mission-report-storage/secondary-ports/mission-report-repository';
import { InMemoryMissionReportQuery } from './adapters/secondary/read/in-memory-mission-report-query';
import { CommonModule } from './common.module';
import { RoverPosition } from './hexagon/domain/models/position';
import { RoverFactory } from './hexagon/domain/models/rover-factory';
import { IdGenerator } from './hexagon/secondary-ports/id-generator';
import { MissionReportHandler } from './hexagon/secondary-ports/mission-report-handler';
import { MissionReportQuery } from './hexagon/secondary-ports/read/mission-report-query';
import { ExploreMars } from './hexagon/usecases/explore-mars';
import { RetrieveMissionReports } from './hexagon/usecases/retrieve-mission-reports';

@Module({
  imports: [CommonModule],
  controllers: [
    MarsExplorationController,
    //
    MissionReportController
  ],
  providers: [
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
      provide: 'MISSION_REPORT_HANDLER',
      useFactory: (missionReportRepository: MissionReportRepository) =>
        new MissionReportStorage(missionReportRepository),
      inject: ['MISSION_REPORT_REPOSITORY']
    },
    {
      provide: 'MISSION_REPORT_REPOSITORY',
      useClass: InMemoryMissionReportRepository
    },

    //

    {
      provide: RetrieveMissionReports,
      useFactory: (missionReportQuery: MissionReportQuery) => new RetrieveMissionReports(missionReportQuery),
      inject: ['MISSION_REPORT_QUERY']
    },
    {
      provide: 'MISSION_REPORT_QUERY',
      useFactory: (inMemoryMissionReportRepository: InMemoryMissionReportRepository) =>
        new InMemoryMissionReportQuery(inMemoryMissionReportRepository),
      inject: ['MISSION_REPORT_REPOSITORY']
    }
  ]
})
export class ApiModule {}
