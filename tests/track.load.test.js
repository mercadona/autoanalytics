import { initializeListeners } from "index";
import { webWithButton } from "./helpers";

it("has the event type", () => {
  document.body.innerHTML = webWithButton;
  const mockedDate = new Date("2022-01-01");
  jest.useFakeTimers().setSystemTime(mockedDate);
  delete window.location;
  window.location = new URL("https://www.example.com/path/to/page");
  const cb = jest.fn();

  initializeListeners({
    handler: cb,
  });

  expect(cb).toHaveBeenCalledWith(
    expect.objectContaining({
      type: "load-page",
      occurredAt: mockedDate,
      path: "/path/to/page",
    })
  );
});
