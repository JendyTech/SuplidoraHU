export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  code: string;
  description: string;
  image: string;
  category: string;
  status: string;
  categoryName : string
}

export interface ICatalogDetail {
  name: string;
  slug: string;
  price: number;
  code: string;
  category: string;
  categoryName: string;
  description: string;
  unitsPerPack: number;
  images: Image[];
}

export interface Image {
  _id: string;
  publicId: string;
  productId: string;
  url: string;
  uploadBy: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
