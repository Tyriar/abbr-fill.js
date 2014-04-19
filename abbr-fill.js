/*! abbr-fill | (c) 2014 Daniel Imms | github.com/Tyriar/abbr-fill/blob/master/LICENSE */
 
abbrFill = (function () {
  var config;

  return function (configuration) {
    var i, j, key;

    if (!configuration || !configuration.terms || !configuration.selector)
      return;

    config = configuration;

    var nodes = document.querySelectorAll(config.selector);
    for (i = 0; i < nodes.length; i++) {
      applyAbbrs(nodes[i]);
    }
  }

  function applyAbbrs(node) {
    for (term in config.terms) {
      // This will only match the first instance if there are two instances of the term separated
      // by a space. This is an unlikely scenario and probably also not desired behaviour.
      matchText(node, new RegExp("(^|\\s)" + term + "($|\\s|\.|,)", "g"), wrapElement);
    }
  }

  function wrapElement(node, match, offset) {
    // First add the surrounding spaces matched with the regex back
    if (match[0] === ' ')
      node.data += ' ';
    if (match.length > 0 && match[match.length-1] === ' ')
      node.nextSibling.data = ' ' + node.nextSibling.data;
    // Create the new element
    var trimmedMatch = match.trim();
    var newElem = document.createElement("abbr");
    newElem.innerHTML = trimmedMatch;
    newElem.title = config.terms[trimmedMatch];
    node.parentNode.insertBefore(newElem, node.nextSibling);
  }

  // Modified version of http://blog.alexanderdickson.com/javascript-replacing-text
  function matchText(node, regex, callback, excludeElements) { 
    var excludeElements = ['script', 'style', 'iframe', 'canvas'];
    var child = node.firstChild;

    // Required for <img> 
    if (!child)
      return node;

    do {
      switch (child.nodeType) {
      case 1:
        if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) {
          continue;
        }
        matchText(child, regex, callback, excludeElements);
        break;
      case 3: // text node}
        child.data.replace(regex, function(match) {
          var args = [].slice.call(arguments),
              offset = args[args.length - 2],
              newTextNode = child.splitText(offset);
          newTextNode.data = newTextNode.data.substr(match.length);
          callback.apply(window, [child].concat(args));
          child = newTextNode;
        });
        break;
      }
    } while (child = child.nextSibling);

    return node;
  }
})();