import http from "@/http";
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  ALTERAR_TAREFA,
} from "./../../tipoAcoes";
import {
  DEFINIR_TAREFAS,
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
} from "./../../tipoMutacoes";
import ITarefa from "@/interfaces/ITarefa";
import { State } from "@/store";
import { Module } from "vuex";

export interface StateTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<StateTarefa, State> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = "tarefas";

      if (filtro) {
        url += "?descricao=" + filtro;
      }
      http.get(url).then((resposta) => commit(DEFINIR_TAREFAS, resposta.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post("/tarefas", tarefa)
        .then((resposta) => commit(ADICIONA_TAREFA, resposta.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa));
    },
  },
};
