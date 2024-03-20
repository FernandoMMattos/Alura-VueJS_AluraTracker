<script lang="ts">
import { Ref, computed, defineComponent, ref, watchEffect } from "vue";
import Formulario from "@/components/Formulario.vue";
import Tarefa from "@/components/Tarefa.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/Box.vue";
import Modal from "@/components/Modal.vue";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipoAcoes";

export default defineComponent({
  name: "App",
  components: { Formulario, Tarefa, Box, Modal },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  setup() {
    const store = useStore();
    const filtro = ref("");
    let tarefaSelecionada = ref(null) as Ref<ITarefa | null>;

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    const salvarTarefa = (tarefa: ITarefa): void => {
      store.dispatch(CADASTRAR_TAREFA, tarefa);
    };

    const selecionarTarefa = (tarefa: ITarefa) => {
      tarefaSelecionada.value = tarefa;
    };

    const fecharModal = () => {
      tarefaSelecionada.value = null;
    };

    const alterarTarefa = () => {
      store
        .dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
        .then(() => fecharModal());
    };

    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      filtro,
      tarefaSelecionada,
      alterarTarefa,
      selecionarTarefa,
      salvarTarefa,
      fecharModal,
    };
  },
});
</script>

<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje :( </Box>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          type="text"
          class="input"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search" />
        </span>
      </p>
    </div>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <Modal :mostrar="tarefaSelecionada != null">
      <template v-slot:header>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="descricaoDaTarefa" class="label"> Descricao </label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada!.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button class="button is-success" @click="alterarTarefa">Salvar</button>
        <button class="button" @click="fecharModal">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>
