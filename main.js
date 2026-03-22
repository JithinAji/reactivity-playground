const state = {
  count: 0,
  name: "Aji"
}

const deps = {}

const el1 = document.getElementById("appDisplay1")
el1.textContent = state.count

bindElement(state, "count", el1)

const el2 = document.getElementById("appDisplay2")
el2.textContent = state.name

bindElement(state, "name", el2)
state.name = "Jithin"

const incBtn = document.getElementById("incrementButton")
incBtn.addEventListener("click", () => {
  state.count ++
  //el.textContent = state.count
})


function bindElement(state, key, el) {
  let value = state[key]

  if(!deps[key]) deps[key] = []
  deps[key].push(el)

  Object.defineProperty(state, key, {
    get() {
      return value
    },

    set(newVal) {
      value = newVal
      deps[key].forEach(elem => {
        elem.textContent = newVal
      })
    }
  })
}
