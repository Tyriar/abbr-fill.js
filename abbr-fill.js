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
    var trimmedMatch = match.trim();
    // BUG: This will trim any abbr's that actually end in '.' eg. "A.B.C."
    var lastChar = trimmedMatch[trimmedMatch.length - 1];
    if (lastChar === '.' || lastChar === ',') {
      trimmedMatch = trimmedMatch.substring(0, trimmedMatch.length - 1);
      node.nextSibling.data = lastChar + node.nextSibling.data;
    }
    var newElem = document.createElement('abbr');
    newElem.innerHTML = trimmedMatch;
    newElem.title = config.terms[trimmedMatch];
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
