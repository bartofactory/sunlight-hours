<template>
  <main class="grid justify-content-center flex-wrap">
    <DaylightTile
      v-for="month in monthsInTime"
      :key="month"
      :date="month"
      :location="currentBrowserLocation"
      class="tile col"
    />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import UserLocation from "@/types/UserLocation";
import DaylightTile from "../components/DaylightTile.vue";
import { DateTime, Duration, Info } from "luxon";

@Options({
  components: {
    DaylightTile,
  },
})
export default class HomeView extends Vue {
  months: DateTime[] = Info.months("numeric").map((nMont) => {
    return DateTime.fromObject({
      day: DateTime.now().day,
      month: parseInt(nMont),
      year: DateTime.now().year,
    });
  }) as DateTime[];

  public get tileDate(): DateTime {
    return DateTime.now();
  }

  public get currentItalianDate(): string {
    return this.tileDate.toFormat("ccc d LLL yyyy", { locale: "it" });
  }

  public get currentBrowserLocation(): UserLocation {
    return store.getters.currentUserLocation;
  }

  public get currentStringLocation(): string {
    const coords: UserLocation = store.state.userBrowserLocation;
    return coords ? `${coords.latitude} - ${coords.longitude}` : `No data`;
  }

  public get dayLengthInMonths(): Duration[] {
    return store.getters.dayLengthByMonth;
  }

  public get monthsInTime(): DateTime[] {
    return this.months;
  }
}
</script>
