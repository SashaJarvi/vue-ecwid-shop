<template>
  <article :class="wrapperClasses">
    <router-link :to="{ name: 'product', params: { productId: product.id } }" :class="cardClasses">
      <template v-if="viewMode === 'grid'">
        <img
          class="aspect-square md:hover:scale-105 hover:shadow-lg transition object-cover"
          :src="product.thumbnailUrl"
          :alt="product.name"
        />

        <div class="flex flex-col justify-between gap-[10px]">
          <div class="flex items-center justify-between">
            <h3 class="tracking-wide text-ml">{{ product.name }}</h3>
          </div>

          <p class="text-gray-900 font-bold">{{ product.price }} ₽</p>

          <button
            class="flex justify-center gap-[10px] mt-auto p-3 border border-gray-500 rounded-[12px] hover:shadow-lg"
            :class="{ 'text-white bg-gray-500': isProductInCart }"
            @click.prevent="buyButtonHandler(product)"
          >
            <svg
              :fill="isProductInCart ? '#fff' : '#000000'"
              xmlns="http://www.w3.org/2000/svg"
              width="14px"
              height="14px"
              viewBox="0 0 20 20"
            >
              <path
                d="M18,20H2c-0.6,0-1.1-0.6-1-1.2l2-12C3.1,6.4,3.5,6,4,6h12c0.5,0,0.9,0.4,1,0.8l2,12C19.1,19.4,18.6,20,18,20z M3.2,18h13.6
	L15.2,8H4.8L3.2,18z"
              />
              <path d="M14,5h-2V4c0-1.1-0.9-2-2-2S8,2.9,8,4v1H6V4c0-2.2,1.8-4,4-4s4,1.8,4,4V5z" />
            </svg>
            {{ buyButtonText }}
          </button>
        </div>
      </template>
      <template v-else-if="viewMode === 'list'">
        <img
          class="aspect-square hover:scale-105 hover:shadow-lg transition w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover"
          :src="product.thumbnailUrl"
          :alt="product.name"
        />

        <div class="flex flex-col justify-between gap-[10px] h-full">
          <div class="flex items-center justify-between">
            <h3 class="tracking-wide text-ml">{{ product.name }}</h3>
          </div>

          <p class="text-gray-900 font-bold">{{ product.price }} ₽</p>

          <button
            class="flex justify-center gap-[10px] w-[200px] mt-auto p-3 border border-gray-500 rounded-[12px] hover:shadow-lg"
            :class="{ 'text-white bg-gray-500': isProductInCart }"
            @click.prevent="buyButtonHandler(product)"
          >
            <svg
              :fill="isProductInCart ? '#fff' : '#000000'"
              xmlns="http://www.w3.org/2000/svg"
              width="14px"
              height="14px"
              viewBox="0 0 20 20"
            >
              <path
                d="M18,20H2c-0.6,0-1.1-0.6-1-1.2l2-12C3.1,6.4,3.5,6,4,6h12c0.5,0,0.9,0.4,1,0.8l2,12C19.1,19.4,18.6,20,18,20z M3.2,18h13.6
	L15.2,8H4.8L3.2,18z"
              />
              <path d="M14,5h-2V4c0-1.1-0.9-2-2-2S8,2.9,8,4v1H6V4c0-2.2,1.8-4,4-4s4,1.8,4,4V5z" />
            </svg>
            {{ buyButtonText }}
          </button>
        </div>
      </template>
    </router-link>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import type { ViewMode } from '@/types/types/view-mode'
import type { IProduct } from '@/types/interfaces/product'
import { useProductInCart } from '@/composables/product-in-cart'

const router = useRouter()

const { addProductToCart } = useCartStore()

const props = defineProps<{
  viewMode: ViewMode
  product: IProduct
}>()

const { isProductInCart, buyButtonText } = useProductInCart(props.product)

const wrapperClasses = computed(() => {
  return {
    'w-full xs:w-1/2 md:w-1/3 xl:w-1/4 p-6 flex flex-col': props.viewMode === 'grid',
    'w-full p-6 flex flex-row': props.viewMode === 'list'
  }
})
const cardClasses = computed(() => {
  return {
    'flex flex-col gap-[15px]': props.viewMode === 'grid',
    'flex items-start space-x-6': props.viewMode === 'list'
  }
})

const buyButtonHandler = (product: IProduct) => {
  if (isProductInCart.value) {
    router.push({ name: 'cart' })
    return
  }

  addProductToCart(product)
}
</script>
