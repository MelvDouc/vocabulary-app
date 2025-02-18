import { createElement, Fragment } from "reactfree-jsx";

if (!("createElement" in globalThis)) {
  Object.defineProperties(globalThis, {
    createElement: { value: createElement },
    Fragment: { value: Fragment }
  });
}