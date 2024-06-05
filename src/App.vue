<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    DefaultLayout
  },
  setup() {
    const route = useRoute()

    const layout = computed(() => {
      return route.meta.layout || 'DefaultLayout'
    })

    const setAppHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }

    window.addEventListener('resize', setAppHeight)

    setAppHeight()

    return {
      layout
    }
  }
})
</script>

<style scoped></style>
