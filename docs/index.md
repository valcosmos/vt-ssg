---
title: 'vt-ssg'
---

# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a   | b   |   c |  d  |
| --- | :-- | --: | :-: |

```js
const appHtml = render()
const clientChunk = clientBundle?.output.find(chunk => chunk.type === 'chunk' && chunk.isEntry)
```

## Tasklist

- [ ] to do
- [x] done
