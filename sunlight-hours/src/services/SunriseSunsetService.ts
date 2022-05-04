import SunriseSunsetRepo from "@/repo/SunriseSunsetRepo";
import { SunriseSunsetResult } from "@/types/SunriseSunsetResult";
import UserLocation from "@/types/UserLocation";
import axios from "axios";
import { DateTime } from "luxon";

export default class SunriseSunsetService implements SunriseSunsetRepo {
  getLocationInfo(location: UserLocation): Promise<SunriseSunsetResult> {
    return new Promise<SunriseSunsetResult>((resolve, reject) => {
      axios
        .get<SunriseSunsetResult>(
          `https://api.sunrise-sunset.org/json?lat=${location.latitude}&lng=${location.longitude}`
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  }
  getLocationInfoOn(
    location: UserLocation,
    date: DateTime
  ): Promise<SunriseSunsetResult> {
    throw new Error("Method not implemented.");
  }
}
