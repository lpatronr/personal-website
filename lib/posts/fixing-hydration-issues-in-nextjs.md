---
title: 'Fixing Hydration Issues in Next.JS'
description: Learn how to avoid hydration issues when employing SSR in Next.js.
date: '2022-07-02'
type: 'blog'
---

When using getStaticProps for server-side rendering, I stumbled across these 3 errors:

Error 1:

```
Hydration failed because the initial UI does not match what was rendered on the server
```

Error 2:

```
Text content does not match server-rendered HTML.
```

Error 3:

```
There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.
```

I didn't understand why this was happening since I was using useEffect and useState whenever needed. Considering server-side rendering involves loading the page at build time rather than at the client-side, that means somewhere in our code, we render something that will be ultimately changed at the client-side. But where?

I conducted a Google search and came across [this fantastic thread](https://github.com/vercel/next.js/discussions/35773?sort=top), where countless other developers faced the same issue. The proposed solution was to check if the content is now at the client-side and not at the server-side rendering stage.

```typescript
const [isSSR, setIsSSR] = useState(true);

useEffect(() => {
  setIsSSR(false);
}, []);
```

With this approach, any content that must be rendered on the client-side that differs from the server-side must be conditionally rendered using isSSR. However, I didn't like this solution, as one should not feel the need to declare a useEffect when we ultimately know that our piece of code that causes this error must not be rendered at build time but rather when the client gets it.

Fortunately, Next.js provides a built-in method to accomplish this by specifying that a specific component should be [dynamically loaded](https://nextjs.org/docs/advanced-features/dynamic-import) on the client-side. As the documentation states: "This is useful if an external dependency or component relies on browser APIs like window.".

That is when I remembered that the Date object in JavaScript is an API, where the date depends on the client and thus cannot be represented at the server-side. So, how do you implement dynamic loading?

It's pretty simple. Instead of exporting default your component, create another default function that resolves your component:

```typescript
import dynamic from 'next/dynamic';

export function MyComponent(): JSX.Element {
  return <>{new Date().toLocaleDateString()}</>;
}

export default dynamic(() => Promise.resolve(MyComponent), { ssr: false });
```

That's it!
