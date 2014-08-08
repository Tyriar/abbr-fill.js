describe('tags', function () {
  var contentDiv;

  beforeEach(function () {
    contentDiv = document.createElement('div');
    document.body.appendChild(contentDiv);
  });

  afterEach(function () {
    if (contentDiv) {
      contentDiv.parentNode.removeChild(contentDiv);
    }
  });

  it('should match terms immediately after opening tags', function () {
    contentDiv.innerHTML = 'FOO test';
    abbrFill({
      'selector': 'div',
      'terms': { 'FOO': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('FOO');
    expect(abbr[0].title).toBe('bar');
  });

  it('should match terms immediately before opening tags', function () {
    contentDiv.innerHTML = 'my FOO<span>test</span>';
    abbrFill({
      'selector': 'div',
      'terms': { 'FOO': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('FOO');
    expect(abbr[0].title).toBe('bar');
  });

  it('should match terms immediately after closing tags', function () {
    contentDiv.innerHTML = 'my <span>test</span>FOO';
    abbrFill({
      'selector': 'div',
      'terms': { 'FOO': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('FOO');
    expect(abbr[0].title).toBe('bar');
  });

  it('should match terms immediately before closing tags', function () {
    contentDiv.innerHTML = 'my <span>test FOO</span>';
    abbrFill({
      'selector': 'div',
      'terms': { 'FOO': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('FOO');
    expect(abbr[0].title).toBe('bar');

  });

  it('should match terms wrapped in an element', function () {
    contentDiv.innerHTML = 'my <span>FOO</span> test';
    abbrFill({
      'selector': 'div',
      'terms': { 'FOO': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('FOO');
    expect(abbr[0].title).toBe('bar');
  });

  it('should match terms in the middle of sentences', function () {
    contentDiv.innerHTML = 'my FOO test';
    abbrFill({
      'selector': 'div',
      'terms': { 'FOO': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('FOO');
    expect(abbr[0].title).toBe('bar');
  });

  it('should not match following "," characters', function () {
    contentDiv.innerHTML = 'test FOO, test';
    abbrFill({
      'selector': 'div',
      'terms': { 'FOO': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('FOO');
    expect(abbr[0].title).toBe('bar');
  });

  it('should not match following "." characters', function () {
    contentDiv.innerHTML = 'test FOO. Test';
    abbrFill({
      'selector': 'div',
      'terms': { 'FOO': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('FOO');
    expect(abbr[0].title).toBe('bar');
  });

  it('should not trim "." on terms that end in "."', function () {
    contentDiv.innerHTML = 'test F.O.O. test';
    abbrFill({
      'selector': 'div',
      'terms': { 'F.O.O.': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('F.O.O.');
    expect(abbr[0].title).toBe('bar');
  });

  it('should not match a following "," characters on terms that end in "."', function () {
    contentDiv.innerHTML = 'test F.O.O., Test';
    abbrFill({
      'selector': 'div',
      'terms': { 'F.O.O.': 'bar' }
    });

    var abbr = document.querySelectorAll('abbr');
    expect(abbr.length).toBe(1);
    expect(abbr[0].innerHTML).toBe('F.O.O.');
    expect(abbr[0].title).toBe('bar');
  });
});
