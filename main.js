const state = createReactiveState({
  count: 0,
  user: {
    name: "Aji"
  }
})

const deps = {}

const el1 = document.getElementById("appDisplay1")
el1.textContent = state.count

bindElement(state, "count", el1)

const el2 = document.getElementById("appDisplay2")
el2.textContent = state.user.name

bindElement(state.user, "name", el2)
state.user.name = "Jithin"

const incBtn = document.getElementById("incrementButton")
incBtn.addEventListener("click", () => {
  state.count ++
  //el.textContent = state.count
})


function bindElement(state, key, el) {
  let value = state[key]

  if(!deps[key]) deps[key] = []
  deps[key].push(el)

  el.textContent = state[key]

}

delete state.count
state.count = 3

state.guess = 5

state.user.name = "Aji"


function createReactiveState(obj) {
  return new Proxy(obj, {
    get(target, key) {
      let value = target[key]

      if(typeof value == "object" && value !== null) {
        createReactiveState(value)
      }

      return value
    },
    set(target, key, value) {
      target[key] = value

      if(deps[key]) {
        deps[key].forEach(elem => {
          elem.textContent = value
        })
      }

      return true
    }
  })
}
