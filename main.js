import attachListeners from "./manualBinding.js"
import defineBinding from "./objectDefineBinding.js"
import defineProxy from "./proxyBinding.js"

import codeMap from "./codeMap.js"

const tabs = document.querySelector(".tabs")

const codeTitle = document.getElementById("codeTitle")
const codeDisplay = document.getElementById("codeDisplay")
const codeExplanation = document.getElementById("codeExplanation")
const codeFlow = document.getElementById("codeFlow")

const input = document.getElementById("sharedInput")
const button = document.getElementById("addProperty")

const manualOutput = document.getElementById("manualOutput")
const defineOutput = document.getElementById("defineOutput")
const proxyOutput = document.getElementById("proxyOutput")

const setCode = (mode) => {
  codeFlow.textContent = codeMap[mode].flow
  codeTitle.textContent = codeMap[mode].title
  codeDisplay.textContent = codeMap[mode].code
  codeExplanation.textContent = codeMap[mode].explanation
}

// buildDom

const buildPropertyCard = (prop) => {
  const container = document.createElement("div")
  container.classList.add("property-card")

  // ----- Input Group -----
  const inputGroup = document.createElement("div")
  inputGroup.classList.add("input-group")

  const label = document.createElement("label")
  label.setAttribute("for", `${prop}_input`)
  label.textContent = prop

  const inputEl = document.createElement("input")
  inputEl.id = `${prop}_input`
  inputEl.placeholder = "Type something..."

  inputGroup.appendChild(label)
  inputGroup.appendChild(inputEl)

  const outputs = document.createElement("div")
  outputs.classList.add("outputs")

  const createRow = (text) => {
    const row = document.createElement("div")
    row.classList.add("row")

    const label = document.createElement("span")
    label.classList.add("label")
    label.textContent = text

    const output = document.createElement("span")
    output.classList.add("output")

    row.appendChild(label)
    row.appendChild(output)

    return { row, output }
  }

  const manual = createRow("Manual")
  const define = createRow("Define")
  const proxy = createRow("Proxy")

  outputs.appendChild(manual.row)
  outputs.appendChild(define.row)
  outputs.appendChild(proxy.row)

  container.appendChild(inputGroup)
  container.appendChild(outputs)

  return {
    container,
    input: inputEl,
    manualOutput: manual.output,
    defineOutput: define.output,
    proxyOutput: proxy.output
  }
}

// button click

const validatePropertyName = (name) => {
  if (name &&
    !(name in manualState)) {
    return true
  }
  return false
}

button.addEventListener("click", () => {
  let newPropertyName = prompt("Enter property name")

  if (!validatePropertyName(newPropertyName)) {
    return
  }

  manualState[newPropertyName] = ""
  defineState[newPropertyName] = ""
  proxyState[newPropertyName] = ""

  let { container, input, manualOutput, defineOutput, proxyOutput } = buildPropertyCard(newPropertyName)
  let boxPreview = document.querySelector(".box.preview")
  boxPreview.prepend(container)

  attachListeners(input, manualState, newPropertyName, manualOutput)
  defineBinding(input, defineState, newPropertyName, defineOutput)
  defineProxy(input, proxyState, newPropertyName, proxyOutput)
})

// Handle tab clicks

let selectTab = (target) => {
  target.classList.add("active")
  let mode = target.dataset["mode"]
  setCode(mode)
}

setCode("manual")

for (let i = 0; i < tabs.children.length; i++) {
  const tab = tabs.children[i]
  tab.addEventListener("click", (e) => {
    const selectedTab = document.querySelector(`.tab.active`)
    selectedTab?.classList.remove("active")
    let mode = e.currentTarget.dataset["mode"]
    selectTab(e.currentTarget)
  })
}

// Manual render

const manualState = { value: "" };
attachListeners(input, manualState, "value", manualOutput)

// Object.define render

const defineState = { value: "" }
defineBinding(input, defineState, "value", defineOutput)

// Proxy render

const proxyState = { value: "" }
defineProxy(input, proxyState, "value", proxyOutput)
