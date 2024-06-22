import { render, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";

import * as apiConnect from "../../lib/apiConnect";
import WidgetDisplay from "../WidgetDisplay";
import WidgetList from "./index";

jest.mock("../WidgetDisplay");
jest.mock("../../lib/apiConnect");

describe("WidgetList", () => {
  it("renders WidgetDisplay for each widget", async () => {
    // Updated these tests to prevent the App to crash, but
    // better and deeper testing would be required to
    // deliver a complete feature
    const widgets: apiConnect.Widget[] = [
      { starRating: 2, name: "Widget von Hammersmark", price: 19.45 },
      { starRating: 3, name: "Widgette Nielson", price: 19.95 },
    ];
    mocked(apiConnect).fetchAllWidgets.mockResolvedValue(widgets);

    render(<WidgetList />);

    await waitFor(() => {
      expect(WidgetDisplay).toHaveBeenCalledWith(
        expect.objectContaining({ widget: widgets[0] }),
        {}
      );
      expect(WidgetDisplay).toHaveBeenCalledWith(
        expect.objectContaining({ widget: widgets[1] }),
        {}
      );
    });
  });
});
