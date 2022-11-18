const webWithButton =
  "<div>" +
  '  <button id="button" class="shop__ad-to-cart enabled">Add to cart</button>' +
  "</div>";

const webWithButtonAndIcon =
  "<div aria-label='Brand new shoes'>" +
  '  <button id="button" class="shop__ad-to-cart enabled">' +
  '     <i class="icon"></i>Add to cart' +
  "  </button>" +
  "</div>";

const webWithButtonAndIconMultipleDivs =
  "<div aria-label='Brand new shoes'>" +
  "  <div>" +
  '  <button id="button" class="shop__ad-to-cart enabled">' +
  '     <i class="icon"></i>Add to cart' +
  "  </button>" +
  "  </div>" +
  "</div>";

const webWithHeader =
  "<div aria-label='Brand new shoes'>" +
  "  <h1>Shop</h1>" +
  '  <button id="button" class="shop__ad-to-cart enabled">' +
  '     <i class="icon"></i>Add to cart' +
  "  </button>" +
  "</div>";

const webWithLink =
  "<div aria-label='Brand new shoes'>" +
  '  <a id="link" href="/page">' +
  "  </a>" +
  "</div>";

export {
  webWithButton,
  webWithButtonAndIcon,
  webWithHeader,
  webWithLink,
  webWithButtonAndIconMultipleDivs,
};
