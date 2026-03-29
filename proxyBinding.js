const domBinding = new Map()
let proxyCopy = null

const renderEffect = (attr) => {
  if(domBinding.has(attr)) {
    let elems = domBinding.get(attr)

    for(const elem of elems) {
      elem.textContent = proxyCopy[attr]
    }
  }  
}

const defineProxy = (input, state, attr, elem) => {
  const handler = {
    get(target, key) {
      return target[key]
    },
   set(target, key, value) {
    target[key] = value
    renderEffect(key)
    return true
    }
  }

  if(!proxyCopy) proxyCopy = new Proxy(state, handler)

  if(!domBinding.has(attr)) {
    domBinding.set(attr, new Set())
  }
  let set = domBinding.get(attr)
  set.add(elem)
  renderEffect(attr)
  input.value = proxyCopy[attr]

  input.addEventListener("input", () => {
    proxyCopy[attr] = input.value
  })
}

export default defineProxy
