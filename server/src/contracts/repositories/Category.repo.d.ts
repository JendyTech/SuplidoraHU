import { ICategory } from "@interfaces/Category";

export type CreateCategories = Omit<
    ICategory,
    '_id' | 'createdAt' | 'updatedAt' | 'updatedBy'
>