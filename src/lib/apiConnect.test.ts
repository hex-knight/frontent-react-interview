import axios from "axios";
import { mocked } from "jest-mock";

import { fetchAllWidgets, Widget } from "./apiConnect";

jest.mock("axios");

describe("fetchAllWidgets", () => {
  it("returns response data", async () => {
    // Updated these tests to prevent the App to crash, but
    // better and deeper testing would be required to
    // deliver a complete feature
    const widgetList: Widget[] = [
      { starRating: 3, name: "Widget Jones", price: 9.95 },
    ];
    mocked(axios).get.mockResolvedValueOnce({ data: widgetList });

    const result = await fetchAllWidgets();

    expect(result).toEqual(widgetList);
  });

  it("errors on reject", async () => {
    mocked(axios).get.mockRejectedValueOnce({});

    expect(fetchAllWidgets()).rejects.toBeTruthy();
  });
});
