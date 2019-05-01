# `<Benefit />`

### A utility system for decorating react components

`benefit` helps to solve the problem of React Components inheriting cumbersome styles from other CSS on the page. Component-level-resets and delightfully composable utility classes (inspired by [TailwindCSS](https://tailwindcss.com)) allow each component to render precisely as expected despite inherited CSS.

Another key feature of `benefit` is that _it only inlines the CSS for the utilities that you use_. So, whether you’re hardening/isolating a single React component or building a full responsive layout, only the CSS for the utilities you use get injected to the page.

You also have the ability to customize the configuration with your own design system rules. Extend the configuration and add your own colors and CSS utilities or start entirely from scratch. It's up to you.

```js
/** @jsx jsx */
import { jsx } from "benefit"

function MyComponent() {
  return (
    <div className="p-4 bg-orange-300 rounded">
      <p className="p-4 bg-white shadow rounded-sm">
        Williamsburg stumptown iPhone, gastropub vegan banh mi
        microdosingpost-ironic pok pok +1 bespoke dreamcatcher bushwick brunch.
      </p>
    </div>
  )
}
```
