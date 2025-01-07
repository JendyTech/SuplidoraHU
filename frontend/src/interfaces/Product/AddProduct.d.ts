interface AddProductModel {
	name : string
	price : number
	code : string
	description : string
	unitsPerPack : number
	categoryName? : string
	categoryId? : string

	images? : string[]
}
