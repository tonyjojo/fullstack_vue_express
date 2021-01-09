<template>
  <div class="truco" @dblclick="deleteTruco">
    <div class="created-at">
      {{
        `${truco.creationDate.getDate()}/${truco.creationDate.getMonth()}/${truco.creationDate.getFullYear()}`
      }}
    </div>
    <p class="text">{{ truco.titulo }}</p>
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

<style>
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