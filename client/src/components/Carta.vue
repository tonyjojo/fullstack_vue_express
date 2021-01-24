<template>
  <div class="carta" @dblclick="deleteTruco">
    {{ truco.titulo }}
  </div>
</template>

<script>
import TrucoService from "@/helpers/TrucoService";

export default {
  props: {
    truco: {
      required: true,
    },
  },
  methods: {
    async deleteTruco() {
      await TrucoService.deleteTruco(this.truco._id);
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss" scoped>
.carta {
  $ar: 2.5/3.5;
  $h: 250px;
  height: $h;
  width: $h * $ar;
  font-size: 22px;
  font-weight: 700;
  margin: $unit;
  padding: 2 * $unit;
  position: relative;
  background-color: $blue;
  color: $light-brown;
  border-radius: 2 * $unit;
}
</style>