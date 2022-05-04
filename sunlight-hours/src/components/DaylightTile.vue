<template>
  <div>Hours of daylight: {{ dayligthDuration }}</div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";
import UserLocation from "@/types/UserLocation";

export default class DaylightTile extends Vue {
  get dayligthDuration(): string {
    return store.state.dayLength.toISOTime();
  }

  mounted() {
    store.watch(
      () => store.getters.currentUserLocation,
      (val: UserLocation, oldVal: UserLocation) => {
        if (val !== oldVal) store.dispatch("updateDayLight");
      }
    );
  }
}
</script>

<style scoped></style>
