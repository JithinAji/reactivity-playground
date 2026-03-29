export default {
  "manual": {
    "title": "Manual Reactivity",
    "explanation": "State changes require explicitly calling a render function to update the UI.",
    "flow": "input → state → render() → DOM",
    "code": "const attachListeners = (input, state, prop, elem) => {\n  // Initial render: sync DOM with state\n  elem.textContent = state[prop];\n\n  // Listen for user input\n  input.addEventListener(\"input\", (e) => {\n    // Update state manually\n    state[prop] = e.target.value;\n\n    // Explicitly trigger UI update\n    renderManual();\n  });\n\n  // Manual render function\n  const renderManual = () => {\n    elem.textContent = state[prop];\n  };\n};\n\nexport default attachListeners;"
  },

  "define": {
    "title": "Object.defineProperty Reactivity",
    "explanation": "Intercepts property changes using getters and setters, automatically triggering UI updates.",
    "flow": "input → state → setter → render() → DOM",
    "code": "const defineBinding = (input, state, attr, elem) => {\n  // When user types, update state (this will trigger setter)\n  input.addEventListener(\"input\", () => {\n    state[attr] = input.value;\n  });\n\n  // Internal value storage (not directly exposed)\n  let newValue = state[attr];\n\n  // Function to update UI\n  const renderUpdate = () => {\n    elem.textContent = newValue;\n  };\n\n  // Intercept property access and updates\n  Object.defineProperty(state, attr, {\n    // Getter returns current value\n    get() {\n      return newValue;\n    },\n\n    // Setter runs whenever state[attr] is updated\n    set(value) {\n      newValue = value;\n\n      // Automatically update UI on change\n      renderUpdate();\n    }\n  });\n\n  // Trigger setter once to initialize UI\n  state[attr] = state[attr];\n};\n\nexport default defineBinding;"
  },

  "proxy": {
    "title": "Proxy-based Reactivity",
    "explanation": "Uses a Proxy to intercept all property changes dynamically and update all bound elements.",
    "flow": "input → proxy → set trap → renderEffect(key) → DOM",
    "code": "const domBinding = new Map();\nlet proxyCopy = null;\n\n// Updates all DOM elements bound to a specific property\nconst renderEffect = (attr) => {\n  if (domBinding.has(attr)) {\n    let elems = domBinding.get(attr);\n\n    for (const elem of elems) {\n      elem.textContent = proxyCopy[attr];\n    }\n  }\n};\n\nconst defineProxy = (input, state, attr, elem) => {\n  const handler = {\n    // Pass-through getter\n    get(target, key) {\n      return target[key];\n    },\n\n    // Intercept all property updates\n    set(target, key, value) {\n      target[key] = value;\n\n      // Trigger updates for this specific property\n      renderEffect(key);\n\n      return true;\n    }\n  };\n\n  // Create proxy only once (shared across bindings)\n  if (!proxyCopy) proxyCopy = new Proxy(state, handler);\n\n  // Register DOM element for this property\n  if (!domBinding.has(attr)) {\n    domBinding.set(attr, new Set());\n  }\n\n  let set = domBinding.get(attr);\n  set.add(elem);\n\n  // Initial render\n  renderEffect(attr);\n\n  // Sync input value with state\n  input.value = proxyCopy[attr];\n\n  // Update state via proxy when user types\n  input.addEventListener(\"input\", () => {\n    proxyCopy[attr] = input.value;\n  });\n};\n\nexport default defineProxy;"
  }
}