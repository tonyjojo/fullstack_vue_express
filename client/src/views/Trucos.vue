<template>
  <div class="container">
    <h1>Los truquitos del Raf</h1>
    <div class="create-truco">
      <label for="create-truco">Añadir un nuevo truco</label>
      <input
        type="text"
        id="create-truco"
        v-model="newTrucoText"
        placeholder="Create truco"
      />
      <button @click="createTruco">Truco!</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="trucos-container">
      <Tarjeta
        v-for="(truco, index) in trucos"
        :key="index"
        :truco="truco"
        @delete="trucoDeleted"
      />
    </div>
  </div>
</template>

<script>
import Tarjeta from "@/components/Tarjeta";
import TrucoService from "@/helpers/TrucoService";

export default {
  name: "Trucos",
  components: {
    Tarjeta,
  },
  data() {
    return {
      trucos: [],
      error: "",
      newTrucoText: "",
    };
  },
  async created() {
    try {
      this.updateTrucos(await TrucoService.getTrucos());
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async trucoDeleted() {
      this.updateError("");
      this.updateTrucos(await TrucoService.getTrucos());
    },
    updateError(newError = "") {
      this.error = newError;
    },
    updateTrucos(newTrucos) {
      this.trucos = newTrucos.sort(
        (b, a) => new Date(a.creationDate) - new Date(b.creationDate)
      );
    },
    async createTruco() {
      this.error = "";

      if (this.newTrucoText.length > 0) {
        const truco = {
          titulo: this.newTrucoText,
          posicion: "Sentado" /* De pie / Sentado */,
          nExpectadores: 6 /* Número de expectadores */,
          buenEstadoBaraja: true /* Bien / Mal */,
          completa: true /* Sí / No */,
          tipoBaraja: "Esapñola" /* Española / Francesa / Tarot */,
          ordenacion:
            "Mezclada" /* Mezclada / Parcialmente ordenada / Ordenación total / Tamariz */,
          mesa: true /* Si / No */,
          trucada: false /* Sí / No */,
          angulos: false /* Sí / No */,
          efectos:
            "Agua y aceite" /* Agua y aceite / Predicción / Adivinación */,
          duracion: 60 /* En segundos */,
          descripcion: "De lo que va este truco",
        };

        await TrucoService.createTruco(truco);
        this.updateTrucos(await TrucoService.getTrucos());
      } else {
        this.error = "Trucos can't be empty";
      }
    },
  },
};
</script>

<style>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
</style>
