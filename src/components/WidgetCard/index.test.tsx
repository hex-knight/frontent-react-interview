import { render, screen } from "@testing-library/react";

import { Widget } from "../../lib/apiConnect";
import WidgetDisplay from "./index";

describe("WidgetDisplay", () => {
  it("displays all widget information", async () => {
    // Updated these tests to prevent the App to crash, but
    // better and deeper testing would be required to
    // deliver a complete feature
    const widget: Widget = {
      starRating: 5,
      name: "Widget von Hammersmark",
      price: 19.45,
    };

    render(
      <WidgetDisplay
        onDelete={() => {}}
        viewDetail={() => {}}
        widget={widget}
      />
    );

    expect(
      screen.queryByText(widget.starRating, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(widget.name, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(widget.price, { exact: false })
    ).toBeInTheDocument();
  });
});
