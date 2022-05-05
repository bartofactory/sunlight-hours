<template>
  <header>
    <h1 class="col-12">Day light calculator</h1>
    <div class="grid card-container flex-wrap">
      <Card class="header-card col">
        <template #title>
          <strong>Actual date</strong>
        </template>
        <template #content>
          {{ currentItalianDate }}
        </template>
      </Card>
      <Card class="header-card col-12 md:col-6 lg:col">
        <template #title>
          <strong>Actual location</strong>
        </template>
        <template #content>
          {{ currentStringLocation }}
        </template>
      </Card>
    </div>
  </header>
  <router-view id="content" />
  <footer>
    Sunlight data from:
    <a href="https://sunrise-sunset.org/api">SunriseSunset API</a>
  </footer>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import UserLocation from "@/types/UserLocation";
import DaylightTile from "./components/DaylightTile.vue";
import { DateTime } from "luxon";

@Options({
  components: {
    DaylightTile,
  },
})
export default class MonthView extends Vue {
  public get currentItalianDate(): string {
    return DateTime.now().toFormat("ccc d LLL yyyy", { locale: "it" });
  }

  public get currentStringLocation(): string {
    const coords: UserLocation = store.state.userBrowserLocation;
    return coords &&
      coords.latitude !== undefined &&
      coords.longitude !== undefined
      ? `${coords.latitude} - ${coords.longitude}`
      : `Position not available`;
  }

  mounted() {
    store.dispatch("setCurrentDate");
    store.dispatch("updateLocation");
  }
}
</script>
<style>
body {
  margin: 0px;
  background-color: rgb(247, 247, 247);
}
#app {
  text-align: center;
  color: #2c3e50;
  padding: 20px;
}
.tile {
  min-width: 150px;
}
.header-card {
  margin: 5px;
}
#content {
  margin-top: 20px;
}
footer {
  text-align: right;
  font-style: italic;
}
</style>
