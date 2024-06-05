<template>
  <article class="w-full p-6 flex flex-row">
    <router-link :to="{ name: 'product', params: { productId: cartProduct.id } }" class="flex items-start space-x-6">
      <img
        class="aspect-square hover:scale-105 hover:shadow-lg transition w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover"
        :src="cartProduct.thumbnailUrl"
        :alt="cartProduct.name"
      />

      <div class="flex flex-col gap-[10px] h-full">
        <div class="flex items-center justify-between">
          <h3 class="tracking-wide text-ml">{{ cartProduct.name }}</h3>
        </div>

        <p class="text-gray-900 font-bold">{{ resultPrice }} ₽</p>

        <div class="flex items-center gap-5 mt-auto">
          <div class="flex items-center gap-3">
            <button
              class="grid place-items-center w-8 h-8 border border-gray-500 rounded-full hover:shadow-lg"
              :class="{ 'opacity-50': cartProduct.amount === 1 }"
              :disabled="cartProduct.amount === 1"
              @click.prevent="decreaseProductAmount(cartProduct.id)"
            >
              <img :src="CircleRemoveIcon" alt="" />
            </button>

            <p class="font-semibold">{{ cartProduct.amount }}</p>

            <button
              class="grid place-items-center w-8 h-8 border border-gray-500 rounded-full hover:shadow-lg"
              @click.prevent="increaseProductAmount(cartProduct.id)"
            >
              <img :src="CircleAddIcon" alt="" />
            </button>
          </div>

          <button
            class="grid place-items-center w-8 h-8 rounded-full hover:shadow-lg"
            @click.prevent="removeFromCart(cartProduct.id)"
          >
            <img class="w-[20px] h-[20px]" :src="TrashIcon" alt="" />
          </button>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { ICartProduct } from '@/types/interfaces/cart-product'
import CircleAddIcon from '@/assets/icons/circle-add.svg?url'
import CircleRemoveIcon from '@/assets/icons/circle-remove.svg?url'
import TrashIcon from '@/assets/icons/trash.svg?url'
import { computed } from 'vue'

const { increaseProductAmount, decreaseProductAmount, removeFromCart } = useCartStore()

const props = defineProps<{
  cartProduct: ICartProduct
}>()

const resultPrice = computed(() => props.cartProduct.amount * props.cartProduct.price)
</script>

<style scoped></style>
