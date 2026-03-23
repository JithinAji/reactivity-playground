console.log("Hello")
const sharedInput = document.getElementById("sharedInput")
const manualOutput = document.getElementById("manualOutput")


sharedInput.addEventListener("input", () => {
  manualOutput.textContent = sharedInput.value
})

console.log("In")
