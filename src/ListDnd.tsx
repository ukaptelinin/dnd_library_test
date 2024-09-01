import List from '@mui/material/List/List';
import { FC, useState } from 'react';
import ListItemDnd from './ListItemDnd';
import { Item } from './store';
import { DndProvider } from 'react-dnd/dist/core/DndProvider';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ListDnd: FC = () => {
  const [items, setItems] = useState([
    {
      id: 'task1',
      text: 'Write a cool JS library',
      stat: 'red',
    },
    {
      id: 'task2',
      text: 'Make it generic enough',
      stat: 'red',
    },
    {
      id: 'task3',
      text: 'Write README',
      stat: 'blue',
    },
    {
      id: 'task4',
      text: 'Create some examples',
      stat: 'blue',
    },
    {
      id: 'task5',
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      stat: 'green',
    },
    {
      id: 'task6',
      text: '???',
      stat: 'green',
    },
    {
      id: 'task7',
      text: 'PROFIT',
      stat: 'gray',
    },
  ]);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const newItems = Array.from(items);
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    newItems[hoverIndex].stat = items[hoverIndex].stat;

    setItems(newItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <List>
        {items.map((item: Item, index: number) => (
          <ListItemDnd
            key={item.id}
            {...item}
            index={index}
            moveItem={moveItem}
          />
        ))}
      </List>
    </DndProvider>
  );
};

export default ListDnd;
