<template>
  <main>
    <div id="current-date">{{ todayDate }}</div>
    <div id="current-location">10.745546756856, -12.0045645745</div>
  </main>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { DateTime } from "luxon";

export default class HomeView extends Vue {
  currentDate = DateTime.now();

  get todayDate() {
    return this.currentDate.toFormat("ccc d LLL yyyy", { locale: "it" });
  }
}
</script>
