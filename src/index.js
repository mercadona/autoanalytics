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
  return callback(getProperties(event.target));
}

function getProperties(element) {
  const importantElement = getImportantElement(element);
  return {
    // event: "click",
    name: computeAccessibleName(importantElement),
    description: computeAccessibleDescription(importantElement),
    classes: getClasses(importantElement),
    // text: importantElement.innerText,
    context: getContext(importantElement),
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

export { initializeListeners, getProperties };
