<template>
  <div id="create">
    <h1>Create</h1>
    <div class="create-truco">
      <label for="create-truco">Añadir un nuevo truco</label>
      <input
        type="text"
        id="create-truco"
        v-model="newTrucoText"
        placeholder="Create truco"
      />
      <button @click="createTruco">Crear!</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import TrucoService from "@/helpers/TrucoService";

export default {
  name: "Create",
  data() {
    return {
      error: "",
      newTrucoText: "",
    };
  },
  methods: {
    updateError(newError = "") {
      this.error = newError;
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
          tipoBaraja: "Española" /* Española / Francesa / Tarot */,
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
      } else {
        this.error = "Trucos can't be empty";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#create {
  margin: 3 * $unit;

  .error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }
}
</style>
