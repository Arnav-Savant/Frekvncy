// Both pages live in one app, so each page stylesheet is scoped to its root
// class (.page-home / .page-diwali). :root, html and body map to that root.
const prefixer = require('postcss-prefix-selector')

const scope = (prefix, file) =>
  prefixer({
    prefix,
    includeFiles: [file],
    transform(prefix, selector, prefixed) {
      if (selector === ':root' || selector === 'html' || selector === 'body') return prefix
      if (selector.startsWith('body')) return prefix + selector.slice(4)
      if (selector.startsWith('html')) return prefix + selector.slice(4)
      return prefixed
    },
  })

module.exports = {
  plugins: [scope('.page-home', /home\.css$/), scope('.page-diwali', /diwali\.css$/)],
}
