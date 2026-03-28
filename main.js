import attachListeners from "./manualBinding.js"
import defineBinding from "./objectDefineBinding.js"

const tabs = document.getElementsByClassName("tabs")

const codeDisplay = document.getElementById("codeDisplay")

const input = document.getElementById("sharedInput")

const button = document.getElementById("addProperty")

const manualOutput = document.getElementById("manualOutput")

const defineOutput = document.getElementById("defineOutput")

const proxyOutput = document.getElementById("proxyOutput")

// Manual render

const manualState = {value: ""};
attachListeners(input, manualState, "value", manualOutput)

// Object.define render

const defineState = {value: ""}
defineBinding(input, defineState, "value", defineOutput)
