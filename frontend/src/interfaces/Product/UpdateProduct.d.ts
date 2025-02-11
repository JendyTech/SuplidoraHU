export interface UpdateProduct {
    name:         string;
    price:        number;
    status:       boolean;
    description:  string;
    code:         string;
    unitsPerPack: number;
    imagesToDelete : string[];
    imagesToAdd : string[];
    images:       Image[];
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
