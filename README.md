# Wysiwyg editor POC

[Demo](https://wok.github.io/slate-test/)

This repo contains different code examples for Javascript Wysiwyg editors evaluted to replace current Markdown editor.

The requirements for a usable editor were:

* Editor receives HTML and returns HTML
* Can be integrated to React / Redux framework
* Supports keyboard shortcuts
* Allows editing links
* Keeps formatting for pasted rich text content

## tiptap - Chosen editor

* [Website](https://tiptap.dev/)
* based on [ProseMirror](https://prosemirror.net/) which is backed by large companies like Atlassian and The New York Times
* Easy to customize and well documented
* Integrates well with React
* [Implemenation](src/html-editor-tiptap/index.js)

## Other Reviewed editors

### Draft Wysiwyg

* [Website](https://jpuri.github.io/react-draft-wysiwyg/#/)
* based on Draft.js by Facebook
* Lots of automagic
* Customization not so easy

### Slate

* [Website](https://www.slatejs.org/)
* build your own editor framework
* Still in Beta, requires lots of code, see [here](src/other-editors/html-editor-slate)
* Documentation missing in some parts or not up to date

### Quill

* [Website](https://quilljs.com/)
* has own react wrapper
* creates incorrect Markup for nested lists [Bug](https://github.com/quilljs/quill/issues/979)
* limited localisation options

### Trix

* [Website](https://trix-editor.org/)
* Built by Basecamp, maker of rails
* Limited customization

### Froala

* [Website](https://froala.com/wysiwyg-editor/)
* Commercial editor, ~ 2 000 $ / year
* Bloated and limited customization

### TinyMCE

* [Website](https://www.tiny.cloud/pricing/)
* Commercial editor, pricing based on editor loads


## Running locally

```
yarn
yarn start
```

