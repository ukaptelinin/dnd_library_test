export interface Item {
    id: string
    text: string
    stat: string
  }

  export interface ItemProps {
    id: string
    text: string
    stat: string
    index: number
  }
  
  export interface ContainerState {
    cards: Item[]
  }