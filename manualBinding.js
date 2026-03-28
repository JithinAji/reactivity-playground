const attachListeners = (input, state, prop, elem) => {
  elem.textContent = state[prop]

  const renderManual = () => {
    elem.textContent = state[prop]
  }

  input.addEventListener("input", (e) => {
    state[prop] = e.target.value
    renderManual()
  })
}


export default attachListeners
