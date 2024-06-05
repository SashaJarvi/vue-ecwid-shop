<template>
  <section class="bg-white py-8">
    <div class="container px-4 mx-auto flex items-center flex-wrap pt-4 pb-12">
      <button class="flex items-center gap-[8px] mb-4" @click="router.back()">
        <img class="w-[20px] h-[20px]" :src="LeftArrowIcon" alt="" />

        Назад
      </button>

      <article v-if="product && !loading" class="flex flex-col md:flex-row gap-[16px] items-start w-full h-full">
        <img
          class="hover:scale-105 hover:shadow-lg transition w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover"
          :src="product.thumbnailUrl"
          :alt="product.name"
        />

        <div class="flex flex-col justify-between gap-[10px] h-full">
          <div class="flex items-center justify-between">
            <h3 class="tracking-wide text-ml">{{ product.name }}</h3>
          </div>

          <p class="text-gray-900 font-bold">{{ product.price }} ₽</p>

          <div class="flex-1" v-html="product.description"></div>

          <button
            class="flex justify-center gap-[10px] mt-3 p-3 border border-gray-500 rounded-[12px] hover:shadow-lg"
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
      </article>

      <the-loader v-if="loading" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useProductInCart } from '@/composables/product-in-cart'
import type { IProduct } from '@/types/interfaces/product'
import LeftArrowIcon from '@/assets/icons/left-arrow.svg?url'
import TheLoader from '@/components/TheLoader.vue'

const route = useRoute()
const router = useRouter()

const { loading, product } = storeToRefs(useProductsStore())
const { fetchProduct } = useProductsStore()
const { addProductToCart } = useCartStore()

const isProductInCart = ref(false)
const buyButtonText = ref('Купить')

const productId = computed(() => route.params.productId as string)

const updateCartState = () => {
  if (!product.value) return

  const { isProductInCart: productInCart, buyButtonText: buttonText } = useProductInCart(product.value)
  isProductInCart.value = productInCart.value
  buyButtonText.value = buttonText.value
}

const buyButtonHandler = (product: IProduct) => {
  if (isProductInCart.value) {
    router.push({ name: 'cart' })
    return
  }

  addProductToCart(product)
}

watch(productId, async (newId) => {
  await fetchProduct(parseInt(newId))
  updateCartState()
})

watch(product, (newProduct) => {
  if (newProduct) {
    updateCartState()
  }
})

onMounted(async () => {
  await fetchProduct(parseInt(productId.value))
  updateCartState()
})
</script>
