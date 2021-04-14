import {
  FootballDataService,
  PoliceDataService,
  PostCodeDataService,
} from "../";

describe("FootballDataService", () => {
  describe("populateClubData()", () => {
    let clubs = [
      { id: 1, address: "FirstTest road HD2 7DF" },
      { id: 2, address: "FirstTest road HD3 2IP" },
    ];

    it("should populate postcode on singular club", () => {
      expect(FootballDataService.populateClubData(clubs[0])).toEqual({
        ...clubs[0],
        postcode: "HD2 7DF",
      });
    });

    it("should populate postcode on array of clubs", () => {
      expect(FootballDataService.populateClubData(clubs)).toEqual([
        { ...clubs[0], postcode: "HD2 7DF" },
        { ...clubs[1], postcode: "HD3 2IP" },
      ]);
    });
  });

  describe("setSelectedClub()", () => {
    const clubs = FootballDataService.populateClubData([
      { id: 1, address: "FirstTest road HD2 7DF" },
      { id: 2, address: "FirstTest road HD3 2IP" },
    ]);

    beforeEach(() => {
      jest.spyOn(PoliceDataService, "setCrimeData").mockResolvedValue();
      jest
        .spyOn(PostCodeDataService, "getClubLngLat")
        .mockResolvedValue({ result: { postcode: "HD2 7DF" } });
    });

    it("should call getClubLngLat with correct parameters", () => {
      const selectedClub = clubs[0];
      const setActiveClub = () => {};
      const selectedDate = new Date("January 1, 2020");
      const setCrimeData = () => {};

      FootballDataService.setSelectedClub(
        selectedClub,
        setActiveClub,
        selectedDate,
        setCrimeData
      );
      expect(PostCodeDataService.getClubLngLat).toHaveBeenCalledWith(
        clubs[0].postcode
      );
    });
  });
});
