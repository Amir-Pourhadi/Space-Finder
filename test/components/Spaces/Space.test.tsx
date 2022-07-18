import { fireEvent, render, screen } from "@testing-library/react";
import Space from "components/Spaces/Space";
import { mockSpace } from "../../mockData/spaceData";

const developmentUrl = "http://localhost";

describe("Space Component Test Suit", () => {
  const mockReserveSpace = jest.fn();
  const { id, location, name, photoUrl } = mockSpace;

  describe("Space with photo", () => {
    test("Show image correctly", () => {
      render(<Space id={id} location={location} name={name} photoUrl={photoUrl} reserveSpace={mockReserveSpace} />);

      const image: HTMLImageElement = screen.getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image.src).toEqual(`${developmentUrl}/${photoUrl}`);
      expect(image).toHaveAttribute("alt");
    });

    test("Show labels correctly", () => {
      render(<Space id={id} location={location} name={name} photoUrl={photoUrl} reserveSpace={mockReserveSpace} />);

      expect(screen.getByTestId("name-label")).toHaveTextContent(name);
      expect(screen.getByTestId("id-label")).toHaveTextContent(id);
      expect(screen.getByTestId("location-label")).toHaveTextContent(location);
    });

    test("Reserve Space", () => {
      render(<Space id={id} location={location} name={name} photoUrl={photoUrl} reserveSpace={mockReserveSpace} />);

      fireEvent.click(screen.getByRole("button", { name: /reserve/i }));

      expect(mockReserveSpace).toBeCalledTimes(1);
      expect(mockReserveSpace).toBeCalledWith(id);
    });
  });
  describe("Space without photo", () => {
    test("Don't Show any image", () => {
      render(<Space id={id} location={location} name={name} reserveSpace={mockReserveSpace} />);

      const image: HTMLImageElement = screen.getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image.src).toBeFalsy();
      expect(image).toHaveAttribute("alt");
    });
  });
});
