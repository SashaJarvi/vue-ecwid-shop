import type { IProduct } from '@/types/interfaces/product'

export interface ICartProduct extends IProduct {
  amount: number
}
