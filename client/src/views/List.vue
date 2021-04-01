<template>
  <div id="list">
    <h1>Los truquitos del Raf</h1>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="trucos-container">
      <Carta
        v-for="(truco, index) in trucos"
        :key="index"
        :truco="truco"
        @delete="trucoDeleted"
      />
    </div>
  </div>
</template>

<script>
import Carta from "@/components/Carta";
import TrucoService from "@/helpers/TrucoService";

export default {
  name: "List",
  components: {
    Carta,
  },
  data() {
    return {
      trucos: [],
      error: "",
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
  },
};
</script>

<style lang="scss" scoped>
#list {
  margin: 3 * $unit;

  .error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }

  .trucos-container {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
