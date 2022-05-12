import { getProperties } from "index";

it("gets accessible name from element", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";

  expect(getProperties(element)).toEqual(
    expect.objectContaining({
      name: "Add to cart",
    })
  );
});
