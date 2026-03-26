const state = {
  value: ""
}

const sharedInput = document.getElementById("sharedInput")
const manualOutput = document.getElementById("manualOutput")
const defineOutput = document.getElementById("defineOutput")
const proxyOutput = document.getElementById("proxyOutput")

// Manual Render

const renderManual = () => {
  manualOutput.textContent = state.value
}

sharedInput.addEventListener("input", () => {
  state.value = sharedInput.value
  proxyCopy.value = sharedInput.value
  renderManual()
})

// Object.define render

const renderDefineUIUpdate = () => {
  defineOutput.textContent = state.value
}

let internalValue = ""
const setUpDefineReactivity = () => {
  Object.defineProperty(state, "value", {
    set(newvalue) {
      internalValue = newvalue
      renderDefineUIUpdate()
    },
    get() {
      return internalValue
    }
  })
}

renderDefineUIUpdate()
setUpDefineReactivity()

// Proxy render

const domBinding = new Map()

const effect = () => {
  for (let attr in proxyCopy) {
    if(domBinding.has(attr)) {
      let elem = domBinding.get(attr);
      elem.textContent = proxyCopy[attr]
    }
  }
}

const handler = {
  get(target, key) {
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    effect()
    return true
  }
}

const proxyCopy = new Proxy(state, handler)
const bindAttr = (elem, obj, attr) => {
  domBinding.set(attr, elem)
}

bindAttr(proxyOutput, proxyCopy, "value")

sharedInput.addEventListener("input", () => {
  proxyCopy.value = sharedInput.value
})
