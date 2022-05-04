import UserLocation from "@/types/UserLocation";
import GeoLocation from "@/interfaces/GeoLocation";

export default class BrowserGeolocationService implements GeoLocation {
  isGeolocationSupported(): boolean {
    return "navigator" in window && "geolocation" in navigator;
  }

  getCurrentCoordinates(): Promise<UserLocation> {
    return new Promise<UserLocation>((res, rej) => {
      if (this.isGeolocationSupported()) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            res({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            } as UserLocation);
          },
          (err) => rej(err),
          {
            enableHighAccuracy: true,
          }
        );
      }
    });
  }
}
