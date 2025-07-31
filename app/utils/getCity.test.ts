import { getCity } from "./getCity";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getCity", () => {
  it("should return a city name", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        display_name: "Samakhushi, Tokha-09, Tokha",
        address: {
          county: "Kathmandu",
        },
      },
    });

    const latitude = "27.738734";
    const longitude = "85.321029";

    const result = await getCity({ latitude, longitude });

    expect(result).toBe("Samakhushi, Tokha-09, Tokha");
  });
});
