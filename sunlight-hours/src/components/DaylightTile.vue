<template>
  <Card class="card">
    <template #header>
      <h3 class="day">{{ tileDate }}</h3>
    </template>
    <template #content>
      <small>Day light:</small>
      <h2>{{ dayligthDuration }}</h2>
    </template>
  </Card>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";
import store from "@/store";
import UserLocation from "@/types/UserLocation";
import { DateTime, Duration } from "luxon";

class Props {
  location: UserLocation = prop({
    required: true,
  });
  date: DateTime | undefined = prop({
    required: false,
  });
}

export default class DaylightTile extends Vue.with(Props) {
  get dayligthDuration(): string {
    if (this.date !== undefined) {
      return store.getters.dayLengthByMonth[this.date.month]
        ? (
            store.getters.dayLengthByMonth[this.date.month] as Duration
          ).toISOTime({ suppressMilliseconds: true })
        : "..:..:..";
    }
    return "..:..:..";
  }

  get tileDate(): string {
    return this.date !== undefined
      ? this.date.toFormat("ccc d LLL yyyy", { locale: "it" })
      : "Retrieving current date...";
  }

  mounted() {
    store.watch(
      () => this.location,
      (val: UserLocation, oldVal: UserLocation) => {
        if (val !== oldVal) store.dispatch("updateDayLight", this.date);
      }
    );
  }
}
</script>

<style scoped>
.card {
  margin: 5px;
  min-width: 200px;
}
.day {
  padding: 0px 20px;
}
</style>
