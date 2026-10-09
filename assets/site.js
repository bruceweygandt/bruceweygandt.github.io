// Lightweight syntax coloring for pre.code blocks: comments, strings, keys, keywords, numbers.
(function () {
  var KW = /\b(import|from|for|in|with|as|def|return|function|const|let|var|if|else|print|GET|POST)\b/g;
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function rest(s) {
    // s is raw text without comment; split out strings first
    var out = '', re = /"(?:[^"\\]|\\.)*"/g, last = 0, m;
    while ((m = re.exec(s))) {
      out += plain(s.slice(last, m.index));
      out += '<span class="t-str">' + esc(m[0]) + '</span>';
      last = re.lastIndex;
    }
    return out + plain(s.slice(last));
  }
  function plain(s) {
    return esc(s)
      .replace(KW, '<span class="t-kw">$1</span>')
      .replace(/(^|[^\w.#&-])(\d+(?:\.\d+)?)(?![\w-])/g, '$1<span class="t-num">$2</span>');
  }
  function line(l) {
    var key = /^(\s*)([A-Za-z_][\w.\[\]]*)(:)(\s)/.exec(l), head = '';
    var c = l.search(/(^|\s)(#|\/\/)(\s|$)/);
    var code = c < 0 ? l : l.slice(0, c), com = c < 0 ? '' : l.slice(c);
    if (key && key[0].length <= code.length && !/^\s*(https?|aws)\b/.test(l)) {
      head = esc(key[1]) + '<span class="t-key">' + esc(key[2]) + '</span>' + key[3] + key[4];
      code = code.slice(key[0].length);
    }
    return head + rest(code) + (com ? '<span class="t-com">' + esc(com) + '</span>' : '');
  }
  document.querySelectorAll('pre.code code').forEach(function (el) {
    el.innerHTML = el.textContent.split('\n').map(line).join('\n');
  });
})();
