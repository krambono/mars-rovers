import { Module } from '@nestjs/common';
import { MarsExplorationController } from './adapters/primary/controllers/mars-exploration-controller';
import { inMemoryMissionReportRepository } from './adapters/secondary/mission-report-storage/adapters/in-memory-mission-report-repository';
import { MissionReportStorage } from './adapters/secondary/mission-report-storage/mission-report-storage';
import { MissionReportRepository } from './adapters/secondary/mission-report-storage/secondary-ports/mission-report-repository';
import { CommonModule } from './common.module';
import { RoverPosition } from './hexagon/domain/models/position';
import { RoverFactory } from './hexagon/domain/models/rover-factory';
import { IdGenerator } from './hexagon/secondary-ports/id-generator';
import { MissionReportHandler } from './hexagon/secondary-ports/mission-report-handler';
import { ExploreMars } from './hexagon/usecases/explore-mars';

@Module({
  imports: [CommonModule],
  controllers: [MarsExplorationController],
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
      useClass: inMemoryMissionReportRepository
    }
  ]
})
export class ApiModule {}
