import { Module } from '@nestjs/common';
import { MarsExplorationController } from './write/adapters/primary/controllers/mars-exploration-controller';
import { MissionReportController } from './read/adapters/primary/mission-reports.controller';
import { InMemoryMissionReportRepository } from './write/adapters/secondary/mission-report-storage/adapters/in-memory-mission-report-repository';
import { MissionReportStorage } from './write/adapters/secondary/mission-report-storage/mission-report-storage';
import { MissionReportRepository } from './write/adapters/secondary/mission-report-storage/secondary-ports/mission-report-repository';
import { CommonModule } from './common.module';
import { RoverPosition } from './write/hexagon/domain/models/position';
import { RoverFactory } from './write/hexagon/domain/models/rover-factory';
import { IdGenerator } from './write/hexagon/secondary-ports/id-generator';
import { MissionReportHandler } from './write/hexagon/secondary-ports/mission-report-handler';
import { MissionReportQuery } from './read/hexagon/secondary-ports/mission-report-query';
import { ExploreMars } from './write/hexagon/use-cases/explore-mars';
import { RetrieveMissionReports } from './read/hexagon/use-cases/retrieve-mission-reports';
import { InMemoryMissionReportQuery } from './read/adapters/secondary/in-memory-mission-report-query';

@Module({
  imports: [CommonModule],
  controllers: [MarsExplorationController, MissionReportController],
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
