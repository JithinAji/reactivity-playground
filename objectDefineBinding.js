const defineBinding = (input, state, attr, elem) => {
  input.addEventListener("input", () => {
    state[attr] = input.value
  })

  let newValue = state[attr]

  const renderUpdate = () => {
    elem.textContent = newValue
  }

  Object.defineProperty(state, attr, {
    get() {
      return newValue
    },
    set(value) {
      newValue = value
      renderUpdate()
    }
  })

  state[attr] = state[attr]
}


export default defineBinding
