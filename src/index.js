import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";

function initializeListeners() {
  window.addEventListener("click", () => {});
}

function getProperties(element) {
  return {
    name: computeAccessibleName(element),
  };
}

export { initializeListeners, getProperties };
