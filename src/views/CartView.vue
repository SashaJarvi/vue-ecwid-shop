<template>
  <section class="bg-white py-8">
    <div class="container mx-auto flex flex-col pt-4 pb-12">
      <button class="flex items-center justify-self-start gap-[8px] mb-4" @click="router.back()">
        <img class="w-[20px] h-[20px]" :src="LeftArrowIcon" alt="" />

        Назад
      </button>

      <div v-if="cart.length">
        <cart-product-item v-for="product in cart" :key="product.id" :cart-product="product" />

        <button
          @click="finishOrder"
          class="ml-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Place order
        </button>
      </div>

      <p class="text-center" v-else>
        В корзине пусто, <router-link :to="{ name: 'home' }" class="underline">загляните на главную </router-link>,
        чтобы выбрать товары
      </p>
    </div>
  </section>

  <div v-show="isOrderFinished" class="fixed top-0 right-0 grid place-items-center w-full h-full bg-gray-900/25 z-50">
    <div
      class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="sr-only">Info</span>
      <div><span class="font-medium">Congratulations!</span> You have placed your order.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import LeftArrowIcon from '@/assets/icons/left-arrow.svg?url'
import CartProductItem from '@/components/CartProductItem.vue'

const router = useRouter()

const { cart } = storeToRefs(useCartStore())
const { resetCart } = useCartStore()

const isOrderFinished = ref(false)

const finishOrder = () => {
  isOrderFinished.value = true
  document.body.classList.add('overflow-y-hidden')

  setTimeout(() => {
    router.push({ name: 'home' })
    resetCart()
    document.body.classList.remove('overflow-y-hidden')
  }, 2000)
}
</script>

<style scoped></style>
