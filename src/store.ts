import { RefObject } from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';

export interface Item {
  id: string;
  text: string;
  stat: string;
}

export interface ItemProps {
  ref: RefObject<HTMLLIElement>;
  id: string;
  text: string;
  stat: string;
  index: number;
  handleStop: (e: DraggableEvent, data: DraggableData, index: number) => void;
}

export interface ContainerState {
  cards: Item[];
}
