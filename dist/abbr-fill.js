/*! abbr-fill.js | (c) 2014 Daniel Imms | github.com/Tyriar/abbr-fill.js/blob/master/LICENSE */

var abbrFill = (function () {
  'use strict';

  var config;

  function init (configuration) {
    if (!configuration || !configuration.terms || !configuration.selector) {
      return;
    }

    config = configuration;

    var nodes = document.querySelectorAll(config.selector);
    for (var i = 0; i < nodes.length; i++) {
      applyAbbrs(nodes[i]);
    }
  }

  function applyAbbrs(node) {
    for (var term in config.terms) {
      if (config.terms.hasOwnProperty(term)) {
        // This will only match the first instance if there are two instances of
        // the term separated by a space. Since it is quite an unlikely scenario
        // and probably not desirable to wrap both anyway it's allowed.
        // For example: "ABC ABC" -> "<abbr title="...">ABC</abbr> ABC
        matchText(node, new RegExp('(^|\\s)' + term + '($|\\s|\\.|,)', 'g'),
            wrapElement);
      }
    }
  }

  function wrapElement(node, match, offset) {
    if (node.parentNode.tagName.toLowerCase() === 'abbr') {
      // The element has already either already been wrapped or existed without
      // the script, just add the text back as it was removed by the regex
      node.data = match;
      return;
    }

    // First add the surrounding spaces matched with the regex back
    if (match[0] === ' ') {
      node.data += ' ';
    }
    if (match.length > 0 && match[match.length - 1] === ' ') {
      node.nextSibling.data = ' ' + node.nextSibling.data;
    }
    // Create the new element
    var matchText = match.trim();

    var lastChar = matchText[matchText.length - 1];
    if (lastChar === '.' || lastChar === ',') {
      var trimmedEnd = matchText.substring(0, matchText.length - 1);
      // only use if the term exists without the '.' or ',' at the end
      if (trimmedEnd in config.terms) {
        matchText = trimmedEnd;
        node.nextSibling.data = lastChar + node.nextSibling.data;
      }
    }

    if (!(matchText in config.terms)) {
      throw 'Unexpected error: The text "' + matchText +
          ' didn\'t match any terms';
    }

    var newElem = document.createElement('abbr');
    newElem.innerHTML = matchText;
    newElem.title = config.terms[matchText];
    node.parentNode.insertBefore(newElem, node.nextSibling);
  }

  // Modified version of
  // http://blog.alexanderdickson.com/javascript-replacing-text
  function matchText(node, regex, callback) {
    var excludeElements = ['script', 'style', 'iframe', 'canvas'];
    var child = node.firstChild;

    // Required for <img>
    if (!child) {
      return node;
    }

    var replaceFunction = function(match) {
      var args = [].slice.call(arguments),
          offset = args[args.length - 2],
          newTextNode = child.splitText(offset);
      newTextNode.data = newTextNode.data.substr(match.length);
      callback.apply(window, [child].concat(args));
      child = newTextNode;
    };

    do {
      switch (child.nodeType) {
      case 1:
        if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) {
          continue;
        }
        matchText(child, regex, callback, excludeElements);
        break;
      case 3: // text node
        child.data.replace(regex, replaceFunction);
        break;
      }
      child = child.nextSibling;
    } while (child);

    return node;
  }

  return init;
})();
