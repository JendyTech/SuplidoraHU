export interface GetProduct<T = Image> {
    _id: string
    name: string
    price: number
    code: string
    description: string
    unitsPerPack: number
    createdAt: string
    categoryName? : string
    categoryId? : string
    images : T[]
}

export interface Image {
    _id:       string;
    publicId:  string;
    productId: string;
    url:       string;
    uploadBy:  string;
    __v:       number;
    createdAt: Date;
    updatedAt: Date;
}
