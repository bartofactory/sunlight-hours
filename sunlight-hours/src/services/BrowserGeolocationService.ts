import { Vue } from "vue-class-component";
import Location from "@/types/Location";
import GeoLocation from "@/interfaces/GeoLocation";
import store from "@/store";

export default class BrowserGeolocationService implements GeoLocation {
  private _userBrowserLocation: Location = { latitude: null, longitude: null };

  isGeolocationSupported(): boolean {
    console.log("isGeolocationSupported");
    return "navigator" in window && "geolocation" in navigator;
  }

  async getCurrentCoordinates() {
    console.log("getCurrentCoordinates");
    console.log(this.isGeolocationSupported());
    if (this.isGeolocationSupported()) {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          this._userBrowserLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          store.state.userBrowserLocation = this._userBrowserLocation;
        },
        (error) => {
          console.error(`[GEOLOCATION]${error}`);
          this._userBrowserLocation = { latitude: null, longitude: null };
          store.state.geolocationError = `${error.message} [${error.code}]`;
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }
}
