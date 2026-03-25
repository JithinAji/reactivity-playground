const state = {
  value: ""
}

const sharedInput = document.getElementById("sharedInput")
const manualOutput = document.getElementById("manualOutput")
const defineOutput = document.getElementById("defineOutput")
const proxyOutput = document.getElementById("proxyOutput")

const renderManual = () => {
  manualOutput.textContent = state.value
}

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

const handler = {
  get(target, key) {
    return target[key]
  },
  set(target, key, value) {
    if(key == "value") {
      target[key] = value
      proxyOutput.textContent = target[key]
      return true
    }
  }
}

const proxyCopy = new Proxy(state, handler)


renderDefineUIUpdate()
setUpDefineReactivity()

sharedInput.addEventListener("input", () => {
  state.value = sharedInput.value
  proxyCopy.value = sharedInput.value
  renderManual()
})

