import { createStore } from "vuex";
import UserLocation from "@/types/UserLocation";
import { DateTime, Duration } from "luxon";
import GeoLocation from "@/interfaces/GeoLocation";
import BrowserGeolocationService from "@/services/BrowserGeolocationService";
import SunriseSunsetService from "@/services/SunriseSunsetService";

export default createStore({
  state: {
    userBrowserLocation: {} as UserLocation,
    currentDate: DateTime.now() as DateTime,
    dayLength: Duration.fromMillis(0) as Duration,
  },
  getters: {
    currentUserLocation: (state) => state.userBrowserLocation,
  },
  actions: {
    updateLocation({ commit }) {
      const geolocationService: GeoLocation = new BrowserGeolocationService();
      geolocationService.getCurrentCoordinates().then((location) => {
        commit("setLocation", location);
      });
    },
    updateDayLight({ commit }) {
      const dayLightService: SunriseSunsetService = new SunriseSunsetService();
      dayLightService
        .getLocationInfo(this.state.userBrowserLocation)
        .then((sunriseSunsetResults) => {
          commit(
            "setDayLength",
            Duration.fromISOTime(sunriseSunsetResults.results.day_length)
          );
        });
    },
    setCurrentDate({ commit }) {
      commit("setCurrentDate");
    },
  },
  mutations: {
    setCurrentDate(state) {
      state.currentDate = DateTime.now();
    },
    setLocation(state, location: UserLocation) {
      state.userBrowserLocation = location;
    },
    setDayLength(state, duration: Duration) {
      console.log(duration);

      state.dayLength = duration;
    },
  },
  modules: {},
});
