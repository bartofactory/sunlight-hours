import UserLocation from "@/types/UserLocation";

export default interface GeoLocation{
    isGeolocationSupported() : boolean,
    getCurrentCoordinates(): Promise<UserLocation>
}