export interface ITax {
    _id: string
    name: string
    rate: number
    amount: number
    isExempt?: boolean
}