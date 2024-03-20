<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent, ref } from "vue";
import Cronometro from "./Cronometro.vue";
import Botao from "./Botao.vue";
export default defineComponent({
  name: "Temporizador",
  emits: ["aoTemporizadorFinalizado"],
  components: { Cronometro, Botao },
  setup(props, { emit }) {
    let tempoEmSegundos = ref(0);
    let cronometro = ref(0);
    let cronometroRodando = ref(false);

    const iniciar = () => {
      cronometroRodando.value = true;
      cronometro.value = setInterval(() => {
        tempoEmSegundos.value++;
      }, 1000);
    };

    const finalizar = () => {
      cronometroRodando.value = false;
      clearInterval(cronometro.value);
      emit("aoTemporizadorFinalizado", tempoEmSegundos);
      tempoEmSegundos.value = 0;
    };

    return {
      tempoEmSegundos,
      cronometro,
      cronometroRodando,
      iniciar,
      finalizar,
    };
  },
});
</script>

<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <Botao
      @clicado="iniciar"
      icone="fas fa-play"
      texto="play"
      :desabilitado="cronometroRodando"
    />
    <Botao
      @clicado="finalizar"
      icone="fas fa-stop"
      texto="stop"
      :desabilitado="!cronometroRodando"
    />
  </div>
</template>

<style scoped></style>
