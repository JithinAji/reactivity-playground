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


const setUpProxyReactivity = () => {

}

renderDefineUIUpdate()
setUpDefineReactivity()

sharedInput.addEventListener("input", () => {
  state.value = sharedInput.value
  renderManual()
})

