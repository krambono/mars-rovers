export interface MissionReport {
  id: string;
  rover: {
    id: string;
    positions: {
      x: number;
      y: number;
      direction: 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';
    }[];
  };
}
