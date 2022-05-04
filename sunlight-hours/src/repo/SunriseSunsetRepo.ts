import { SunriseSunsetResult } from "@/types/SunriseSunsetResult";
import UserLocation from "@/types/UserLocation";
import { DateTime } from "luxon";

export default interface SunriseSunsetRepo {
  getLocationInfo(location: UserLocation): Promise<SunriseSunsetResult>;
  getLocationInfoOn(
    location: UserLocation,
    date: DateTime
  ): Promise<SunriseSunsetResult>;
}
