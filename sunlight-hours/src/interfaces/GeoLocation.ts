export default interface GeoLocation{
    isGeolocationSupported() : boolean,
    getCurrentCoordinates(): void
}