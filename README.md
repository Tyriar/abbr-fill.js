# abbr-fill.js

[![Build Status](http://img.shields.io/travis/Tyriar/abbr-fill.js.svg?style=flat)](http://travis-ci.org/Tyriar/abbr-fill.js)
[![Code climate](http://img.shields.io/codeclimate/github/Tyriar/abbr-fill.js.svg?style=flat)](https://codeclimate.com/github/Tyriar/abbr-fill.js)

Efficiently wraps acronyms/abbreviations in `abbr` tags with their relevant `title` attributes.

## Usage

```javascript
abbrFill({
  // Executes the script for each element matching the selector
  'selector': 'article',
  // An array of terms to create <abbr> elements for
  'terms': {
    'XML': 'Extensible Markup Language',
    'HTML': 'HyperText Markup Language',
    'SEO': 'Search Engine Optimisation',
    'WCAG': 'Web Content Accessibility Guidelines',
    'W3C': 'World Wide Web Consortium',
    'URL': 'Uniform Resource Locator',
    'URLs': 'Uniform Resource Locators'
  }
});
```

## Building

```bash
npm install
grunt
```

## Testing

```bash
grunt test
```

## See also

- [abbr-touch.js][1]



  [1]: https://github.com/Tyriar/abbr-touch.js
