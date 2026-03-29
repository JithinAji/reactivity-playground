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

// Handle tab clicks

let selectTab = (target) => {
  target.classList.add("active")
  let mode = target.dataset["mode"]
  setCode(mode)
}

setCode("manual")

for(let i = 0; i < tabs.children.length; i++){
  const tab = tabs.children[i]
  tab.addEventListener("click", (e) => {
    const selectedTab = document.querySelector(`.tab.active`)
    selectedTab?.classList.remove("active")
    let mode = e.currentTarget.dataset["mode"]
    selectTab(e.currentTarget)
  })
}

// Manual render

const manualState = {value: ""};
attachListeners(input, manualState, "value", manualOutput)

// Object.define render

const defineState = {value: ""}
defineBinding(input, defineState, "value", defineOutput)

// Proxy render

const proxyState = {value: ""}
defineProxy(input, proxyState, "value", proxyOutput)
