import { initializeListeners } from "index";
import { webWithButton, webWithButtonAndIcon, webWithHeader } from "./helpers";

it("calls to track callback when click on element", () => {
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";

  document.body.innerHTML = webWithButton;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.getElementsByTagName("button")[0].click();

  expect(cb).toHaveBeenCalledTimes(1);
});

it("pass an object to the callback with the accessible name", () => {
  document.body.innerHTML = webWithButton;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.getElementsByTagName("button")[0].click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Add to cart",
    })
  );
});

it("has the element class in the event", () => {
  document.body.innerHTML = webWithButton;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.getElementsByTagName("button")[0].click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      classes: ["shop__ad-to-cart", "enabled"],
    })
  );
});

it("get the info from the correct element", () => {
  document.body.innerHTML = webWithButtonAndIcon;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector(".icon").click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      classes: ["shop__ad-to-cart", "enabled"],
    })
  );
});

it("adds the info from the targeted element", () => {
  document.body.innerHTML = webWithButtonAndIcon;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector(".icon").click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      targetedElement: {
        classes: ["icon"],
        tag: "I",
      },
    })
  );
});

it("adds context to the event", () => {
  document.body.innerHTML = webWithButtonAndIcon;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector(".icon").click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      context: "Brand new shoes",
    })
  );
});

it("does not fail when click in a header", () => {
  document.body.innerHTML = webWithHeader;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector("h1").click();

  expect(cb).toHaveBeenCalledWith(expect.objectContaining({ name: "Shop" }));
});

it("does not fail when click in any place outside of important element", () => {
  document.body.innerHTML = webWithButton;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector("div").click();

  expect(cb).not.toHaveBeenCalled();
});

it("has the event type", () => {
  document.body.innerHTML = webWithHeader;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector("h1").click();

  expect(cb).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
});

it("has the event date", () => {
  const mockedDate = new Date("2022-01-01");
  jest.useFakeTimers().setSystemTime(mockedDate);
  const element = document.createElement("button");
  element.innerHTML = "Add to cart";
  document.body.innerHTML = webWithHeader;

  const cb = jest.fn();
  initializeListeners({
    handler: cb,
  });
  document.querySelector("h1").click();

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({ occurredAt: mockedDate })
  );
});
