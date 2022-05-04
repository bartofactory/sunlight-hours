import { createStore } from "vuex";
import Location from "@/types/Location";
import { DateTime } from "luxon";

export default createStore({
  state: {
    userBrowserLocation: { latitude: null, longitude: 43.98 } as Location,
    currentDate: null as DateTime | null,
    italianCurrentDate: "" as string,
    geolocationError: "" as string,
  },
  getters: {
    todayDateInItalianFormat: (state) => {
      return state.currentDate
        ? state.currentDate.toFormat("ccc d LLL yyyy", { locale: "it" })
        : null;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
