---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Junseong Park"
  text: "Personal Website"
  tagline: Share my thoughts and products.
  image:
    src: /favicon.svg
    alt: Junseong Park's Logo

  actions:
  - theme: brand
    text: 📖 What I've Learned
    link: /learn/object-type
  - theme: alt
    text: 📖 My Thoughts
    link: /blog/test
  - theme: alt
    text: 🎨 My Projects
    link: /projects/a
---

```ts twoslash
const Social_Links = {
  Github: 'https://github.com/jsparkdev',
  Twitter: 'https://x.com/jsparkdev',
  Linkedin: 'https://linkedin.com/in/jsparkdev',
} as const

const Skills = {
  Languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
  Frameworks: ['React', 'Next.js', 'Remix', 'Astro'],
  Styling: ['Tailwind CSS', 'Radix UI'],
  Deployment: ['Cloudflare', 'Vercel'],
  Version_Control: ['Github'],
}
```
