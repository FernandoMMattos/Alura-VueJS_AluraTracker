<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
export default defineComponent({
  name: "Projetos",
  components: { RouterView },
});
</script>

<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <RouterView />
  </div>
</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
