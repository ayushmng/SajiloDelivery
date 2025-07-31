import { splitDateTime } from "./dateSplitter";

describe("splitDateTime", () => {
  it("should return current date", () => {
    const isoString = new Date(Date.now()).toISOString();
    const result = splitDateTime(isoString);

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    expect(result.date).toBe(formattedDate);

    const expectedTime = new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    expect(result.time).toBe(expectedTime);
  });
});
