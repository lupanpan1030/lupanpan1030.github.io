# Ethan Chen Lu Online CV

This repository powers the GitHub Pages online CV at:

https://lupanpan1030.github.io/

## Structure

- `index.html` renders the page shell.
- `cv.md` is the English CV content.
- `cv-cn.md` is the Chinese CV content.
- `cv.css` controls screen and print styling.
- `cv.js` loads the selected Markdown file and renders it with Marked.

## Local preview

```sh
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```
