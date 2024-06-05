<template>
  <header class="sticky w-full z-30 top-0 py-1 bg-white transition-shadow" :class="{ shadow: y > 0 }">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
      <a class="inline-block no-underline hover:text-black hover:underline py-2 px-4" href="#">О нас</a>

      <div class="order-1 md:order-2">
        <h1 class="flex items-center tracking-wide font-bold text-gray-800 text-xl">
          <router-link :to="{ name: 'home' }" class="flex">
            <svg
              class="fill-current text-gray-800 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z"
              />
            </svg>
            ECWID</router-link
          >
        </h1>
      </div>

      <div class="order-2 md:order-3 flex items-center" id="nav-content">
        <router-link :to="{ name: 'cart' }" class="pl-3 flex items-center gap-2">
          <img class="w-[24px] h-[24px] object-cover" :src="CartIcon" alt="" /> {{ cartItemsAmount }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWindowScroll } from '@vueuse/core'
import { useCartStore } from '@/stores/cart'
import CartIcon from '@/assets/icons/cart.svg?url'

const { cartItemsAmount } = storeToRefs(useCartStore())

const { y } = useWindowScroll()
</script>

<style scoped></style>
