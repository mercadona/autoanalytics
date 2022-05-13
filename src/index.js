import { getRole } from "aria-api";
import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";

const IMPORTANT_ROLES = ["button", "link", "checkbox", "radio"];

function initializeListeners({ handler: callback }) {
  window.addEventListener("click", (event) => {
    handler(event, callback);
  });
}

function handler(event, callback) {
  return callback(getProperties(event.target));
}

function getProperties(element) {
  const importantElement = getImportantElement(element);
  return {
    name: computeAccessibleName(importantElement),
    classes: getClasses(importantElement),
    targetedElement: {
      classes: getClasses(element),
      tag: element.tagName,
    },
  };
}

function getClasses(element) {
  return element.classList.toString().split(" ");
}

function getImportantElement(element) {
  let currentElement = element;
  let importantElement;

  while (
    currentElement &&
    currentElement.tagName !== "BODY" &&
    !importantElement
  ) {
    const currentElementRole = getRole(currentElement);

    if (currentElementRole && IMPORTANT_ROLES.includes(currentElementRole)) {
      importantElement = currentElement;
    }

    currentElement = currentElement.parentElement;
  }

  return importantElement;
}

export { initializeListeners, getProperties };
