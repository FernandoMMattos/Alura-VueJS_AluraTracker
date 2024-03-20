<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return "claro";
      }
      return "escuro";
    },
  },
  setup(props, { emit }) {
    let modoEscuroAtivo = false;

    const alterarTema = () => {
      emit("aoTemaAlterado", modoEscuroAtivo);
      modoEscuroAtivo = !modoEscuroAtivo;
    };

    return {
      modoEscuroAtivo,
      alterarTema,
    };
  },
  methods: {},
  components: { RouterLink },
});
</script>

<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo do Alura Tracker" />
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema">
        Ativar modo {{ textoBotao }}
      </button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <RouterLink to="/" class="link">
            <i class="fas fa-tasks" />
            tarefas
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/projetos" class="link">
            <i class="fas fa-project-diagram" />
            tarefas
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  text-align: center;
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
    text-align: center;
  }
}
</style>
