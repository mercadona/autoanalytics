import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";

function initializeListeners({ handler }) {
  window.addEventListener("click", () => {
    handler();
  });
}

function getProperties(element) {
  return {
    name: computeAccessibleName(element),
  };
}

export { initializeListeners, getProperties };
