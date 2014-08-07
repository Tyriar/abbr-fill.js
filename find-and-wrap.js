/*! find-and-wrap.js | (c) 2014 Daniel Imms | github.com/Tyriar/abbr-fill/blob/master/LICENSE */

var findAndWrap = (function () {
  'use strict';

  function execute(container, term, wrappingTagName) {
    wrappingTagName = wrappingTagName.toLowerCase();
    return matchText(container,
                     term,
                     new RegExp('(^|\\s)' + term + '($|\\s|\\.|,)', 'g'),
                     wrappingTagName);
  }

  function matchText(node, term, regex, wrappingTagName) {
    var excludeElements = ['script', 'style', 'iframe', 'canvas'];
    var child = node.firstChild;
    var elements = [];

    // Required for <img>
    if (!child) {
      return elements;
    }

    var replaceFunction = function(match) {
      var args = [].slice.call(arguments);
      var offset = args[args.length - 2];
      var newTextNode = child.splitText(offset);
      newTextNode.data = newTextNode.data.substr(match.length);
      var newElement = wrapElement.apply(
          window, [child, term, wrappingTagName].concat(args));
      if (newElement) {
        elements = elements.concat(newElement);
      }
      child = newTextNode;
    };

    do {
      switch (child.nodeType) {
      case 1:
        if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) {
          continue;
        }
        elements = elements.concat(
            matchText(child, term, regex, wrappingTagName));
        break;
      case 3: // text node
        child.data.replace(regex, replaceFunction);
        break;
      }
      child = child.nextSibling;
    } while (child);

    return elements;
  }

  function wrapElement(node, term, wrappingTagName, match, offset) {
    // TODO: Pull non-generic logic from here into abbr-fill.js
    if (node.parentNode.tagName.toLowerCase() === wrappingTagName) {
      // The element has either already been wrapped or existed without the
      // script, just add the text back as it was removed by the regex
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
      if (trimmedEnd === term) {
        matchText = trimmedEnd;
        node.nextSibling.data = lastChar + node.nextSibling.data;
      }
    }

    if (matchText !== term) {
      throw 'Unexpected error: The text "' + matchText +
          ' didn\'t match the term "' + term + '"';
    }

    var newElem = document.createElement(wrappingTagName);
    newElem.innerHTML = matchText;
    //newElem.title = config.terms[matchText];
    node.parentNode.insertBefore(newElem, node.nextSibling);

    return newElem;
  }


  return execute;
})();
