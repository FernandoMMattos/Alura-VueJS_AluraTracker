<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { PropType, computed, defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "./Box.vue";
export default defineComponent({
  name: "Tarefa",
  components: { Cronometro, Box },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  emits: ["aoTarefaClicada"],
  setup(props, { emit }) {
    const tarefaClicada = (): void => {
      emit("aoTarefaClicada", props.tarefa);
    };
    const tempoGasto = computed(() => {
      return new Date(props.tarefa.duracaoEmSegundos * 1000)
        .toISOString()
        .substr(11, 8);
    });

    return {
      tarefaClicada,
      tempoGasto,
    };
  },
});
</script>

<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descricao" }}
      </div>
      <div class="column in-3">
        {{ tarefa.projeto?.nome || "N/D" }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>
