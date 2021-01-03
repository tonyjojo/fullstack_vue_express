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
      <div
        class="truco"
        @dblclick="deleteTruco(truco._id)"
        v-for="(truco, index) in trucos"
        :key="index"
      >
        <div class="created-at">
          {{
            `${truco.creationDate.getDate()}/${truco.creationDate.getMonth()}/${truco.creationDate.getFullYear()}`
          }}
        </div>
        <p class="text">{{ truco.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import TrucoService from "@/helpers/TrucoService";

export default {
  name: "Trucos",
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
    updateTrucos(newTrucos) {
      this.trucos = newTrucos.sort(
        (b, a) => new Date(a.creationDate) - new Date(b.creationDate)
      );
    },
    async createTruco() {
      this.error = "";

      if (this.newTrucoText.length > 0) {
        await TrucoService.createTruco(this.newTrucoText);
        this.updateTrucos(await TrucoService.getTrucos());
      } else {
        this.error = "Trucos can't be empty";
      }
    },
    async deleteTruco(trucoId) {
      this.error = "";

      await TrucoService.deleteTruco(trucoId);
      this.updateTrucos(await TrucoService.getTrucos());
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

div.truco {
  position: relative;
  border: 1px solid #5bd658;
  background-color: lightgreen;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
