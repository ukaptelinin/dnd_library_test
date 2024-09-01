import List from '@mui/material/List/List';
import { FC, useEffect, useRef, useState } from 'react';
import ListItemDnd from './ListItemDnd';
import { Item } from './store';
import { DraggableData, DraggableEvent } from 'react-draggable';

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
  const listItemRef = useRef<HTMLLIElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (listItemRef.current) {
      // Получаем высоту элемента в пикселях
      const height = listItemRef.current.getBoundingClientRect().height;
      setHeight(height);
    }
  }, []);
  const handleStop = (
    e: DraggableEvent,
    data: DraggableData,
    index: number,
  ) => {
    const newItems = [...items];
    const item = newItems.splice(index, 1)[0];
    newItems.splice(Math.round(data.y / Number(height)), 0, item); // Assuming each item has a height of 50px
    setItems(newItems);
  };

  return (
    <List>
      {items.map((item: Item, index: number) => (
        <ListItemDnd
          ref={listItemRef}
          key={item.id}
          {...item}
          index={index}
          handleStop={handleStop}
        />
      ))}
    </List>
  );
};

export default ListDnd;
