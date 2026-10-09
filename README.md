# Bruce Weygandt

Static site, no build step. Open `index.html` in a browser.

```
index.html          Home: short intro and recent posts
about.html          About, tools, credentials, contact
blog/index.html     All posts
blog/*.html         One page per post
assets/styles.css   All styles; colors are the tokens at the top of :root
assets/site.js      Syntax coloring for pre.code blocks (loaded by posts with code)
```

To add a post, copy a file in `blog/`, add it to `blog/index.html` (and to Recent posts in
`index.html`), and update the Previous/Next links on its neighbors.
