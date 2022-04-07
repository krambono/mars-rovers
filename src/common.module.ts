import { Module } from '@nestjs/common';
import { UUIDGenerator } from './write/adapters/secondary/uuid-generator';
import { Direction } from './write/hexagon/domain/models/direction';
import { Plateau } from './write/hexagon/domain/models/plateau';
import { RoverPosition } from './write/hexagon/domain/models/position';
import { CuriosityRoverFactory } from './write/hexagon/domain/models/rover-factory';
import { IdGenerator } from './write/hexagon/secondary-ports/id-generator';

@Module({
  providers: [
    { provide: 'ID_GENERATOR', useClass: UUIDGenerator },
    {
      provide: 'ROVER_FACTORY',
      useFactory: (idGenerator: IdGenerator, plateau: Plateau) => new CuriosityRoverFactory(idGenerator, plateau),
      inject: ['ID_GENERATOR', 'PLATEAU']
    },
    {
      provide: 'PLATEAU',
      useValue: new Plateau({ width: 5, height: 5 })
    },
    {
      provide: 'LANDING_POSITION',
      useValue: new RoverPosition(0, 0, Direction.NORTH)
    }
  ],
  exports: ['ID_GENERATOR', 'ROVER_FACTORY', 'LANDING_POSITION']
})
export class CommonModule {}
