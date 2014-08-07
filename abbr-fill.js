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
        //matchText(node, new RegExp('(^|\\s)' + term + '($|\\s|\\.|,)', 'g'),
        //    wrapElement);

        var abbrs = findAndWrap(node, term, 'abbr');

        if (!abbrs.length) {
          continue;
        }

        for (var i = 0; i < abbrs.length; i++) {
          abbrs[i].title = config.terms[term];
        }
      }
    }
  }

  return init;
})();
