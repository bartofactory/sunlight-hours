<template>
  <main>
    <div id="current-date">{{ currentItalianDate }}</div>
    <div id="current-location">{{ currentStringLocation }}</div>
  </main>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store/index";
import { DateTime } from "luxon/src/luxon";
import BrowserGeolocationService from "@/services/BrowserGeolocationService";
import GeoLocation from "@/interfaces/GeoLocation";
import Location from "@/types/Location";

export default class HomeView extends Vue {
  public get currentItalianDate(): string {
    return store.getters.todayDateInItalianFormat
      ? store.getters.todayDateInItalianFormat
      : "No data";
  }

  public get currentBrowserLocation(): Location {
    return store.state.userBrowserLocation;
  }

  public get currentStringLocation(): string {
    const coords: Location = store.state.userBrowserLocation;
    return coords.latitude && coords.latitude
      ? `${coords.latitude} - ${coords.longitude}`
      : `No data`;
  }

  mounted() {
    store.state.currentDate = DateTime.now();
    const geolocationService: GeoLocation = new BrowserGeolocationService();
    geolocationService.getCurrentCoordinates();
  }
}
</script>
