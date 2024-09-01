import ListItem from '@mui/material/ListItem/ListItem';
import Typography from '@mui/material/Typography/Typography';
import { FC, useRef } from 'react';
import { DragItem, ItemProps, ItemTypes } from './store';
import { useDrop } from 'react-dnd/dist/hooks/useDrop/useDrop';
import { useDrag } from 'react-dnd/dist/hooks/useDrag/useDrag';
import type { Identifier, XYCoord } from 'dnd-core';

const ListItemDnd: FC<ItemProps> = ({ id, text, stat, index, moveItem }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        width: '50%',
        color: stat,
        border: '2px solid gray',
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
        opacity,
      }}
      data-handler-id={handlerId}
    >
      <ListItem>
        <Typography>{text}</Typography>
      </ListItem>
    </div>
  );
};

export default ListItemDnd;
