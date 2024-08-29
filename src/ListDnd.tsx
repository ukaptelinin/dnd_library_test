import List from '@mui/material/List/List';
import { FC, useState } from 'react';
import ListItemDnd from './ListItemDnd';
import { Item } from './store';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

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
  const dpId: string = 'droppable';

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Если элемент был перетащен за пределы допустимой зоны, destination будет null
    //if (!destination) {
    // return;

    // Если элемент был перетащен за пределы допустимой зоны, destination будет null
    if (!destination) {
      return;
    }

    // Если элемент был перетащен в ту же позицию
    if (source.index === destination.index) {
      return;
    }

    // Создание нового порядка элементов

    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, movedItem);
    newItems[destination.index].stat = items[destination.index].stat;

    // Обновление состояния с новым порядком элементов
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable key={dpId} droppableId={dpId}>
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{ alignContent: 'center', width: '50%' }}
          >
            {items.map((item: Item, index: number) => (
              <ListItemDnd key={item.id} {...item} index={index} />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListDnd;
