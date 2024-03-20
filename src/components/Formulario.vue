<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
export default defineComponent({
  name: "Formulario",
  components: { Temporizador },
  emits: ["aoSalvarTarefa"],
  setup(props, { emit }) {
    const { notificar } = useNotificador();
    const store = useStore();
    const descricao = ref("");
    const idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos);

    const salvarTarefa = (tempoDecorrido: number): void => {
      const projeto = projetos.value.find((p) => p.id == idProjeto.value);

      if (!projeto) {
        notificar(
          TipoNotificacao.FALHA,
          "Ops!",
          "Selecione um projeto antes de finalizar a tarefa!"
        );
        return;
      }

      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(
          (projeto) => projeto.id === idProjeto.value
        ),
      });
      descricao.value = "";
    };

    return {
      descricao,
      idProjeto,
      projetos,
      salvarTarefa,
    };
  },
});
</script>

<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulario para criacao de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa voce deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primariol);
}
</style>
