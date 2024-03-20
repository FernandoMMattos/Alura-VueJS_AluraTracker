<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipoAcoes";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (projeto) => projeto.id === props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const lidarComSucesso = () => {
      nomeDoProjeto.value = "";
      notificar(
        TipoNotificacao.SUCESSO,
        "Sucesso!",
        "Pronto, seu projeto ja esta salvo."
      );
      router.push("/projetos");
    };

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => {
            lidarComSucesso();
          });
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value).then(() => {
          lidarComSucesso();
        });
      }
    };

    return {
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>

<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome Do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
          placeholder="Qual projeto deseja fazer?"
        />
      </div>
      <div class="filed">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<style scoped></style>
