import ListItem from '@mui/material/ListItem/ListItem';
import Typography from '@mui/material/Typography/Typography';
import { FC, useRef } from 'react';
import { DragItem, ItemProps } from './store';
import { useDrop } from 'react-dnd/dist/hooks/useDrop/useDrop';
import { useDrag } from 'react-dnd/dist/hooks/useDrag/useDrag';
import type { Identifier, XYCoord } from 'dnd-core';
import Grid from '@mui/material/Grid/Grid';
import { Button } from '@mui/material';

const ListItemDnd: FC<ItemProps> = ({ id, text, stat, index, moveItem }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'ITEM',
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

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'ITEM',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handlePointerDown = (event: React.PointerEvent) => {
    if (dragRef.current) {
      drag(dragRef.current);
    }
  };

  const opacity = isDragging ? 0 : 1;
  preview(drop(ref));

  return (
    <Grid
      container
      direction="row"
      ref={ref}
      sx={{
        width: '70%',
        color: stat,
        border: '2px solid gray',
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',

        opacity,
      }}
      data-handler-id={handlerId}
    >
      <ListItem>
        <Grid item xs={1}>
          <Button
            variant="contained"
            sx={{ cursor: 'move' }}
            ref={dragRef}
            onPointerDown={handlePointerDown}
          >
            Drag
          </Button>
        </Grid>
        <Grid item xs={11}>
          <Typography>{text}</Typography>
        </Grid>
      </ListItem>
    </Grid>
  );
};

export default ListItemDnd;
