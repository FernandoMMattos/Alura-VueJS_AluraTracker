<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { useStore } from "@/store";
import { OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipoAcoes";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "Lista",
  setup() {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS);

    const excluir = (id: string) => {
      store.dispatch(REMOVER_PROJETO, id);
    };
    return {
      projetos: computed(() => store.state.projeto.projetos),
      excluir,
    };
  },
});
</script>

<template>
  <section>
    <RouterLink to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus" />
      </span>
      <span>Novo Projeto</span>
    </RouterLink>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <td>Ações</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <RouterLink :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt" />
              </span>
            </RouterLink>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash" />
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
