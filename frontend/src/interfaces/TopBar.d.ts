export interface ItemMenu {
  url: string;
  title: string;
  items: ItemMenuSubItem[];
  header?: JSX.Element
}

interface ItemMenuSubItem {
  title: string;
  url: string;
}
