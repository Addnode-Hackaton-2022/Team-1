export interface BoatListItemProps {
  id: string;
}

export const BoatListItem = ({ id }: BoatListItemProps) => {
  return <span>{id}</span>;
};
