import { render, screen } from "@testing-library/react";
import RestoreSessionComponent from "./RestoreSessionComponent";

test("saves restore session component text", () => {
  render(<RestoreSessionComponent />);
  expect(screen.getByText("Restore Session")).toBeInTheDocument();
});
