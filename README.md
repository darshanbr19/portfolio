# Darshan B R — Portfolio

A professional portfolio site built to match the AI/ML systems developer
positioning from the résumé — dark "model card" aesthetic, real project
metrics, and an honest, credible presentation (no filler skill bars, no
dead-end contact forms).

## Structure
```
index.html      — all sections (hero, about, stack, projects, experience, contact)
style.css       — design system (tokens, components)
script.js       — scroll reveal, typing effect, counters, nav
assets/
  darshan-photo.jpg      — profile photo
  Darshan_BR_Resume.pdf  — downloadable résumé
```

## Run locally
Just open `index.html` in a browser, or serve it:
```bash
python3 -m http.server 8000
```

## Deploy
Static site — works on GitHub Pages, Netlify, Vercel, or any static host.
Just upload the folder as-is.

## Content sourced from
Résumé (Darshan_B_R__1CD23IS040.pdf) — projects, metrics, skills, education,
and certifications are pulled directly from there. Update `index.html` if
any of these change.

## Themes
Four colour themes are built in, switchable from the dots in the navbar
(choice is remembered in the browser): Light (default), Dark, Violet, Emerald.
To change the default, edit the fallback `'light'` in the inline script in
`index.html` and the last line of `script.js`. To add a theme, copy one
`[data-theme="..."]` block in `style.css` and add a matching button.
