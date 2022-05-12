import { initializeListeners } from "index";

it("calls to track callback when click on element", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";

  document.body.innerHTML =
    "<div>" +
    '  <span id="username" />' +
    '  <button id="button">Add to cart</button>' +
    "</div>";

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.getElementsByTagName("button")[0].click();

  expect(cb).toHaveBeenCalledTimes(1);
});
