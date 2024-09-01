import ListItem from '@mui/material/ListItem/ListItem';
import Typography from '@mui/material/Typography/Typography';
import { FC } from 'react';
import { ItemProps } from './store';
import Draggable from 'react-draggable';

const ListItemDnd: FC<ItemProps> = ({
  ref,
  id,
  text,
  stat,
  index,
  handleStop,
}) => {
  return (
    <Draggable key={id} onStop={(e, data) => handleStop(e, data, index)}>
      <ListItem
        ref={ref}
        sx={{
          padding: '0.5rem 1rem',
          marginBottom: '.5rem',
          border: '1px solid silver',
          color: stat,
        }}
      >
        <Typography>{text}</Typography>
      </ListItem>
    </Draggable>
  );
};

export default ListItemDnd;
