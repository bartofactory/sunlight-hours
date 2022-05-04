<template>
  <main>
    <div id="current-date">{{ currentItalianDate }}</div>
    <div id="current-location">{{ currentStringLocation }}</div>
    <DaylightTile />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import UserLocation from "@/types/UserLocation";
import DaylightTile from "../components/DaylightTile.vue";

@Options({
  components: {
    DaylightTile,
  },
  props: {},
})
export default class HomeView extends Vue {
  public get currentItalianDate(): string {
    return store.state.currentDate.toFormat("ccc d LLL yyyy", { locale: "it" });
  }

  public get currentBrowserLocation(): UserLocation {
    return store.state.userBrowserLocation;
  }

  public get currentStringLocation(): string {
    const coords: UserLocation = store.state.userBrowserLocation;
    return coords ? `${coords.latitude} - ${coords.longitude}` : `No data`;
  }

  mounted() {
    store.dispatch("setCurrentDate");
    store.dispatch("updateLocation");
  }
}
</script>
