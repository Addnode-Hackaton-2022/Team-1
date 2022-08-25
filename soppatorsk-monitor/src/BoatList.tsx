import { List } from 'antd';
import { BoatListItem } from './BoatListItem';
import { TBoat } from './utils/boatArrayMock';

export const BoatList = ({
  boats,
  onActiveBoatCallback
}: {
  boats: TBoat[];
  onActiveBoatCallback: (boatId: string) => void;
}) => (
  <List
    dataSource={boats}
    renderItem={boat => (
      <div
        className="boatListItem"
        key={boat.id}
        onClick={() => onActiveBoatCallback(boat.id)}
      >
        <BoatListItem id={boat.id} />
      </div>
    )}
  />
);
