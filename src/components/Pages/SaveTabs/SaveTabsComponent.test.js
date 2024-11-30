import { render, screen } from "@testing-library/react";
import SaveTabsComponent from "./SaveTabsComponent";

test("renders save tabs component text", () => {
  render(<SaveTabsComponent />);
  expect(screen.getByText("Save tabs into JSON")).toBeInTheDocument();
});
