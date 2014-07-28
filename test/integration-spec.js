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
    contentDiv.innerHTML = 'my FOO<div>test</div>';
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
    contentDiv.innerHTML = 'my <div>test</div>FOO';
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
    contentDiv.innerHTML = 'my <div>test FOO</div>';
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
    contentDiv.innerHTML = 'my <div>FOO</div> test';
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

  it('should not match terms with following "," characters', function () {
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

  it('should not match terms with following "." characters', function () {
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
});
