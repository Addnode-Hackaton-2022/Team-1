export type TBoatAttributes = {
  type: number;
  value: string;
  timestamp: string;
};

export const BoatAttributeTypes = {
  TankLevel: 0,
  AlarmLevel: 1,
  Reserved: 2
};

export type TBoat = {
  id: string;
  timestamp: string;
  boatAttributes: TBoatAttributes[];
};

export const boatArray: TBoat[] = [
  {
    id: 'Kalles båt',
    timestamp: new Date(Date.now()).toISOString(),
    boatAttributes: [
      {
        type: BoatAttributeTypes.TankLevel,
        value: '54',
        timestamp: '2022-08-24T13:24:00.000Z'
      },
      {
        type: BoatAttributeTypes.AlarmLevel,
        value: '30',
        timestamp: '2022-08-24T13:24:00.000Z'
      }
    ]
  },
  {
    id: 'Svens båt',
    timestamp: '2022-08-24T13:24:00.000Z',
    boatAttributes: [
      {
        type: BoatAttributeTypes.TankLevel,
        value: '78',
        timestamp: '2022-08-24T13:24:00.000Z'
      },
      {
        type: BoatAttributeTypes.AlarmLevel,
        value: '24',
        timestamp: '2022-08-24T13:24:00.000Z'
      }
    ]
  },
  {
    id: 'Nils båt',
    timestamp: '2022-08-24T13:24:00.000Z',
    boatAttributes: [
      {
        type: BoatAttributeTypes.TankLevel,
        value: '90',
        timestamp: '2022-08-24T13:24:00.000Z'
      },
      {
        type: BoatAttributeTypes.AlarmLevel,
        value: '45',
        timestamp: '2022-08-24T13:24:00.000Z'
      }
    ]
  }
];
