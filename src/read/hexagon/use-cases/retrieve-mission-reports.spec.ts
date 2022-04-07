import { FakeMissionReportQuery } from 'src/read/adapters/secondary/fake-mission-report-query';
import { MissionReport } from '../models/mission-report';
import { RetrieveMissionReports } from './retrieve-mission-reports';

describe('Mission reports retrieval', () => {
  let fakeMissionReportQuery: FakeMissionReportQuery;
  let retrieveMissionReports: RetrieveMissionReports;

  beforeEach(() => {
    fakeMissionReportQuery = new FakeMissionReportQuery();
    retrieveMissionReports = new RetrieveMissionReports(fakeMissionReportQuery);
  });

  it('should not retrieve any reports if none has been done', async () => {
    const results = await retrieveMissionReports.run();
    expect(results).toStrictEqual([]);
  });

  it('should retrieve mission reports', async () => {
    const reports: MissionReport[] = [
      {
        id: '59df0468-b357-4081-991d-d1f36331f8c2',
        rover: {
          id: '4a8d66d0-e5ca-4ab5-93f1-d3831d9d112d',
          positions: [
            { x: 0, y: 0, direction: 'NORTH' },
            { x: 0, y: 1, direction: 'NORTH' }
          ]
        }
      },
      {
        id: 'fe5d8773-f1ec-42c6-9843-a78ddd3bc8e1',
        rover: {
          id: '9629582c-0969-417f-8c34-8de767bcf864',
          positions: [
            { x: 0, y: 0, direction: 'NORTH' },
            { x: 0, y: 0, direction: 'EAST' }
          ]
        }
      }
    ];

    fakeMissionReportQuery.setReports(reports);
    const results = await retrieveMissionReports.run();
    expect(results).toStrictEqual(reports);
  });
});
