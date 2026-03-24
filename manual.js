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

let internalValue = ""
const renderDefine = () => {
  Object.defineProperty(state, "value", {
    set(newvalue) {
      internalValue = newvalue
      defineOutput.textContent = newvalue
    },
    get() {
      return internalValue
    }
  })
}

renderDefine()

sharedInput.addEventListener("input", () => {
  state.value = sharedInput.value
  renderManual()
})

