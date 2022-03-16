var support = (function () {
  if (!window.DOMParser) return false;
  var parser = new DOMParser();
  try {
    parser.parseFromString("x", "text/html");
  } catch (err) {
    return false;
  }
  return true;
})();

export const parseHTML = function (str) {
  // check for DOMParser support
  //   if (support) {
  //     var parser = new DOMParser();
  //     var doc = parser.parseFromString(str, "text/html");
  //     console.log(doc);
  //     return doc.body.innerHTML;
  //   }

  // Otherwise, create div and append HTML
  var dom = document.createElement("div");
  dom.innerHTML = str;
  return dom;
};
