export interface Item {
  id: string;
  text: string;
  stat: string;
}

export interface ItemProps {
  id: string;
  text: string;
  stat: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export interface ContainerState {
  cards: Item[];
}

export const ItemTypes = {
  CARD: 'card',
};

export interface DragItem {
  index: number;
}
