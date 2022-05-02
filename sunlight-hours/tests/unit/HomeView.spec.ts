import { shallowMount, VueWrapper } from "@vue/test-utils";
import { DateTime } from "luxon";
import HomeView from "@/views/HomeView.vue";

describe("Daylight dashboard", () => {
  const dateFormat = "ccc d LLL yyyy";
  const dateLocale = { locale: "it" };
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(HomeView);
  });

  it("renders a date", () => {
    const fullItalianDate = DateTime.now().toFormat(dateFormat, dateLocale);
    expect(wrapper.find("#current-date").text()).toContain(fullItalianDate);
  });

  it("checks the format date", () => {
    const dateRendered = wrapper.find("#current-date").text();

    const dateParser = DateTime.fromFormat(dateRendered, dateFormat, dateLocale);

    expect(dateRendered).toBe(dateParser.toFormat(dateFormat));
  });

  it("renders a latitude and longitude position", () => {
    const latLng = "10.745546756856, -12.0045645745";
    expect(wrapper.html()).toContain(latLng);
  });

  it("checks the latitude and longitude position format", () => {
    const positionRendered = wrapper.find("#current-location").text();
    const coords = positionRendered.split(", ");
    expect(coords).toHaveLength(2);
    expect(() => { parseFloat(coords[0]) }).not.toThrow();
    expect(() => { parseFloat(coords[1]) }).not.toThrow();
  });
});
