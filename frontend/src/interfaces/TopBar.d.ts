export interface ItemMenu {
  url: string;
  title: string;
  items: ItemMenuSubItem[];
}

interface ItemMenuSubItem {
  title: string;
  url: string;
}
