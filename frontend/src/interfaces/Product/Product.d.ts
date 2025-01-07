export interface IProduct {
  _id:          string;
  name:         string;
  price:        number;
  code:         string;
  description:  string;
  unitsPerPack: number;
  categoryName : string
  createdBy:    string;
  updatedBy:    null | string;
  createdAt:    string;
  updatedAt:    string;
  __v:          number;
}
