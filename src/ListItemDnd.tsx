import ListItem from '@mui/material/ListItem/ListItem';
import Typography from '@mui/material/Typography/Typography';
import { FC } from 'react';
import { ItemProps } from './store';
import { Draggable } from 'react-beautiful-dnd';

const ListItemDnd: FC<ItemProps> = ({ id, text, stat, index }) => (
  <Draggable key={id} draggableId={id} index={index}>
    {(provided) => (
      <ListItem
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        sx={{
          padding: '0.5rem 1rem',
          marginBottom: '.5rem',
          border: '1px solid silver',
          color: stat,
        }}
      >
        <Typography>{text}</Typography>
      </ListItem>
    )}
  </Draggable>
);

export default ListItemDnd;
