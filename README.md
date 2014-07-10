# abbr-fill.js

[![Build Status](https://travis-ci.org/Tyriar/abbr-fill.js.svg?branch=master)](https://travis-ci.org/Tyriar/abbr-fill.js)
[![Code Climate](https://codeclimate.com/github/Tyriar/abbr-fill.js.png)](https://codeclimate.com/github/Tyriar/abbr-fill.js)

A JavaScript library that wraps acronyms/abbreviations in `<abbr>` tags with their relevant `title` attributes.

## Usage

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
