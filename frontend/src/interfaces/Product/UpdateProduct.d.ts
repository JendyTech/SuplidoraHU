export interface UpdateProduct {
    name:         string;
    price:        number;
    description:  string;
    code:         string;
    unitsPerPack: number;
    images:       string[];
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
