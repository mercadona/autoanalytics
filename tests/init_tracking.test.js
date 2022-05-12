import { initializeListeners } from "index";

it("initializes event listeners", () => {
  const spy = jest.spyOn(global, "addEventListener");
  const cb = jest.fn(() => {});

  initializeListeners({
    handler: cb,
  });

  expect(spy).toHaveBeenCalledWith("click", expect.anything());
});
