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

const handler = {
  get(target, key) {
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    if(domBinding.has(key)){
      for(const elem of domBinding.get(key)) {
        elem.textContent = value
      }
    }
    return true
  }
}

const proxyCopy = new Proxy(state, handler)
const bindAttr = (elem, obj, attr) => {
  if(!domBinding.has(attr)) {
    domBinding.set(attr, new Set())
  }
  let elements = domBinding.get(attr)
  elements.add(elem)
}

bindAttr(proxyOutput, proxyCopy, "value")

sharedInput.addEventListener("input", () => {
  proxyCopy.value = sharedInput.value
})
