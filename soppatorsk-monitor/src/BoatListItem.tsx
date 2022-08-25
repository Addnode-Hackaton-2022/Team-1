import { Badge, Space } from 'antd';
import { BoatAttributeTypes, TBoat } from './utils/boatArrayMock';

export interface BoatListItemProps {
  boat: TBoat;
}

export const BoatListItem = ({ boat }: BoatListItemProps) => {
  const tankLevel = boat.boatAttributes.find(
    x => x.type === BoatAttributeTypes.TankLevel
  );
  const alarmLevel = boat.boatAttributes.find(
    x => x.type === BoatAttributeTypes.AlarmLevel
  );

  const isFuelLower =
    tankLevel &&
    alarmLevel &&
    parseInt(tankLevel.value) < parseInt(alarmLevel.value);

  return (
    <Space>
      <span>{boat.id}</span>
      {isFuelLower && <Badge color="red" />}
    </Space>
  );
};
