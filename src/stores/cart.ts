import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct } from '@/types/interfaces/product'
import type { ICartProduct } from '@/types/interfaces/cart-product'

export const useCartStore = defineStore('cart', () => {
  const cart: Ref<ICartProduct[]> = ref(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : []
  )

  const cartItemsAmount = computed(() => cart.value.reduce((acc, item) => (acc += item.amount), 0))

  const addProductToCart = (product: IProduct) => {
    cart.value.push({ ...product, amount: 1 })
  }

  const increaseProductAmount = (productId: number) => {
    const productToUpdate = cart.value.find((c) => c.id === productId)

    if (!productToUpdate) return

    productToUpdate.amount += 1
  }

  const decreaseProductAmount = (productId: number) => {
    const productToUpdate = cart.value.find((c) => c.id === productId)

    if (!productToUpdate) return

    productToUpdate.amount -= 1
  }

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((c) => c.id === productId)
  }

  const resetCart = () => {
    cart.value = []
  }

  watch(
    cart,
    (value) => {
      if (!value) {
        localStorage.removeItem('cart')
        return
      }

      localStorage.setItem('cart', JSON.stringify(value))
    },
    { deep: true }
  )

  return {
    cart,
    cartItemsAmount,
    addProductToCart,
    increaseProductAmount,
    decreaseProductAmount,
    removeFromCart,
    resetCart
  }
})
