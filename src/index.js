import { getRole } from "aria-api";
import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";

const IMPORTANT_ROLES = ["button", "link", "checkbox", "radio", "heading"];

function initializeListeners({ handler: callback }) {
  window.addEventListener("click", (event) => {
    handler(event, callback);
  });
}

function handler(event, callback) {
  const properties = getProperties(event.target);

  if (properties) {
    callback(properties);
  }
}

function getProperties(element) {
  const importantElement = getImportantElement(element);

  if (!importantElement) {
    return;
  }

  return {
    type: "click",
    name: computeAccessibleName(importantElement),
    classes: getClasses(importantElement),
    context: getContext(importantElement),
    occurredAt: new Date(),
    targetedElement: {
      classes: getClasses(element),
      tag: element.tagName,
    },
  };
}

function getClasses(element) {
  return element.classList.toString().split(" ");
}

function getContext(element) {
  const parent = element.parentElement;

  if (!parent || element.tagName === "BODY") {
    return "";
  }

  const accessibleName = computeAccessibleName(parent);

  if (accessibleName) {
    return accessibleName;
  }

  return getContext(parent.parentElement);
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

export { initializeListeners };
