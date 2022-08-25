import { List } from 'antd';
import { BoatListItem } from './BoatListItem';
import { useFetchAllBoats } from './utils/api';

export const BoatList = ({
  onActiveBoatCallback
}: {
  onActiveBoatCallback: (boatId: string) => void;
}) => {
  const boatsQuery = useFetchAllBoats();
  if (!boatsQuery.data) return <div>Loading...</div>;

  if (boatsQuery.isLoading) return <div>Loading...</div>;

  return (
    <List
      dataSource={boatsQuery.data}
      renderItem={boat => (
        <div
          className="boatListItem"
          key={boat.id}
          onClick={() => onActiveBoatCallback(boat.id)}
        >
          <BoatListItem boat={boat} />
        </div>
      )}
    />
  );
};
