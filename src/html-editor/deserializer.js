import { jsx } from 'slate-hyperscript';

const ELEMENT_TAGS = {
  A: el => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  UL: () => ({ type: 'bulleted-list' }),
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  B: () => ({ bold: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
}

const deserialize = el => {
  if (el.nodeType === Node.TEXT_NODE) {
    return el.textContent
  } else if (el.nodeType !== Node.ELEMENT_NODE) {
    return null
  } else if (el.nodeName === 'BR') {
    return '\n'
  }

  let children = Array.from(el.childNodes).map(deserialize).flat();

  if (children.length === 0) {
    children = [{ text: '' }]
  }

  if (el.nodeName === 'BODY') {
    return jsx ('fragment', {}, children)
  }

  if (ELEMENT_TAGS[el.nodeName]) {
    const attrs = ELEMENT_TAGS[el.nodeName](el)
    return jsx('element', attrs, children)
  }

  if (TEXT_TAGS[el.nodeName]) {
    const attrs = TEXT_TAGS[el.nodeName](el)
    return children.map(child => jsx('text', attrs, child))
  }

  return children;
}

export const htmlToSlate = (html) => {
  const document = new DOMParser().parseFromString(html, 'text/html');
  return deserialize(document.body);
}
