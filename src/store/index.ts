import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./tipoMutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { StateProjeto, projeto } from "./modulos/projeto";
import { StateTarefa, tarefa } from "./modulos/tarefa";

export interface State {
  notificacoes: INotificacao[];
  tarefa: StateTarefa;
  projeto: StateProjeto;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    notificacoes: [],
    tarefa: {
      tarefas: [],
    },
    projeto: {
      projetos: [],
    },
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
    },
  },
  modules: {
    projeto,
    tarefa,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
