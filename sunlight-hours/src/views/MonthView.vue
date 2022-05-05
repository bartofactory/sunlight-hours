<template>
  <main>
    <div v-if="inputError" class="error">
      <h3>Month not in range</h3>
      <br /><strong
        >Please insert a number from 1 = January, to 12 = December</strong
      >
    </div>
    <DaylightTile
      v-else
      :location="currentBrowserLocation"
      :date="monthDate[0]"
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
  get inputError(): boolean {
    const param = parseInt(this.$route.params.monthNumber as string);
    return !isNaN(param) && (param < 1 || param > 12);
  }
  months: DateTime[] = Info.months("numeric").map((nMont) => {
    return DateTime.fromObject({
      day: DateTime.now().day,
      month: parseInt(nMont),
      year: DateTime.now().year,
    });
  }) as DateTime[];
  public get currentBrowserLocation(): UserLocation {
    return store.getters.currentUserLocation;
  }
  public get monthDate(): DateTime[] {
    return this.months.filter(
      (month) => month.month.toString() === this.$route.params.monthNumber
    );
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
</style>
