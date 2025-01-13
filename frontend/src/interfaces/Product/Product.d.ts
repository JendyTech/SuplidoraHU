export interface IProduct {
  _id:          string;
  name:         string;
  price:        number;
  code:         string;
  image:       string;
  description:  string;
  status:      boolean;
  unitsPerPack: number;
  categoryName : string
  createdBy:    string;
  updatedBy:    null | string;
  createdAt:    string;
  updatedAt:    string;
  __v:          number;
}

