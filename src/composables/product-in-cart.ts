import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import type { IProduct } from '@/types/interfaces/product'

export function useProductInCart(product: IProduct) {
  const { cart } = storeToRefs(useCartStore())

  const isProductInCart = computed(() => cart.value.some((c) => c.id === product.id))
  const buyButtonText = computed(() => (isProductInCart.value ? 'В корзину' : 'Купить'))

  return {
    isProductInCart,
    buyButtonText
  }
}
