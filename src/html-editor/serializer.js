import escapeHtml from 'escape-html'
import { Text } from 'slate'

const serialize = node => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    if (node.underline) {
      string = `<u>${string}</u>`
    }
    if (node.italic) {
      string = `<i>${string}</i>`
    }
    return string
  }

  const children = node.children.map(n => serialize(n)).join('')

  switch (node.type) {
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.href)}">${children}</a>`
    case 'heading-one':
      return `<h1>${children}</h1>`
    case 'heading-two':
      return `<h2>${children}</h2>`
    case 'heading-three':
      return `<h3>${children}</h3>`
    case 'heading-four':
      return `<h4>${children}</h4>`
    case 'heading-five':
      return `<h5>${children}</h5>`
    case 'bulleted-list':
      return `<ul>${children}</ul>`
    case `numbered-list`:
      return `<ol>${children}</ol>`
    case 'list-item':
      return `<li>${children}</li>`
    default:
      return children
  }
}

export const slateToHtml = (children) => {
  return serialize({ children });
}