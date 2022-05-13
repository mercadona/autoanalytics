import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";

function initializeListeners({ handler: callback }) {
  window.addEventListener("click", (event) => {
    handler(event, callback);
  });
}

function handler(event, callback) {
  return callback(getProperties(event.target));
}

function getProperties(element) {
  return {
    name: computeAccessibleName(element),
    classes: getClasses(element),
  };
}

function getClasses(element) {
  return element.classList.toString().split(" ");
}

export { initializeListeners, getProperties };
