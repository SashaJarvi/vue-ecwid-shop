<template>
  <div class="flex-1 flex flex-col">
    <the-header />
    <main>
      <slot />
    </main>
    <the-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: { TheFooter, TheHeader }
})
</script>
