/*! abbr-fill | (c) 2014 Daniel Imms | github.com/Tyriar/abbr-fill/blob/master/LICENSE */

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
        // the term separated by a space. This is an unlikely scenario and
        // probably also not desired behaviour.
        matchText(node, new RegExp('(^|\\s)' + term + '($|\\s|\\.|,)', 'g'),
            wrapElement);
      }
    }
  }

  function wrapElement(node, match, offset) {
    // First add the surrounding spaces matched with the regex back
    if (match[0] === ' ') {
      node.data += ' ';
    }
    if (match.length > 0 && match[match.length-1] === ' ') {
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
