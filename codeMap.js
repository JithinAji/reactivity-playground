export default {
  "manual": {
    "title": "Manual Reactivity",
    "explanation": "State changes require explicitly calling a render function to update the UI.",
    "flow": "input → state → render() → DOM",
    "code": "const attachListeners = (input, state, prop, elem) => {\n  elem.textContent = state[prop];\n\n  input.addEventListener(\"input\", (e) => {\n    state[prop] = e.target.value;\n    renderManual();\n  });\n\n  const renderManual = () => {\n    elem.textContent = state[prop];\n  };\n};\n\nexport default attachListeners;"
  },

  "define": {
    "title": "Object.defineProperty Reactivity",
    "explanation": "Intercepts property changes using getters and setters, automatically triggering UI updates.",
    "flow": "input → state → setter → render() → DOM",
    "code": "const defineBinding = (input, state, attr, elem) => {\n  input.addEventListener(\"input\", () => {\n    state[attr] = input.value;\n  });\n\n  let newValue = state[attr];\n\n  const renderUpdate = () => {\n    elem.textContent = newValue;\n  };\n\n  Object.defineProperty(state, attr, {\n    get() {\n      return newValue;\n    },\n    set(value) {\n      newValue = value;\n      renderUpdate();\n    }\n  });\n\n  state[attr] = state[attr];\n};\n\nexport default defineBinding;"
  },

  "proxy": {
    "title": "Proxy-based Reactivity",
    "explanation": "Uses a Proxy to intercept all property changes dynamically and update all bound elements.",
    "flow": "input → proxy → set trap → renderEffect(key) → DOM",
    "code": "const domBinding = new Map();\nlet proxyCopy = null;\n\nconst renderEffect = (attr) => {\n  if (domBinding.has(attr)) {\n    let elems = domBinding.get(attr);\n\n    for (const elem of elems) {\n      elem.textContent = proxyCopy[attr];\n    }\n  }\n};\n\nconst defineProxy = (input, state, attr, elem) => {\n  const handler = {\n    get(target, key) {\n      return target[key];\n    },\n    set(target, key, value) {\n      target[key] = value;\n      renderEffect(key);\n      return true;\n    }\n  };\n\n  if (!proxyCopy) proxyCopy = new Proxy(state, handler);\n\n  if (!domBinding.has(attr)) {\n    domBinding.set(attr, new Set());\n  }\n\n  let set = domBinding.get(attr);\n  set.add(elem);\n\n  renderEffect(attr);\n  input.value = proxyCopy[attr];\n\n  input.addEventListener(\"input\", () => {\n    proxyCopy[attr] = input.value;\n  });\n};\n\nexport default defineProxy;"
  }
}