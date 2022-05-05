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
    dayLengthByMonth: new Array(12) as Duration[],
  },
  getters: {
    currentUserLocation: (state) => state.userBrowserLocation,
    dayLengthByMonth: (state) => state.dayLengthByMonth,
  },
  actions: {
    updateLocation({ commit }) {
      const geolocationService: GeoLocation = new BrowserGeolocationService();
      geolocationService.getCurrentCoordinates().then((location) => {
        commit("setLocation", location);
      });
    },
    updateDayLight({ commit }, date: DateTime) {
      const dayLightService: SunriseSunsetService = new SunriseSunsetService();
      dayLightService
        .getLocationInfoOn(this.state.userBrowserLocation, date)
        .then((sunriseSunsetResults) => {
          const dateDayLength = Duration.fromISOTime(
            sunriseSunsetResults.results.day_length
          );
          commit("setDayLengthOn", { date, dateDayLength });
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
    setDayLengthOn(state, { date, dateDayLength }) {
      state.dayLengthByMonth[(date as DateTime).month] = dateDayLength;
    },
  },
  modules: {},
});
