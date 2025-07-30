import { splitDateTime } from "./dateSplitter";

describe("splitDateTime", () => {
  it("should return correct date and local time", () => {
    const isoString = new Date(Date.now()).toISOString();

    const result = splitDateTime(isoString);

    expect(result.date).toBe("2025-07-30");

    const expectedTime = new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    expect(result.time).toBe(expectedTime);
  });

  it("should handle different timezones correctly", () => {
    const isoString = "2025-12-25T23:15:00.000Z";
    const result = splitDateTime(isoString);

    expect(result.date).toBe("2025-12-25");

    const expectedTime = new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    expect(result.time).toBe(expectedTime);
  });
});
